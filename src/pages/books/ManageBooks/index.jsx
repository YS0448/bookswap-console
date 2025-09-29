import React, { useEffect, useState } from "react";
import apiCall from "../../../api/apiCall";
import { useAuth } from "../../../context/AuthContext";
import Loader from "../../../components/Loader";
import ReactPaginate from "react-paginate";
import styles from "../../../assets/media/styles/books/UserBooks.module.css";
import { Toast, showToast } from "../../../components/AlertService";
import BookRow from "./BookRow";

const ManageBooks = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [editingBook, setEditingBook] = useState(null);

  const limit = 5;

  const fetchBooks = async (page = 0) => {
    setLoading(true);
    try {
      const offset = page * limit;
      const url = `api/users/me/books?limit=${limit}&offset=${offset}`;
      const response = await apiCall("GET", url);
      setBooks(response.data.books || []);
      setTotalBooks(response.data.total || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.user_id) fetchBooks(currentPage);
  }, [user, currentPage]);

  if (loading) return <Loader />;
  if (!books.length) return <p className={styles.emptyState}>No books found.</p>;

  const pageCount = Math.ceil(totalBooks / limit);

  return (
    <>
      <Toast />
      <div className={styles.container}>
        <h2>User Books</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th>Book ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Condition</th>
                <th>Status</th>
                <th>Image</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <BookRow
                  key={book.book_id}
                  book={book}
                  baseUrl={baseUrl}
                  editingBook={editingBook}
                  setEditingBook={setEditingBook}
                  books={books}
                  setBooks={setBooks}
                />
              ))}
            </tbody>
          </table>
        </div>

        {pageCount > 1 && (
          <ReactPaginate
            previousLabel="←"
            nextLabel="→"
            breakLabel="..."
            pageCount={pageCount}
            forcePage={currentPage}
            onPageChange={({ selected }) => setCurrentPage(selected)}
            containerClassName={styles.pagination}
            pageClassName={styles.pageItem}
            pageLinkClassName={styles.pageLink}
            previousClassName={styles.pageItem}
            nextClassName={styles.pageItem}
            previousLinkClassName={styles.pageLink}
            nextLinkClassName={styles.pageLink}
            breakClassName={styles.pageItem}
            breakLinkClassName={styles.pageLink}
            activeClassName={styles.active}
          />
        )}
      </div>
    </>
  );
};

export default ManageBooks;
