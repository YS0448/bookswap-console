import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, currentPage, setCurrentPage }) => {
  return (
    <div className="d-flex justify-content-center mt-4">
      <ReactPaginate
        previousLabel="←"
        nextLabel="→"
        breakLabel="..."
        pageCount={pageCount}
        forcePage={currentPage}
        onPageChange={({ selected }) => setCurrentPage(selected)}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        activeClassName="active"
      />
    </div>
  );
};

export default Pagination;
