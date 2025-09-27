import React from "react";
import styles from "../../../assets/media/styles/books/ShowAllBooks.module.css";
import demo_book_img from "../../../assets/media/image/book_img1.jpeg";

const BookCard = ({ book, baseUrl, openModal, handleRequest }) => {
  return (
    <div className="col-md-3">
      <div className={`card h-100 ${styles.bookCard}`}>
        <img
          src={book.image ? `${baseUrl}${book.image}` : demo_book_img}
          className="card-img-top"
          alt={book.title}
          style={{ height: "200px", objectFit: "cover", cursor: "pointer" }}
          onClick={() =>
            openModal(book.image ? `${baseUrl}${book.image}` : demo_book_img)
          }
        />
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <p className="card-text mb-0">
            <strong>Author:</strong> {book.author}
          </p>
          <p className="card-text">
            <strong>Condition:</strong> {book.book_condition}
          </p>
        </div>
        <div className="card-footer text-center border-0 bg-white">
          
          {book.request_status === null ? (
            <button
              className="btn btn-primary btn-sm w-100"
              onClick={() => handleRequest(book)}
            >
              Request to Borrow
            </button>
          ) : book.request_status === "pending" ? (
            <button className="btn btn-warning btn-sm w-100" disabled>
              Pending
            </button>
          ) : book.request_status === "accepted" ? (
            <button className="btn btn-success btn-sm w-100" disabled>
              Accepted
            </button>
          ) : book.request_status === "declined" ? (
            <button className="btn btn-danger btn-sm w-100" disabled>
              Declined
            </button>
          ) : null}

        </div>
      </div>
    </div>
  );
};

export default BookCard;
