import { Modal, Skeleton, List, Avatar } from "antd";

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
                title={comment.username}
                description={comment.content}
              />
            </List.Item>
          )}
        />
      )}
    </Modal>
  );
}
