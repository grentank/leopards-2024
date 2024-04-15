import React, { useState, useEffect, useRef } from 'react';
import Row from 'react-bootstrap/Row';
import { Col } from 'react-bootstrap';
import PostCard from '../ui/PostCard';
import AddPostForm from '../ui/AddPostForm';
import usePosts from '../hooks/usePosts';

export default function MainPage({ posts: postsFromBackend, user }) {
  const [onlineUserNames, setOnlineUserNames] = useState([]);
  const {
    currentPosts: posts,
    submitHandler: httpSubmitHandler,
    setPosts,
  } = usePosts(postsFromBackend);
  console.log({ posts, postsFromBackend });

  const socketRef = useRef(null);

  useEffect(() => {
    function createSocket() {
      const socket = new WebSocket('ws://localhost:3000');
      socket.onopen = () => console.log('Socket opened');
      socket.onclose = () => {
        setTimeout(createSocket, 2000);
      };
      socket.onerror = console.log;
      socketRef.current = socket;

      socket.onmessage = (event) => {
        const action = JSON.parse(event.data);
        const { type, payload } = action;
        switch (type) {
          case 'ADD_POST':
            setPosts((prev) => [payload, ...prev]);
            break;
          case 'REMOVE_POST':
            setPosts((prev) => prev.filter((post) => post.id !== payload));
            break;
          case 'SET_ONLINE_USERS':
            setOnlineUserNames(payload);
            break;
          default:
            break;
        }
      };
    }

    createSocket();
  }, []);

  const submitHandler = async (e) => {
    const postId = await httpSubmitHandler(e);

    const action = {
      type: 'CREATE_POST',
      payload: postId,
    };
    socketRef.current.send(JSON.stringify(action));
  };

  const deleteHandler = (id) => {
    const action = {
      type: 'DELETE_POST',
      payload: id,
    };
    socketRef.current.send(JSON.stringify(action));
  };

  return (
    <>
      {user && <AddPostForm submitHandler={submitHandler} />}
      <Row className="mt-5 mb-5">
        <Col xs={12}>
          <p>Users online: {onlineUserNames.join(', ')}</p>
        </Col>
      </Row>
      <Row className="mt-5 mb-5">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} deleteHandler={deleteHandler} user={user} />
        ))}
      </Row>
    </>
  );
}
