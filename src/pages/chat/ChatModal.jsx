import React from "react";
import styled from "styled-components";
import ChatRoomCreate from "./ChatRoomCreate";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(175, 175, 175, 0.2); /* 반투명 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ChatModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ChatRoomCreate onClose={onClose} />
      </ModalContent>
    </ModalBackground>
  );
};

export default ChatModal;
