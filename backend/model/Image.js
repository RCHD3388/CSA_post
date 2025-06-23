// models/Image.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Import koneksi sequelize

const Image = sequelize.define('Image', {
  // 'id' (primary key) akan dibuat otomatis oleh Sequelize
  nama: {
    type: DataTypes.STRING,
    allowNull: false, // Sama dengan NOT NULL
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // 'createdAt' dan 'updatedAt' akan dibuat dan dikelola otomatis oleh Sequelize
}, {
  tableName: 'images', // Secara eksplisit menentukan nama tabel
  timestamps: true,    // Mengaktifkan createdAt dan updatedAt
});

module.exports = Image;