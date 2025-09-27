import React, { useState } from "react";
import styles from "../../../assets/media/styles/books/AddBooks.module.css";
import { showToast, Toast } from "../../../components/AlertService";
import apiCall from "../../../api/apiCall";
import ImageUploader from "./ImageUploader";
import BookFormFields from "./BookFormFields";
import Loader from "../../../components/Loader";

const initialFormData = {
  title: "",
  author: "",
  condition: "",
  image: null,
};

const AddBooks = () => {
  const [loading, setLoading] = useState(false);
  const [bookData, setBookData] = useState(initialFormData);
  const [preview, setPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setBookData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!bookData.title || !bookData.author || !bookData.condition) {
      showToast("error", "Please fill all required fields");
      return;
    }
    if (!bookData.image) {
      showToast("error", "Please select a book image");
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(bookData).forEach((key) => {
        formData.append(key, bookData[key])
      });

      const response = await apiCall("POST", "api/book/add", formData);

      console.log("response:", response);
      showToast("success", "Book added successfully!");
      setBookData(initialFormData);
      setPreview(null);
    } catch (err) {
      console.error(err);
      showToast("error", err.message || "Failed to add book");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Toast />
      <div className={`d-flex justify-content-center align-items-center ${styles.addBooksWrapper}`}>
        <form className={`p-4 shadow ${styles.addBooksForm}`} onSubmit={handleSubmit}>
          <h2 className="mb-4 text-center">Add a Book</h2>

          <ImageUploader
            preview={preview}
            setPreview={setPreview}
            bookData={bookData}
            setBookData={setBookData}
            showModal={showModal}
            setShowModal={setShowModal}
          />

          <BookFormFields
            bookData={bookData}
            handleChange={handleChange}
          />

          <button type="submit" className="btn btn-primary w-100 mt-3">Add Book</button>
        </form>
      </div>
    </>
  );
};

export default AddBooks;
