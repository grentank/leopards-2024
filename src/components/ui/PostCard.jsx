import React from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import { motion } from 'framer-motion';

export default function PostCard({ post, deleteHandler, user }) {
  return (
    <Col xs={12} md={4} className="mt-4">
      <motion.div
        initial={{ scale: 0.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <Card
          style={{
            boxShadow: '0 10px 10px rgba(0,1,0,0.3)',
          }}
        >
          <Card.Img
            style={{ objectFit: 'cover', height: '250px' }}
            variant="top"
            src={`/img/${post.img || 'noimage.webp'}`}
          />
          <Card.Body>
            <Card.Title>
              автор:
              {post.User.name}
            </Card.Title>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.body}</Card.Text>
            <Row className="d-flex justify-content-around">
              {user && user.id === post.User.id
              && (
              <Stack
                direction="horizontal"
                gap={3}
                className="justify-content-between"
              >
                <a href="/post/1" className="btn btn-outline-info">
                  подробнее
                </a>
                <Button variant="outline-primary">редактировать</Button>
                <Button onClick={() => { deleteHandler(post.id); }} variant="outline-danger">удалить</Button>
              </Stack>
              )}
            </Row>
          </Card.Body>
        </Card>
      </motion.div>
    </Col>
  );
}
