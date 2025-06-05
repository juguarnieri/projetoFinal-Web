import React from "react";
import { Card, Button } from "antd";
import styles from "../../app/styles/UserProfile.module.css";

export default function UserCard({ user, onClick }) {
  const profileImg = user.profile_picture
    ? user.profile_picture.startsWith("http")
      ? user.profile_picture
      : `http://localhost:4000/uploads/${user.profile_picture}`
    : "https://placehold.co/300x300";

  return (
    <Card
      hoverable
      className={styles.userCard}
      cover={<img className={styles.userImg} alt={user.name} src={profileImg} />}
    >
      <Card.Meta
        title={<span className={styles.name}>{user.name}</span>}
        description={
          <div className={styles.cardContent}>
            <span className={styles.username}>@{user.username}</span>
            <Button
              type="primary"
              className={styles.profileButton}
              onClick={onClick}
            >
              Entrar
            </Button>
          </div>
        }
      />
    </Card>
  );
}