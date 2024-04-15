import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import AppModal from "./AppModal";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function AuthPart({
  signUpHandler,
  logoutHandler,
  user,
  signInHandler,
}) {
  const [show, setShow] = useState(false);
  const [loginOrSignup, setloginOrSignup] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      {user ? (
        <Button onClick={logoutHandler} variant="outline-primary">
          Выйти
        </Button>
      ) : (
        <Button onClick={handleShow} variant="outline-primary">
          Авторизация
        </Button>
      )}

      <AppModal title="Auth" show={show} handleClose={handleClose}>
        <>
          <Col className="mt-3 mb-3 d-flex justify-content-around">
            <Button variant="link" onClick={() => setloginOrSignup(false)}>
              Регистрация
            </Button>
            <Button variant="link" onClick={() => setloginOrSignup(true)}>
              Авторизация
            </Button>
          </Col>
          {loginOrSignup ? (
            <SignInForm signInHandler={signInHandler} />
          ) : (
            <SignUpForm signUpHandler={signUpHandler} />
          )}
        </>
      </AppModal>
    </>
  );
}
