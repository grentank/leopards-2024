import React from 'react';
import axios from 'axios';

export default function usePosts(posts) {
  const [currentPosts, setPosts] = React.useState(posts || []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!e.target.title.value || !e.target.body.value || !e.target.file.files[0]) {
      return;
    }
    const formData = new FormData();
    formData.append('title', e.target.title.value);
    formData.append('body', e.target.body.value);
    formData.append('file', e.target.file.files[0]);

    try {
      const response = await axios.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('---------->>', response.data);
      setPosts([response.data, ...currentPosts]);
      e.target.reset();
      return response.data.id;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`);
      setPosts(currentPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    currentPosts,
    submitHandler,
    deleteHandler,
    setPosts,
  };
}
