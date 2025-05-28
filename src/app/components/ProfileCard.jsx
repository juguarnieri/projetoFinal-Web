import styles from "../styles/UserCard.module.css";

export default function ProfileCard({ user, API_URL, posts = [] }) {
  const profileImg = user.profile_picture
    ? user.profile_picture.startsWith("http")
      ? user.profile_picture
      : `http://localhost:4000/uploads/${user.profile_picture}`
    : "https://placehold.co/300x300";

  return (
    <div style={{ textAlign: "center", marginBottom: 30 }}>
      <img
        src={profileImg}
        alt={user.name}
        className={styles.profilePicture}
      />
      <h2>@{user.username}</h2>
      <p>{user.name}</p>
      <div className={styles.statsContainer}>
        <div>
          <strong>{posts.length}</strong>
          <div>Publicação{posts.length === 1 ? "" : "s"}</div>
        </div>
        <div>
          <strong>{user.followers ?? 0}</strong>
          <div>Seguidores</div>
        </div>
        <div>
          <strong>{user.following ?? 0}</strong>
          <div>Seguindo</div>
        </div>
      </div>
    </div>
  );
}
