import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import ImageModal from "./ImageModal";
import upload_img from '../../../assets/media/image/upload_img.jpg';
import styles from "../../../assets/media/styles/books/AddBooks.module.css";

const ImageUploader = ({ preview, setPreview, bookData, setBookData, showModal, setShowModal }) => {
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setBookData(prev => ({ ...prev, image: e.target.files[0] }));
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleImageClick = () => fileInputRef.current.click();

  return (
    <div className="text-center mb-3">
      <img
        src={preview || upload_img}
        alt="Book"
        className={styles.bookImage}
        onClick={handleImageClick}
        title="Click to select image"
      />
      <input
        type="file"
        id="image"
        accept="image/*"
        onChange={handleChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      {preview && (
        <div className="mt-2">
          <Button variant="secondary" size="sm" onClick={handleImageClick} className="me-2">
            Change Image
          </Button>
          <Button variant="primary" size="sm" onClick={() => setShowModal(true)}>
            View Image
          </Button>
        </div>
      )}

      {preview && (
        <ImageModal
          show={showModal}
          onHide={() => setShowModal(false)}
          imageSrc={preview}
          title={bookData.title || "Book Image"}
        />
      )}
    </div>
  );
};

export default ImageUploader;
