import React, { useState } from 'react';

const CreatePost = ({ onAddPost }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validasi ukuran file (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB!");
        return;
      }

      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      alert('Title and body are required!');
      return;
    }

    onAddPost({ title, body, image });
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setBody('');
    setImage(null);
    setPreview(null);
    document.getElementById('post-form').reset();
  };

  return (
    <div className="card mb-6">
      <div className="card-header">
        <h2 className="text-xl font-semibold">Create New Post</h2>
        <p className="text-gray-600 text-sm mt-1">Share your thoughts with the community</p>
      </div>

      <div className="card-body">
        <form id="post-form" onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label className="form-label mb-2">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="form-control"
            />

            <div className="mt-3">
              {preview ? (
                <div className="aspect-16-9">
                  <img
                    src={preview}
                    alt="Preview"
                    className="rounded"
                  />
                </div>
              ) : (
                <div className="aspect-16-9">
                  <div className="image-placeholder">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>No image selected</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="form-group mb-4">
            <label className="form-label mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              placeholder="Enter post title"
            />
          </div>

          <div className="form-group mb-4">
            <label className="form-label mb-2">Content</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="form-control"
              rows="5"
              placeholder="Write your post content..."
            ></textarea>
          </div>

          <div className="button-group">
            <button
              type="button"
              onClick={resetForm}
              className="btn bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              Reset
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;