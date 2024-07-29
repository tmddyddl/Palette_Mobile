import React, { useCallback, useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import ChatAxiosApi from "../../axiosapi/ChatAxiosApi";
import ChatModal from "./ChatModal";
import chat from "../../img/background/theme/chat.jpg";
import chat_1 from "../../img/background/theme/chat-1.jpg";
import MainAxios from "../../axiosapi/MainAxios";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const StyledSlider = styled(Slider)`
//   .slick-list {
//     overflow: hidden;
//   }

//   .slick-slide {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }

//   .slick-dots {
//     bottom: 10px;

//     li {
//       margin: 0 5px;
//     }

//     button:before {
//       font-size: 12px;
//       color: gray;
//     }

//     .slick-active button:before {
//       color: black;
//     }
//   }
// `;

const turnPageLeft = keyframes`
  0% {
    transform: perspective(1000px) rotateY(0deg);
    transform-origin: left;
  }
  30% {
    transform: perspective(1600px) rotateY(-25deg);
    transform-origin: left;
  } 
  100% {
    transform: perspective(1000px) rotateY(-180deg);
    transform-origin: left;
  }
`;

const BookWrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

const BookTheme = styled.div`
  width: 100%;
  height: 75vh;
  border: 1px solid #696969;
  background-color: #fff9f2;
  /* background-image: url(${chat});
  background-size: cover; */
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
`;

const BookTheme2 = styled.div`
  width: 100%;
  height: 75vh;
  border: 1px solid #696969;
  background-color: #fff9f2;
  /* background-image: url(${chat});
  background-size: cover; */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const BookSign2 = styled.div`
  width: 425px;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  flex-direction: column;
`;

const ChatListContainer = styled.div`
  width: 425px;
  height: 100%;
  padding: 22px;
  border-radius: 5px;
  position: relative;
  background-color: #fff9f2;
  overflow: auto;
`;

const ChatUl = styled.ul`
  list-style-type: none;
`;

const ChatRoom = styled.li`
  display: flex;
  background-color: #fff;
  border: 1px solid #ddd;
  margin-top: 10px;
  padding: 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #e9e9e9;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  @media screen and (max-width: 768px) {
    font-size: 11px;
  }
`;

const Header = styled.h1`
  width: 100%;
  height: 10%;
  font-size: 26px;
  color: #000000;
  text-align: center;
  border-bottom: 1px solid darkgray;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1200px) {
    font-size: 21px;
  }
  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
`;
const HeaderDiv = styled.div`
  width: 100%;
  height: 14.2%;
  display: flex;
  flex-direction: row;
  text-align: center;
  border-bottom: 1px solid darkgray;
`;

const HeaderView = styled.h1`
  width: 61%;
  height: 100%;
  font-size: 26px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media screen and (max-width: 1200px) {
    font-size: 21px;
  }
  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
`;

const HeaderName = styled.div`
  width: 39%;
  height: 80%;
  padding-left: 1%;
  font-size: 15px;
  color: #333;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  @media screen and (max-width: 1200px) {
    font-size: 12px;
  }
  @media screen and (max-width: 768px) {
    font-size: 9px;
  }
`;

const ChatName = styled.p`
  font-size: 1.5em;
  margin: 0 10px 0;
  color: #444;
`;

const CircleFixedButton = styled.button`
  position: fixed;
  bottom: 13%;
  right: 20px;
  z-index: 10;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1da1f2;
  color: white;
  font-size: 30px;
  line-height: 1;
  box-shadow: 1px 4px 8px rgba(0, 0, 0, 0.4);
  border: none;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #1991db;
  }

  &:before {
    content: "+";
  }
`;

const PreviewContainer = styled.div`
  width: 90%;
  height: 75%;
  border-radius: 10px;
  padding: 22px;
  overflow-y: hidden;
  ${({ animate }) =>
    animate &&
    css`
      opacity: 0;
      transition: opacity 1.4s;
    `}
`;

const PreviewMessage = styled.div`
  width: 100%;
  height: 14.5%;
  background: #f1f1f1;
  padding: 10px;
  border-radius: 5px;
  margin-top: 3%;
  display: flex;
  align-items: center;
  color: ${(props) => (props.isMe ? "#1d1d1d" : "royalblue")};
  @media screen and (max-width: 768px) {
    font-size: 11px;
  }
`;

const BtnBox = styled.div`
  width: 90%;
  height: 25%;
  display: flex;
  justify-content: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  align-items: center;
  ${({ animate }) =>
    animate &&
    css`
      opacity: 0;
      transition: opacity 1.4s;
    `}
`;

const EnterBtn = styled.div`
  width: 20%;
  height: 25%;
  border-radius: 8px;
  display: flex;
  border: 1px solid darkgray;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: bolder;
  background-color: #f1f1f1;
  cursor: pointer;
  &:hover {
    background-color: #dadada;
  }
  @media screen and (max-width: 1200px) {
    font-size: 12px;
  }
  @media screen and (max-width: 768px) {
    font-size: 9px;
  }
