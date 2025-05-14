import React from "react";
import { Modal, Button } from "antd";

const ModalUser = ({ user, visible, onClose }) => {
  if (!user) return null;

  return (
    <Modal
      title={`Perfil de ${user.name}`}
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Fechar
        </Button>,
      ]}
      width={600}
    >
      <div>
        <p>
          <strong>Nome: </strong>{user.name}
        </p>
        <p>
          <strong>Nome de usuário: </strong>@{user.username}
        </p>
        <p>
          <strong>Email: </strong>{user.email}
        </p>
        <p>
          <strong>Telefone: </strong>{user.phone}
        </p>
        <img
          src={user.profile_picture || "https://placehold.co/200x200"}
          alt={user.name}
          style={{ width: "100%", maxWidth: 300, borderRadius: 10 }}
        />
      </div>
    </Modal>
  );
};


export default ModalUser;
