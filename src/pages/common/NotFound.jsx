import React from "react";
import { Link } from "react-router-dom";
import styles from "../../assets/media/styles/common/NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.notFoundWrapper}>
      <h1 className={styles.errorCode}>404</h1>
      <h2 className={styles.errorText}>Page Not Found</h2>
      <p className={styles.errorMessage}>
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link to="/" className={styles.homeLink}>
        Go back Home
      </Link>
    </div>
  );
};

export default NotFound;
