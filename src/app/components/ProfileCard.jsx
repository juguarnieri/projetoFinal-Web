import styles from "../styles/UserCard.module.css";

export default function ProfileCard({ user, API_URL, posts = [] }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 30 }}>
      <img
        src={
          user.profile_picture
            ? user.profile_picture.startsWith("http")
              ? user.profile_picture
              : `${API_URL}/uploads/${user.profile_picture}`
            : "https://placehold.co/200x200"
        }
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
