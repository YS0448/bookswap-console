// Home.jsx
import React from "react";
import styles from "../../assets/media/styles/common/Home.module.css";
import {useNavigate} from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();
  return (
    <div className={styles.homeWrapper}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1>Welcome to Our Library</h1>
        <p>Discover, Borrow, and Share books with ease.</p>
        <button className={styles.ctaBtn} onClick={() => navigate("/show-all-books")}> Explore Books </button>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.featureCard}>
          <h3>📚 Huge Collection</h3>
          <p>Thousands of books across different genres for you to explore.</p>
        </div>
        <div className={styles.featureCard}>
          <h3>🤝 Easy Borrow</h3>
          <p>Request to borrow books from others with just one click.</p>
        </div>
        <div className={styles.featureCard}>
          <h3>👤 Your Profile</h3>
          <p>Track your borrowed books and manage your profile easily.</p>
        </div>
      </section>

    </div>
  );
};

export default Home;
