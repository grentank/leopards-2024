import React from 'react';
import Container from 'react-bootstrap/Container';
import AppNavbar from './ui/AppNavbar';

export default function App({ children, user }) {
  return (
    <Container>
      <AppNavbar user={user} />
      {children}
    </Container>
  );
}
