import React, { useEffect, useState } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default function SearchWrapper() {
  const [input, setInput] = useState('');
  const [words, setWords] = useState([]);

  const getWordsHandler = () => {
    axios.post('/api/words', { word: input })
      .then(({ data }) => setWords(data));
  };

  useEffect(() => {
    let timeout;
    if (input) {
      timeout = setTimeout(() => {
        getWordsHandler();
      }, 700);
    }
    return () => clearTimeout(timeout);
  }, [input]);

  const changeHandler = (e) => {
    setInput(e.target.value);
  };

  return (
    <>
      <Row className="mt-5">
        <Col>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              onChange={changeHandler}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <ul>
            {words.map((el, index) => (
              <li key={el.id}>
                {index + 1}
                {' '}
                {el.word}
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </>
  );
}
