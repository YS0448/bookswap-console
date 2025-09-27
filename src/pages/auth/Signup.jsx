import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../assets/media/styles/auth/Signup.module.css";
import { Toast, showToast } from "../../components/AlertService";
import apiCall from "../../api/apiCall";
import Loader from "../../components/Loader";

const initialFormData = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const initialShow = {
  password: false,
  confirmPassword: false,
};

const Signup = () => {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState(initialFormData);
  const [show, setShow] = useState(initialShow);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSignupData((prev) => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    const { fullName, email, password, confirmPassword } = signupData;

    if (!fullName) {
      showToast("error", "Please enter Full Name");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      showToast("error", "Please enter a valid email address");
      return false;
    }

    if (!password) {
      showToast("error", "Please enter Password");
      return false;
    }

    if (!confirmPassword) {
      showToast("error", "Please enter Confirm Password");
      return false;
    }

    if (password !== confirmPassword) {
      showToast("error", "Confirm Password does not match");
      return false;
    }

    return true;
  };

  const handleSignup = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await apiCall("POST", "/auth/signup", signupData);
      console.log("response:", response);
      
      showToast("success", "Signup successful! Please login.");
      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (err) {
      console.log(err);
      showToast("error", err.message || "Signup failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader/>}
      <Toast />
      <div className={`d-flex justify-content-center align-items-center ${styles.signupWrapper}`}>
        <form className={`p-4 shadow ${styles.signupForm}`} onSubmit={handleSignup}>
          <h2 className="mb-4 text-center">Sign Up</h2>

          {/* Full Name */}
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">Full Name</label>
            <input
              type="text"
              id="fullName"
              className="form-control"
              value={signupData.fullName}
              onChange={handleChange}
              placeholder="Enter your Full Name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email ID</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={signupData.email}
              onChange={handleChange}
              placeholder="Enter your email"
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
                value={signupData.password}
                onChange={handleChange}
                placeholder="Enter password"
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

          {/* Confirm Password */}
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <div className="input-group">
              <input
                type={show.confirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="form-control"
                value={signupData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
              />
              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={() => setShow((prev) => ({ ...prev, confirmPassword: !prev.confirmPassword }))}
              >
                {show.confirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">Sign Up</button>

          <div className="text-center mt-3">
            Already have an account? <Link to="/login" className={styles.loginLink}>Login</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
