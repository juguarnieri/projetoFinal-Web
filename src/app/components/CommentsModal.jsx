import { Modal, Skeleton, List, Avatar } from "antd";
import Link from "next/link";

export default function CommentsModal({
  visible,
  onClose,
  comments,
  loadingComments,
  API_URL,
}) {
  return (
    <Modal
      title="Comentários"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      {loadingComments ? (
        <Skeleton active paragraph={{ rows: 3 }} />
      ) : comments.length === 0 ? (
        <p>Nenhum comentário.</p>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={(comment) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src={comment.profile_picture ? `${API_URL}/uploads/${comment.profile_picture}` : undefined} />
                }
                title={
                  <Link href={`/users/${comment.user_id}`} style={{ color: "#1677ff", fontWeight: 600 }}>
                    @{comment.username}
                  </Link>
                }
                description={comment.content}
              />
            </List.Item>
          )}
        />
      )}
    </Modal>
  );
}