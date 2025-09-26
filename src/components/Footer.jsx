import { Link } from "react-router-dom";
import styles from "../assets/media/styles/components/Footer.module.css";

function Footer() {
  return (
      //  Footer Section
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} MyLibrary. All rights reserved.</p>
      </footer>
  );
}

export default Footer;