`;

function ChatList({ url, clearUrl }) {
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [previewMessages, setPreviewMessages] = useState([]);
  const navigate = useNavigate();
  const email = sessionStorage.getItem("email");
  const [createModal, setCreateModal] = useState(false);
  const [coupleNickName, setCoupleNickName] = useState(["", ""]);

  const [animate, setAnimate] = useState(false);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
  };

  const pageMove = useCallback(() => {
    setAnimate(true);
    setTimeout(() => {
      navigate(url);
      clearUrl();
    }, 1800);
  }, [navigate, url, clearUrl]);

  useEffect(() => {
    if (url) {
      const encodedUrl = encodeURI(url);
      if (window.location.pathname !== encodedUrl) {
        pageMove();
      } else {
        clearUrl();
      }
    }
  }, [url, pageMove, clearUrl]);

  const closeModal = () => {
    setCreateModal(false);
  };

  // useEffect(() => {
  //   const fetchChatRooms = async () => {
  //     try {
  //       const response = await ChatAxiosApi.chatList(email);
  //       const filteredRooms = filterChatRooms(response.data, email);
  //       setChatRooms(filteredRooms);
  //     } catch (error) {
  //       console.error("Error fetching chat rooms:", error);
  //     }
  //   };
  //   fetchChatRooms(); // 최초 한 번 호출
  //   selectChatRoom(chatRooms.roomId);

  const coupleNickNameAxois = useCallback(
    async (couple) => {
      const resNickName = await MainAxios.searchNickName(email, couple);
      setCoupleNickName(resNickName.data);
    },
    [email]
  );

  const fetchLastMessage = async (roomId) => {
    try {
      const response = await ChatAxiosApi.pastChatDetail(roomId);
      const messages = response.data;
      return messages.length > 0
        ? messages[messages.length - 1]
        : { sender: "", message: "내용이 없습니다" };
    } catch (error) {
      console.error("Error fetching last message:", error);
      return { sender: "", message: "내용을 가져올 수 없습니다" };
    }
  };

  const filterChatRooms = (rooms, email) => {
    return rooms.filter(
      (room) =>
        (room.firstEmail === email || room.secondEmail === email) &&
        !room.deleted
    );
  };

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await ChatAxiosApi.chatList(email);
        const rooms = response.data;
        const filteredRooms = filterChatRooms(rooms, email);
        const updatedRooms = await Promise.all(
          filteredRooms.map(async (room) => {
            const lastMessage = await fetchLastMessage(room.roomId);
            return { ...room, lastMessage };
          })
        );
        setChatRooms(updatedRooms);
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
      }
    };
    // 1초마다 채팅방 목록 업데이트
    const intervalId = setInterval(fetchChatRooms, 1000);
    // 컴포넌트 언마운트 시 인터벌 해제
    return () => clearInterval(intervalId);
  }, [email]);

  const enterChatRoom = (roomId) => {
    navigate(`/chat/${roomId}`);
  };

  const selectChatRoom = async (roomId) => {
    setSelectedRoom(roomId);
    try {
      const response = await ChatAxiosApi.pastChatDetail(roomId);
      let messages = response.data;
      // 최근에 온 1개까지 미리보기
      messages = messages.reverse();
      setPreviewMessages(
        messages.length > 0
          ? messages.slice(0, 1)
          : [{ sender: "", message: "내용이 없습니다" }]
      );
    } catch (error) {
      console.error("Error fetching chat room preview:", error);
    }
  };

  const getNickNameByEmail = (email) => {
    return email === sessionStorage.getItem("email")
      ? coupleNickName[0]
      : coupleNickName[1];
  };

  const createChatRoom = () => {
    setCreateModal(true);
  };
  const truncateRoomName = (name) => {
    return name.length > 10 ? name.slice(0, 10) + "..." : name;
  };
  return (
    <BookWrapper>
      {/* <StyledSlider {...settings}> */}
      <BookTheme>
        <ChatListContainer>
          <Header>채팅방 목록</Header>
          <ChatUl>
            {chatRooms.map((room) => (
              <ChatRoom
                key={room.roomId}
                onClick={() => enterChatRoom(room.roomId)}
              >
                <ChatName>{truncateRoomName(room.name)}</ChatName>
                <PreviewMessage isMe={room.lastMessage.sender === email}>
                  {room.lastMessage.sender
                    ? `${getNickNameByEmail(
                        room.lastMessage.sender
                      )}  ${truncateRoomName(room.lastMessage.message)}`
                    : room.lastMessage.message}
                </PreviewMessage>
              </ChatRoom>
            ))}
          </ChatUl>
          <CircleFixedButton onClick={createChatRoom}></CircleFixedButton>
        </ChatListContainer>
      </BookTheme>

      {/* </StyledSlider> */}
      <ChatModal isOpen={createModal} onClose={closeModal}></ChatModal>
    </BookWrapper>
  );
}

export default ChatList;
