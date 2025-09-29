import React, { useEffect, useState } from "react";
import apiCall from "../../api/apiCall";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/Loader";
import ReactPaginate from "react-paginate";
import styles from "../../assets/media/styles/orders/Orders.module.css";
import { formatDate } from "../../utils/formatDate";

const Orders = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const limit = 5;

  const fetchOrders = async (page = 0) => {
    setLoading(true);
    try {
      const offset = page * limit;
      const url = `api/users/me/orders?limit=${limit}&offset=${offset}`;
      const response = await apiCall("GET", url);
      setOrders(response.data.orders || []);
      setTotalOrders(response.data.total || 0);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.user_id) fetchOrders(currentPage);
  }, [user, currentPage]);

  if (loading) return <Loader />;
  if (!orders.length) return <p className="text-center mt-4">No orders found.</p>;

  const pageCount = Math.ceil(totalOrders / limit);

  return (
    <div className="container mt-4">
      <h2>My Orders</h2>
      <div className="table-responsive mt-3">
        <table className={`table table-bordered table-striped ${styles.table}`}>
          <thead className={`table-dark ${styles.thead}`}>
            <tr>
              <th>Request ID</th>
              <th>Book Title</th>
              <th>Author</th>
              <th>Condition</th>
              <th>Status</th>
              <th>Image</th>
              <th>Requested At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.request_id}>
                <td>{order.request_id}</td>
                <td>{order.title}</td>
                <td>{order.author}</td>
                <td>{order.book_condition}</td>
                <td>{order.request_status}</td>
                <td>
                  {order.image ? (
                    <img
                      src={`${baseUrl}${order.image}`}
                      alt={order.title}
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{formatDate(order.created_at)}</td>
              </tr>
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
          containerClassName="pagination justify-content-center mt-3"
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
      )}
    </div>
  );
};

export default Orders;
