import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "../assets/media/styles/components/Header.module.css";
import { useAuth } from "../context/AuthContext.jsx";
import { LuUserRound } from "react-icons/lu";
import { useState } from "react";
import LogoutModal from "./LogoutModal";

function Header() {
  const navigate = useNavigate();
  const { role, setRole, setUser } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    // Clear user session
    localStorage.clear();
    setShowLogoutModal(false);
    setUser(null);
    setRole("guest");
    navigate("/login");
  };

  return (
    <>
      <header
        className={`navbar navbar-expand-lg navbar-light bg-light ${styles.headerCustom}`}
      >
        <div className="container-fluid">
          {/* Logo */}
          <Link className="navbar-brand fw-bold" to="/">
            📚 BookSwap
          </Link>

          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#headerNav"
            aria-controls="headerNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar links */}
          <div className="collapse navbar-collapse" id="headerNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? styles.active : ""}`
                  }
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/show-all-books"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? styles.active : ""}`
                  }
                >
                  Books
                </NavLink>
              </li>

              {role === "customer" && (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/add-book"
                      className={({ isActive }) =>
                        `nav-link ${isActive ? styles.active : ""}`
                      }
                    >
                      Add Book
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="/user-books"
                      className={({ isActive }) =>
                        `nav-link ${isActive ? styles.active : ""}`
                      }
                    >
                      Manage Books
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="/manage-books-request"
                      className={({ isActive }) =>
                        `nav-link ${isActive ? styles.active : ""}`
                      }
                    >
                      Manage Books Request
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="/orders"
                      className={({ isActive }) =>
                        `nav-link ${isActive ? styles.active : ""}`
                      }
                    >
                      My Orders
                    </NavLink>
                  </li>

                  {/* User Dropdown */}
                  <li className="nav-item dropdown ms-2">
                    <span
                      className="nav-link dropdown-toggle"
                      id="userDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ cursor: "pointer" }}
                    >
                      <LuUserRound size={22} />
                    </span>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="userDropdown"
                    >
                      <li>
                        <NavLink className="dropdown-item" to="/user-profile">
                          Profile
                        </NavLink>
                      </li>
                      <li>
                        <span
                          className="dropdown-item"
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowLogoutModal(true)}
                        >
                          Logout
                        </span>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              {role === "guest" && (
                <li className="nav-item ms-2">
                  <Link
                    to="/login"
                    className={`btn btn-primary ${styles.loginButton}`}
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </header>

      {/* Logout Modal */}
      <LogoutModal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}

export default Header;
