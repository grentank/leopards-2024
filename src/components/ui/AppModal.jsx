import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default function AppModal({
  title,
  show,
  handleClose,
  children,
}) {
  return (

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title || 'modal'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {show
          && children}
      </Modal.Body>
    </Modal>
  );
}
