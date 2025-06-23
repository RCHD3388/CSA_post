import React, { useEffect, useState } from 'react';

const PostItem = ({ post, onDeletePost }) => {
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    fetch("/placeholder.png")
      .then((res) => res.blob())
      .then((blob) => {
        console.log('Blob type:', blob.type);

        const url = URL.createObjectURL(blob);
        setImageURL(url);

        // Cleanup saat komponen unmount
        return () => URL.revokeObjectURL(url);
      });
  }, []);

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="card mb-5">
      <div className="card-body">
        {/* Standarisasi gambar dengan aspek rasio 16:9 */}
        <div className="mb-4">
          {post.image ? (
            <div className="aspect-16-9">
              {imageURL && <img src={imageURL} alt="Placeholder" className="rounded" />}
            </div>
          ) : (
            <div className="aspect-16-9">
              <div className="image-placeholder">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>No image available</span>
              </div>
            </div>
          )}
        </div>

        <h3 className="text-xl font-semibold mb-3 text-gray-800">{post.title}</h3>
        <p className="text-gray-700 mb-4 text-lg">{post.body}</p>

        <div className="flex justify-between items-center pt-3 text-sm">
          <span className="text-gray-500 mr-3">
            Posted on {formatDate(post.date)}
          </span>
          <button
            onClick={() => onDeletePost(post.id)}
            className="btn btn-danger"
          >
            Delete Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostItem;