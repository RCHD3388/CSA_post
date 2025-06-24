// app.js
const express = require('express');
const multer = require('multer');
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const multerS3 = require('multer-s3');
require('dotenv').config();

// --- PERUBAHAN DI BAGIAN DATABASE ---
const sequelize = require('./config/db'); // Import instance Sequelize
const Image = require('./model/Image');     // Import Model Image

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- LOGIKA UPLOAD S3 (TIDAK ADA PERUBAHAN SAMA SEKALI) ---
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const fileName = `images/${Date.now()}_${file.originalname}`;
      cb(null, fileName);
    },
  }),
});

// --- PERUBAHAN DI ROUTE HANDLER ---

// Route untuk upload gambar
app.post('/api/posts', upload.single('gambar'), async (req, res) => {
  const { nama, description } = req.body;

  if (!req.file) {
    return res.status(400).send({ message: 'Harap upload sebuah file gambar.' });
  }

  const imageUrl = req.file.location;

  try {
    // Menggunakan Sequelize untuk membuat record baru di database
    const newImage = await Image.create({
      nama: nama,
      description: description,
      image_url: imageUrl,
    });

    res.status(201).send({
      message: 'Gambar berhasil di-upload dan data tersimpan!',
      data: newImage,
    });
  } catch (err) {
    console.error('Error saat menyimpan ke database:', err);
    res.status(500).send({ message: 'Terjadi error pada server.' });
  }
});

// Route untuk GET all images
app.get('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Image.findByPk(id);

    if (!image) {
      return res.status(404).json({ message: 'Gambar tidak ditemukan.' });
    }

    res.status(200).json(image.image_url);

  } catch (err) {
    console.error('Error saat mengambil data:', err);
    res.status(500).json({ message: 'Terjadi error pada server.' });
  }
});

app.get('/api/posts', async (req, res) => {
  try {
    const images = await Image.findAll()

    res.status(200).json(images);

  } catch (err) {
    console.error('Error saat mengambil data:', err);
    res.status(500).json({ message: 'Terjadi error pada server.' });
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Cari gambar di database
    const image = await Image.findByPk(id);

    if (!image) {
      return res.status(404).json({ message: 'Gambar tidak ditemukan.' });
    }

    // --- LOGIKA PENGHAPUSAN S3 DIMULAI DI SINI ---

    // 1. Dapatkan URL gambar dari record database
    //    (Asumsi nama kolomnya adalah 'imageUrl' atau 'image_url')
    const imageUrl = image.image_url; // Ganti 'imageUrl' jika nama kolomnya berbeda

    // 2. Ekstrak Key file dari URL.
    //    Contoh URL: https://bucket-name.s3.region.amazonaws.com/images/file.png
    //    Key yang kita butuhkan adalah: 'images/file.png'
    const urlObject = new URL(imageUrl);
    const fileKey = urlObject.pathname.substring(1); // Menghapus '/' di awal

    // 3. Buat perintah untuk menghapus file dari S3
    const deleteParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileKey,
    };
    const command = new DeleteObjectCommand(deleteParams);

    // Kirim perintah ke S3
    await s3Client.send(command);
    console.log(`File ${fileKey} berhasil dihapus dari S3.`);

    // --- LOGIKA PENGHAPUSAN S3 SELESAI ---


    // 4. Hapus record dari database setelah file di S3 berhasil dihapus
    await image.destroy();

    res.status(200).json({ message: 'Gambar berhasil dihapus dari database dan S3.' });

  } catch (err) {
    console.error('Error saat menghapus data:', err);
    res.status(500).json({ message: 'Terjadi error pada server.' });
  }
});

// --- KONEKSI DAN SINKRONISASI DATABASE ---
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Koneksi ke database MySQL RDS berhasil.');

    // Sinkronisasi model dengan database.
    // Ini akan membuat tabel 'images' jika belum ada.
    // Hati-hati menggunakan { force: true } karena akan menghapus tabel yang ada.
    await sequelize.sync();
    console.log('Model berhasil disinkronkan dengan database.');

    app.listen(port, () => {
      console.log(`Server berjalan di http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Tidak dapat terhubung ke database:', error);
  }
};

startServer();