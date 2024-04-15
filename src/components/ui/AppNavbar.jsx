import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Stack from 'react-bootstrap/Stack';
import { IoPaw } from 'react-icons/io5';
import AuthPart from './AuthPart';
import useAuth from '../hooks/useAuth';

export default function AppNavbar({ user }) {
  const { signUpHandler, logoutHandler, signInHandler } = useAuth();
  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      className="border-bottom border-primary"
    >
      <Container>
        <Navbar.Brand href="#home">
          <IoPaw size={30} />
        </Navbar.Brand>
        <Nav className="me-auto flex-grow-1">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/test">testpage</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Nav className="me-auto">
          <Stack direction="horizontal" gap={3}>
            <span className="text-white">
              Hello,
              {user ? `${user.name}` : 'Guest'}
            </span>
            <AuthPart
              signInHandler={signInHandler}
              signUpHandler={signUpHandler}
              logoutHandler={logoutHandler}
              user={user}
            />
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
}
