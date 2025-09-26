import { SyncLoader } from "react-spinners";
import styles from "../assets/media/styles/components/Loader.module.css";

const Loader = () => {
  return (
    <div className={styles["loader-container"]}>
      <SyncLoader color="#36d7b7" size={12} speedMultiplier={0.8} />
    </div>
  );
};

export default Loader;
