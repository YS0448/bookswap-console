import React, { useEffect, useState,  } from "react";
import apiCall from "../../../api/apiCall";
import HeroSection from "./HeroSection";
import BookCard from "./BookCard";
import Pagination from "./Pagination";
import BookImageModal from "./BookImageModal";
import { useAuth } from "../../../context/AuthContext";
import { showToast, Toast } from "../../../components/AlertService";
import Loader from "../../../components/Loader";
import { useNavigate } from "react-router-dom";

const ShowAllBooks = () => {
  const navigate = useNavigate();
  const { user, role } = useAuth();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  console.log('baseUrl:', baseUrl);

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);

  const limit = 4; // Books per page

  const fetchBooks = async (page = 0) => {
    setLoading(true);
    try {
      const offset = page * limit;
      const url = `api/getAllBooks?user_id=${user?.user_id || null}&limit=${limit}&offset=${offset}`;
      const response = await apiCall("GET", url);

      console.log("Fetched books:", response.data.books);
      setBooks(response.data.books || []);
      setTotalBooks(response.data.total || 0);
    } catch (err) {
      console.error("Error fetching books:", err);
      showToast("error", "Error fetching books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage, user]);

  const openModal = (image) => {
    setModalImage(image);
    setShowModal(true);
  };

  const handleRequest = async (book) => {
    if(role==='guest') {
      setLoading(false)
      navigate('/login');
      return;
    }
    
    setLoading(true)
    
    try {
      const payload = { book_id: book.book_id, user_id: user.user_id };
      await apiCall("POST", "api/create_request", payload);
      showToast("success", "Request sent successfully!");
      
    } catch (err) {
      console.error("Error sending request:", err);
      showToast("error", err.message || "Something went wrong while sending the request.");
    } finally{
      setLoading(false)
    }
  };

  const pageCount = Math.ceil(totalBooks / limit);

  if (loading) return <Loader />;
  if (!books.length)
    return <div className="text-center mt-4">No books available.</div>;

  return (
    <>
      <Toast />
      <HeroSection />

      <div className="container my-5" id="book-list">
        <div className="row g-3">
          {books.map((book) => (
            <BookCard
              key={book.book_id}
              book={book}
              baseUrl={baseUrl}
              openModal={openModal}
              handleRequest={handleRequest}
            />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          pageCount={pageCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <BookImageModal
        show={showModal}
        image={modalImage}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default ShowAllBooks;
