import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, selectPosts } from './store/postsSlice';
import { Post } from './store/types';
import { AnyAction } from '@reduxjs/toolkit';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);

  useEffect(() => {
    dispatch(fetchPosts() as unknown as AnyAction);
  }, [dispatch]);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post: Post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
