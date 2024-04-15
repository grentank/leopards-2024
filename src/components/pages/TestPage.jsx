import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import AppModal from '../ui/AppModal';
import JokeWrapper from '../test-ui/JokeWrapper';
import SearchWrapper from '../test-ui/SearchWrapper';

export default function TestPage() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Row>
        <Col>
          <h3>Test Page</h3>
          <Button onClick={handleShow} variant="success">jokeModal</Button>
          <AppModal show={show} handleClose={handleClose} title="Joke heheheh">
            <JokeWrapper />
          </AppModal>
        </Col>
      </Row>
      <Row>
        <Col>
          <SearchWrapper />
        </Col>
      </Row>
    </>
  );
}
