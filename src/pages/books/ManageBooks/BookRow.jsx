import React, { useState } from "react";
import apiCall from "../../../api/apiCall";
import { formatDate } from "../../../utils/formatDate";
import styles from "../../../assets/media/styles/books/UserBooks.module.css";
import { showToast } from "../../../components/AlertService";

const BookRow = ({ book, baseUrl, editingBook, setEditingBook, books, setBooks }) => {
  const [editData, setEditData] = useState({
    title: book.title,
    author: book.author,
    book_condition: book.book_condition,
    status: book.status,
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEditData({ ...editData, image: file });
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const saveEdit = async () => {
    const bookIndex = books.findIndex((b) => b.book_id === book.book_id);
    const updatedFields = {};

    if (editData.title !== book.title) updatedFields.title = editData.title;
    if (editData.author !== book.author) updatedFields.author = editData.author;
    if (editData.book_condition !== book.book_condition)
      updatedFields.book_condition = editData.book_condition;
    if (editData.status !== book.status) updatedFields.status = editData.status;
    if (editData.image) updatedFields.image = editData.image;

    if (!Object.keys(updatedFields).length) {
      setEditingBook(null);
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(updatedFields).forEach((key) => formData.append(key, updatedFields[key]));

      const response = await apiCall("PATCH", `/api/books/${book.book_id}`, formData);
      showToast("success", response.data.message || "Book updated successfully");

      const updatedBook = { ...book, ...updatedFields };
      if (updatedFields.image) updatedBook.image = response.data.imagePath || book.image;

      const newBooks = [...books];
      newBooks[bookIndex] = updatedBook;
      setBooks(newBooks);
      setEditingBook(null);
    } catch (err) {
      console.error(err);
      showToast("error", err.message || "Failed to update book");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      const response = await apiCall("DELETE", `/api/books/${book.book_id}`);
      showToast("success", response.data.message || "Book deleted successfully");
      setBooks((prev) => prev.filter((b) => b.book_id !== book.book_id));
    } catch (err) {
      console.error(err);
      showToast("error", err.message || "Failed to delete book");
    }
  };

  return (
    <tr>
      <td>{book.book_id}</td>
      <td>{editingBook === book.book_id ? <input name="title" value={editData.title} onChange={handleEditChange} /> : book.title}</td>
      <td>{editingBook === book.book_id ? <input name="author" value={editData.author} onChange={handleEditChange} /> : book.author}</td>
      <td>{editingBook === book.book_id ? <input name="book_condition" value={editData.book_condition} onChange={handleEditChange} /> : book.book_condition}</td>
      <td>{editingBook === book.book_id ? (
        <select name="status" value={editData.status} onChange={handleEditChange}>
          <option value="available">Available</option>
          <option value="sold">Sold</option>
        </select>
      ) : book.status}</td>
      <td>
        {editingBook === book.book_id ? (
          <div className={styles.imageCell}>
            <label className={styles.uploadButton}>
              Upload
              <input type="file" onChange={handleFileChange} />
            </label>
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
            ) : book.image ? (
              <img src={`${baseUrl}${book.image}`} alt={book.title} className={styles.imagePreview} />
            ) : (
              <span className="text-muted">No Image</span>
            )}
          </div>
        ) : book.image ? (
          <img src={`${baseUrl}${book.image}`} alt={book.title} className={styles.imagePreview} />
        ) : (
          <span className="text-muted">No Image</span>
        )}
      </td>
      <td>{formatDate(book.created_at)}</td>
      <td>{formatDate(book.updated_at)}</td>
      <td>
        <div className="d-flex gap-2">
          {editingBook === book.book_id ? (
            <>
              <button className="btn btn-sm btn-success" onClick={saveEdit}>Save</button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => setEditingBook(null)}>Cancel</button>
            </>
          ) : (
            <>
              <button className="btn btn-sm btn-warning" onClick={() => setEditingBook(book.book_id)}>Edit</button>
              <button className="btn btn-sm btn-outline-danger" onClick={handleDelete}>Delete</button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default BookRow;
