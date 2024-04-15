import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function JokeWrapper() {
  const [joke, setJoke] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      axios('https://api.chucknorris.io/jokes/random')
        .then(({ data }) => setJoke(data.value));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Row>
      <Col>
        <h3>Chuck say</h3>
        <p>
          {joke}
        </p>
      </Col>
    </Row>
  );
}
