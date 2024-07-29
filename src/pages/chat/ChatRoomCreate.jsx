import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ChatAxiosApi from "../../axiosapi/ChatAxiosApi";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px; /* 버튼 사이의 간격 */
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const ChatRoomCreate = ({ onClose }) => {
  const [chatRoomTitle, setChatRoomTitle] = useState("");
  const navigate = useNavigate();
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const email = sessionStorage.getItem("email");

  const handleCreateChatRoom = async () => {
    try {
      const response = await ChatAxiosApi.chatCreate(
        chatRoomTitle,
        sender,
        receiver
      );
      console.log(response.data);
      navigate(`/chat/${response.data}`);
      onClose(); // 모달 닫기
    } catch (e) {
      console.log(e);
    }
  };

  // 확인 이벤트 함수
  const okOnClickHandler = () => {
    handleCreateChatRoom();
  };

  useEffect(() => {
    const coupleEmailAxios = async () => {
      try {
        const rsp = await ChatAxiosApi.coupleEmail(email);
        console.log(rsp.data);
        setSender(rsp.data[0]);
        setReceiver(rsp.data[1]);
      } catch (error) {
        console.log(error);
      }
    };
    coupleEmailAxios();
  }, [email]);

  const handleCancel = () => {
    onClose(); // 모달 닫기
  };
  const onEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 기본 엔터키 동작 방지
      okOnClickHandler(); // 확인 버튼 클릭 핸들러 호출
    }
  };
  return (
    <Container>
      <Title>채팅방 생성</Title>
      <Input
        type="text"
        value={chatRoomTitle}
        onChange={(e) => setChatRoomTitle(e.target.value)}
        onKeyUp={onEnterKey}
      />
      <ButtonContainer>
        <Button onClick={okOnClickHandler}>확인</Button>
        <Button onClick={handleCancel}>취소</Button>
      </ButtonContainer>
    </Container>
  );
};

export default ChatRoomCreate;
