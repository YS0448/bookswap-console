import React from "react";

const BookFormFields = ({ bookData, handleChange }) => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          type="text"
          id="title"
          className="form-control"
          value={bookData.title}
          onChange={handleChange}
          placeholder="Enter book title"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="author" className="form-label">Author</label>
        <input
          type="text"
          id="author"
          className="form-control"
          value={bookData.author}
          onChange={handleChange}
          placeholder="Enter author's name"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="condition" className="form-label">Condition</label>
        <select
          id="condition"
          className="form-select"
          value={bookData.condition}
          onChange={handleChange}
          required
        >
          <option value="">Select condition</option>
          <option value="new">New</option>
          <option value="like_new">Like New</option>
          <option value="used">Used</option>
          <option value="worn">Worn</option>
        </select>
      </div>
    </>
  );
};

export default BookFormFields;
