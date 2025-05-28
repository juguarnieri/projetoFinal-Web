import { Card, Button } from "antd";
import Link from "next/link";
import styles from "../styles/UserCard.module.css";

export default function PostCard({
  post,
  API_URL,
  handleLike,
  handleUnlike,
  handleOpenComments,
  likeLoading,
  userLikes,
  userId,
}) {
  return (
    <Card
      key={post.id}
      className={styles.postCard}
      cover={
        <img
          src={
            post.media_url
              ? post.media_url.startsWith("http")
                ? post.media_url
                : post.media_url.startsWith("/uploads/")
                  ? `${API_URL}${post.media_url}`
                  : `${API_URL}/uploads/${post.media_url}`
              : "/public/images/placehold.png" 
          }
          alt={post.title}
          className={styles.postImage}
        />
      }
      actions={[
        <Button
          key="like"
          loading={likeLoading[post.id]}
          onClick={() => handleLike(post.id)}
          type="link"
          style={{ color: "#1677ff" }}
          disabled={userLikes[post.id] === "like"}
        >
          👍 
        </Button>,
        <Button
          key="unlike"
          loading={likeLoading[post.id]}
          onClick={() => handleUnlike(post.id)}
          type="link"
          style={{ color: "#ff4d4f" }}
          disabled={userLikes[post.id] === "unlike"}
        >
          👎 
        </Button>,
        <span key="count">Likes: <strong>{post.like_count || 0}</strong></span>,
        <Button
          key="comments"
          onClick={() => handleOpenComments(post.id)}
          type="link"
        >
          💬 
        </Button>,
      ]}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <img
          src={
            post.profile_picture
              ? post.profile_picture.startsWith("http")
                ? post.profile_picture
                : `${API_URL}/uploads/${post.profile_picture}`
              : "/img/placeholder.png"
          }
          alt={post.username || "Usuário"}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #1677ff",
            background: "#fff"
          }}
        />
        <div>
          <Link
            href={`/users/${post.user_id}`}
            style={{ fontWeight: 600, fontSize: 15, color: "#1677ff", textDecoration: "none", cursor: "pointer" }}
          >
            @{post.username}
          </Link>
        </div>
      </div>
      <Card.Meta
        title={post.title}
        description={
          <>
            <p><strong>Legenda:</strong> {post.caption || "Sem legenda"}</p>
            <p><strong>Data de criação:</strong> {post.created_at ? new Date(post.created_at).toLocaleString("pt-BR") : "Desconhecida"}</p>
          </>
        }
      />
    </Card>
  );
}