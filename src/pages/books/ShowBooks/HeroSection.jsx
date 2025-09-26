import React from "react";
import styles from "../../../assets/media/styles/books/ShowAllBooks.module.css";

const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <div className="container text-center">
        <h1 className={styles.heroTitle}>Discover & Borrow Books</h1>
        <p className={styles.heroSubtitle}>
          Explore a wide collection of books and share knowledge with others.
        </p>
        <a href="#book-list" className={styles.ctaBtn}>
          Explore Books
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
