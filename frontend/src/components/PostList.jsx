import React from 'react';
import PostItem from './PostItem';

const PostList = ({ posts, onDeletePost }) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="bg-gray-100 rounded-lg p-8 max-w-md mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-medium mt-4 text-gray-700">No posts available</h3>
          <p className="text-gray-500 mt-2">Be the first to share something with the community!</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {posts.map((post) => (
        <PostItem 
          key={post.id} 
          post={post} 
          onDeletePost={onDeletePost} 
        />
      ))}
    </div>
  );
};

export default PostList;