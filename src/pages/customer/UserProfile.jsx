// Profile.jsx
import React from "react";
import styles from "../../assets/media/styles/customer/UserProfile.module.css";
import { useAuth } from "../../context/AuthContext";
import { LuCircleUserRound } from "react-icons/lu";
import {formatDate} from "../../utils/formatDate";


const Profile = () => {
  const { user } = useAuth();

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.card}>
        <div className={styles.avatarWrapper}>
          <LuCircleUserRound className={styles.avatar}/>

        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{user.full_name}</h3>
          <p className={styles.email}>{user.email}</p>
          <span className={styles.role}>{user.role}</span>
          <p className={styles.last_login_at}>Last Login At :- {formatDate(user.last_login_at)}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
