import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import apiCall from "../../../api/apiCall";
import { useAuth } from "../../../context/AuthContext";
import { formatDate } from "../../../utils/formatDate";
import Loader from "../../../components/Loader";

const ManageBooksRequest = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 2; // your LIMIT

  // Fetch paginated data
  const fetchRequests = async (page = 0) => {
    try {
      setLoading(true);

      const response = await apiCall(
        "GET",
        `/api/manage-requests?owner_id=${user.user_id}&page=${
          page + 1
        }&limit=${itemsPerPage}`
      );

      setRequests(response.data.requests || []);
      setPageCount(Math.ceil(response.data.total / itemsPerPage));
    } catch (err) {
      console.error("Error fetching requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (request_id, status) => {
    try {
      await apiCall("POST", "/api/manage-requests/update", {
        request_id,
        status,
      });
      // Refresh the list after action
      fetchRequests(currentPage);
    } catch (err) {
      console.error("Error updating request:", err);
    }
  };

  useEffect(() => {
    if (user?.user_id) {
      fetchRequests(currentPage);
    }
  }, [user, currentPage]);

  if (loading) return <Loader />; // ✅ use Loader component

  return (
    <div className="container my-5">
      <h2 className="mb-4">Manage Book Requests</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Book Title</th>
              <th>Requester ID</th>
              <th>Requester</th>
              <th>Status</th>
              <th>Requested At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.length ? (
              requests.map((req) => (
                <tr key={req.request_id}>
                  <td>{req.book_title}</td>
                  <td>{req.requester_id}</td>
                  <td>{req.requester_name}</td>
                  <td>
                    <span
                      className={`badge ${
                        req.request_status === "accepted"
                          ? "bg-success"
                          : req.request_status === "declined"
                          ? "bg-danger"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {req.request_status.toUpperCase()}
                    </span>
                  </td>
                  <td>{formatDate(req.created_at)}</td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={req.request_status}
                      onChange={(e) =>
                        handleAction(req.request_id, e.target.value)
                      }
                    >
                      <option value="pending">⏳ Pending</option>
                      <option value="accepted">✅ Accepted</option>
                      <option value="declined">❌ Declined</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <ReactPaginate
        previousLabel="←"
        nextLabel="→"
        breakLabel="..."
        pageCount={pageCount}
        forcePage={currentPage}
        onPageChange={({ selected }) => setCurrentPage(selected)}
        containerClassName="pagination justify-content-center custom-pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        activeClassName="active"
      />
    </div>
  );
};

export default ManageBooksRequest;
