import api from './api';

const postService = {
  // Mendapatkan semua postingan
  getAllPosts: async () => {
    try {
      const response = await api.get('/api/posts');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Membuat postingan baru
  createPost: async (postData) => {
    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('body', postData.body);
    if (postData.image) {
      formData.append('image', postData.image);
    }

    try {
      const response = await api.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Menghapus postingan
  deletePost: async (postId) => {
    try {
      const response = await api.delete(`/api/posts/${postId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default postService;