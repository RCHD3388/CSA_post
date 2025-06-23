import React, { useState } from 'react';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';

const initialPosts = [
  {
    id: 1,
    title: "Pengenalan React JS",
    body: "React adalah library JavaScript yang dikembangkan oleh Facebook untuk membangun antarmuka pengguna yang efisien dan dinamis. Dengan komponen berbasis fungsi dan manajemen state yang baik, React memungkinkan pengembangan aplikasi web yang kompleks dengan lebih mudah.",
    image: "placeholder",
    date: "2025-06-20T10:30:00Z"
  },
  {
    id: 2,
    title: "Prinsip Dasar UI/UX Design",
    body: "Desain UI/UX yang baik berfokus pada pengalaman pengguna. Beberapa prinsip dasar termasuk konsistensi, hierarki visual, umpan balik, dan efisiensi. Penggunaan warna, tipografi, dan spasi yang tepat dapat meningkatkan keterbacaan dan keterlibatan pengguna secara signifikan.",
    image: "placeholder",
    date: "2025-06-18T14:45:00Z"
  },
  {
    id: 3,
    title: "Best Practice React Development",
    body: "Untuk pengembangan React yang optimal, gunakan komponen fungsional dengan Hooks, pisahkan logika bisnis dengan custom hooks, manfaatkan Context API untuk state management sederhana, dan optimalkan performa dengan React.memo dan useCallback. Selalu terapkan ESLint dan Prettier untuk konsistensi kode.",
    image: "placeholder",
    date: "2025-06-15T09:15:00Z"
  }
];

function App() {
  const [posts, setPosts] = useState(initialPosts);

  const handleAddPost = (newPost) => {
    alert(`Post created successfully!\nTitle: ${newPost.title}`);
  };

  const handleDeletePost = (postId) => {
    alert(`Post with ID: ${postId} will be deleted`);
  };

  return (
    <div className="container py-8">
      <header className="header">
        <h1 className="text-3xl font-bold text-gray-800">Social Media Feed</h1>
        <p className="text-gray-600 mt-2">Share your thoughts and ideas with the community</p>
      </header>
      
      <CreatePost onAddPost={handleAddPost} />
      
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-5">Recent Posts</h2>
        <PostList posts={posts} onDeletePost={handleDeletePost} />
      </div>
    </div>
  );
}

export default App;