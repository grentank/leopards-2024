import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function AddPostForm({ submitHandler }) {
  return (
    <Row className="mt-3">
      <Col>
        <h4>Добавить пост</h4>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control name="title" type="text" placeholder="title" />
          </Form.Group>
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Label>Body</Form.Label>
            <Form.Control name="body" type="text" placeholder="body" />
          </Form.Group>
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Label>Image</Form.Label>
            <Form.Control name="file" type="file" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
