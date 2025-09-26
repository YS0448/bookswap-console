import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../assets/media/styles/auth/Login.module.css";
import apiCall from "../../api/apiCall";
import { showToast, Toast } from "../../components/AlertService";
import {useAuth} from "../../context/AuthContext";
import { me } from "../../api/authApi";
// Initial form state
const initialFormData = {
  userId: "",
  password: "",
};

// Initial show/hide state
const initialShow = {
  password: false,
};

const Login = () => {
  const { setUser, setRole } = useAuth();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState(initialFormData);
  const [show, setShow] = useState(initialShow);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLoginData((prev) => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    const { userId, password } = loginData;

    if (!userId || userId.trim() === "") {
      showToast("error", "User ID or Email is required");
      return false;
    }

    if (!password || password.trim() === "") {
      showToast("error", "Password is required");
      return false;
    }

    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Form Validate 
    if (!validateForm()) return; 

    try {
      const response = await apiCall("POST", "/auth/login", loginData);
      console.log("response:", response);
      showToast("success", "Login successful!");


      const obj = {
        user: response?.data.user,
        token: response?.data.token,
      }
      localStorage.setItem("user-cred", JSON.stringify(obj));
      
    const currentUser = await me();

    if (currentUser) {
        setUser(currentUser);
        setRole(currentUser.role);
      }

    // Redirect after login 
      setTimeout(() => {
        navigate("/"); 
      }, 1000);

    } catch (err) {
      console.error("Error:", err);
      showToast("error", err.message || "Login failed! Please try again.");
    }
  };

  return (
    <>
      <Toast />
      <div className={`d-flex justify-content-center align-items-center ${styles.loginWrapper}`}>
        <form className={`p-4 shadow ${styles.loginForm}`} onSubmit={handleLogin}>
          <h2 className="mb-4 text-center">Login</h2>

          {/* User ID */}
          <div className="mb-3">
            <label htmlFor="userId" className="form-label">
              User ID / Email ID
            </label>
            <input
              type="text"
              id="userId"
              className="form-control"
              value={loginData.userId}
              onChange={handleChange}
              placeholder="Enter User ID or Email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <input
                type={show.password ? "text" : "password"}
                id="password"
                className="form-control"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                required
              />
              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={() => setShow((prev) => ({ ...prev, password: !prev.password }))}
              >
                {show.password ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>

          <div className={`text-center my-3 ${styles.orText}`}>or</div>
          <div className="text-center">
            Don’t have an account? <Link to="/signup" className={styles.signupLink}>Sign up</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
