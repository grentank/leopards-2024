import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function SignInForm({ signInHandler }) {
  return (
    <Form onSubmit={signInHandler}>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Email
        </Form.Label>
        <Col sm="10">
          <Form.Control name="email" type="email" placeholder="enter email" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Password
        </Form.Label>
        <Col sm="10">
          <Form.Control name="password" type="password" placeholder="enter password" />
        </Col>
      </Form.Group>
      <Button type="submit">ok</Button>
    </Form>
  );
}
