// src/components/books/BookImageModal.jsx
import React from "react";
import { Modal, Button } from "react-bootstrap";

const BookImageModal = ({ show, image, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Book Image</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <img src={image} alt="Book Preview" className="img-fluid" />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookImageModal;
