import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/common/Home";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { AuthProvider } from './context/AuthContext.jsx';

// Auth
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
// Books
import AddBook from './pages/books/AddBook/index.jsx';
import ShowAllBooks from './pages/books/ShowBooks/index.jsx';
import MyBooks from './pages/books/UserBooks/index.jsx';
import ManageBooksRequest from './pages/books/ManageBooksRequest/index.jsx';
import UserProfile from './pages/customer/UserProfile.jsx';


// Orders
import Orders from './pages/orders/index.jsx';



// Page Not Found
import NotFound from './pages/common/NotFound.jsx';

function AppLayout() {
  return(
    <Routes>
      <Route path="*" element= {<NotFound />}> </Route>
      <Route element={<MainLayout />} >
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/show-all-books" element={<ShowAllBooks />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/user-books" element={<MyBooks />} />
        <Route path="/manage-books-request" element={<ManageBooksRequest />} />
        <Route path="/orders" element={<Orders />} />
      </Route>
    </Routes>
  )
 
}

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <AppLayout />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App
