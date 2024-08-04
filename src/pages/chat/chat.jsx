import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { FaHeart } from "react-icons/fa6";
import { TbWallpaper } from "react-icons/tb";
import { useParams, useNavigate } from "react-router-dom";
import ChatAxiosApi from "../../axiosapi/ChatAxiosApi";
import MainAxios from "../../axiosapi/MainAxios";
import {
  BsEmojiAngry,
  BsEmojiAstonished,
  BsEmojiFrown,
  BsEmojiDizzy,
  BsEmojiExpressionless,
  BsEmojiGrin,
  BsEmojiHeartEyes,
} from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { MdEmojiEmotions } from "react-icons/md";
import chatBack1 from "../../img/chat/pcchatimg/9.jpg";
import chatBack2 from "../../img/chat/pcchatimg/6.jpg";
import chatBack3 from "../../img/chat/pcchatimg/8.jpg";
import chatBack4 from "../../img/background/theme/4.jpg";
import chatBack5 from "../../img/chat/pcchatimg/21.png";
import chatBack6 from "../../img/chat/pcchatimg/25.png";
import chatBack7 from "../../img/chat/pcchatimg/31.png";
import chatBack8 from "../../img/background/theme/5.jpg";
import chatBack9 from "../../img/background/theme/background4.jpg";
import Common from "../../common/Common";
import Modal from "../datediary/Modal";
import modalImg from "../../img/commonImg/전구 아이콘.gif";

const GlobalStyle = styled.div`
  /* 스크롤바 스타일 */
  ::-webkit-scrollbar {
    width: 12px; /* 스크롤바 너비 */
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px; /* 둥근 모서리 */
  }
  ::-webkit-scrollbar-thumb {
    background: #cdcfc4; /* 스크롤바 색상 */
    border-radius: 10px; /* 둥근 모서리 */
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #a3a59c; /* 스크롤바 호버 색상 */
  }
`;

const BookWrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Chatpage = styled.div`
  width: 92vw;
  height: 75vh;
  border: 1px solid #696969;
  border-radius: 5px;
  background: url(${(props) => props.backgroundImage}) no-repeat center center;
  /* background-color: #9b9b9b; */
  background-size: cover;
  position: relative;
`;

const Textarea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 7px;
  align-items: flex-start;
  background: transparent;
  height: ${({ isPlusMenuVisible }) =>
    isPlusMenuVisible
      ? "calc(68vh - 25vh)"
      : "calc(68vh - 40px); border-bottom: 1px solid gray;"}; // 기본 화면 크기
`;

const Message = styled.div`
  max-width: 60%;
  padding: 10px;
  margin: 10px;
  border-radius: 20px;
  background-color: ${(props) => (props.isSender ? "#DCF8C6" : "#E0E0E0")};
  border: ${(props) =>
    props.isSender ? "1px solid #DCF8C6" : "1px solid #E0E0E0"};
  word-wrap: break-word; /* 긴 단어 또는 URL이 줄 바꿈 되도록 설정 */
  overflow-wrap: break-word; /* 긴 단어 또는 URL이 줄 바꿈 되도록 설정 */
  white-space: pre-wrap; /* 공백 및 줄 바꿈을 유지하면서 줄 바꿈 적용 */
`;

const TopDiv = styled.div`
  width: 100%;
  height: 8%;
  position: sticky;
  top: 0;
  background-color: transparent;
  border-bottom: 1px solid gray;
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const TopText = styled.div`
  width: 45%;
  height: 95%;
  padding-left: 2%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 15px;
`;

const TopName = styled.div`
  width: 50%;
  height: 95%;
  padding-right: 2%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 13px;
`;

const RoomOut = styled.div`
  width: 65px;
  height: 20px;
  margin-right: 2%;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: bolder;
  background-color: #ffd2c2;
  cursor: pointer;
  &:hover {
    font-size: 14px;
    background-color: #dadada;
  }
`;

const PlusMenu = styled.div`
  width: 100%;
  height: 80px;
  background-color: #dadada;
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  position: absolute;
  bottom: 39px;
`;

const TemaMenu = styled.div`
  width: 100%;
  height: 30%;
  background-color: #a5a5a5b7;
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  position: absolute;
  bottom: 10%;
  img {
    width: 11%;
    height: auto;
    max-height: 100%;
    cursor: pointer;
    transition: transform 0.2s;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const EmojiMenu = styled.div`
  width: 100%;
  height: 20%;
  background-color: #dadada;
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  align-items: center;
  position: absolute;
  bottom: 8%;
  justify-content: space-around;
`;

const EmojiIcon = styled.div`
  font-size: 2rem;
  cursor: pointer;
  &:hover {
    color: #ffcc00; /* 호버 시 색상 변경 */
  }
`;

const PlusMenuBtn = styled.div`
  font-size: 50px;
  padding: 10px;
  display: flex;

  gap: 20px;
  .icon:last-child {
    margin-right: 0;
  }
`;

const InputText = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 1;
  input {
    flex: 1;
    height: 25px;
    font-size: 15px;
    border: 0;
    border-radius: 10px 0 0 10px;
    outline: none;
    padding-left: 10px;
    background-color: #ffffff;
  }
  .send {
    width: 2%;
    height: 25px;
    background-color: #fdff8f;
    margin-right: 2vw;
    border: 0;
    border-radius: 0 10px 10px 0;
    outline: none;
    font-size: 1rem;
    margin-left: auto;
    cursor: pointer;
    position: relative;
    padding-right: 30px;
  }
  .heart {
    color: red;
    font-size: 20px;
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-50%);
  }
  .plus {
    position: relative;
    width: 50px;
    height: 50px;
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .plus::before,
  .plus::after {
    content: "";
    position: absolute;
    width: 25px;
    height: 3px;
    background-color: black;
  }
  .plus::before {
    transform: rotate(0deg);
  }
  .plus::after {
    transform: rotate(90deg);
  }
`;
// 메세지 옆에 해당 채팅 시간 나타내기
const MessageTime = styled.div`
  width: 50px;
  height: 100%;
  font-size: 9px;
  display: flex;
  flex-direction: ${(props) => (props.isSender ? "row-reverse" : "row")};
  align-items: center;
  font-weight: 500;
`;
const MessageBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: ${(props) => (props.isSender ? "row-reverse" : "row")};
  align-items: flex-end;
`;
const ChatMain = ({ url, clearUrl }) => {
  const [isPlusMenuVisible, setPlusMenuVisible] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(chatBack7);
  const [isTemaMenuVisible, setTemaMenuVisible] = useState(false);
  const [isEmojiMenuVisible, setEmojiMenuVisible] = useState(false);
  const { roomId } = useParams(); // 채팅방 번호
  const [chatList, setChatList] = useState([]); // 채팅 리스트
  const [socketConnected, setSocketConnected] = useState(false); // 웹소켓 연결여부
  const [inputMsg, setInputMsg] = useState(""); // 입력 메시지
  const [sender, setSender] = useState(""); // 보내는 사람
  const [receiver, setReceiver] = useState(""); // 받는 사람
  const ws = useRef(null); // 웹소켓 객체
  const [roomName, setRoomName] = useState(""); // 채팅방 이름
  const navigate = useNavigate(); // useNavigate 훅 추가
  // const [imageURL, setImageURL] = useState("");
  const [coupleNickName, setCoupleNickName] = useState(["", ""]);
  const email = sessionStorage.getItem("email");
  // 모달 내용
  const [modalContent, setModalContent] = useState("");
  //팝업 처리
  const [modalOpen, setModalOpen] = useState(false);

  const pageMove = useCallback(() => {
    navigate(url);
    clearUrl();
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

  const onChangMsg = (e) => {
    setInputMsg(e.target.value);
  };

  const onEnterKey = (e) => {
    // 엔터키 입력시, 공백 제거 후 비어있지 않으면
    if (e.key === "Enter" && inputMsg.trim() !== "") {
      e.preventDefault();
      onClickMsgSend(e);
    }
  };

  const onClickMsgSend = (e) => {
    const sendMessage = async (roomId, sender, receiver, message) => {
      try {
        const rsp = await ChatAxiosApi.chatMessagesSave(
          roomId,
          sender,
          receiver,
          message
        );
        setInputMsg(""); // 메시지 전송 후 입력 필드 초기화
        console.error("data:", rsp);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    };
    // WebSocket을 통해 메시지 전송
    if (ws.current) {
      ws.current.send(
        JSON.stringify({
          type: "TALK",
          roomId: roomId,
          sender: sender,
          receiver: receiver,
          message: inputMsg,
        })
      );
    }

    // 서버에 메시지 저장
    sendMessage(roomId, sender, receiver, inputMsg);
    getPastMessages();
  };
  const onClickMsgClose = () => {
    // 채팅 종료
    ws.current.send(
      JSON.stringify({
        type: "CLOSE",
        roomId: roomId,
        sender: sender,
        message: `${coupleNickName[0]}+님이 나갔습니다`,
      })
    );
    ws.current.close(); // WebSocket 종료
    ws.current = null; // WebSocket 객체를 null로 설정
    //DB에서 채팅방 삭제
    deleteChatRoom(roomId);
    navigate("/Chat");
  };
  //채팅방 삭제하는 Axios함수
  const deleteChatRoom = async (roomId) => {
    const res = await ChatAxiosApi.deleteChatRoom(roomId);
    console.log(res.data);
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
  //채팅방 데이터 가져오는 부분
  const getPastMessages = async () => {
    try {
      const rsp = await ChatAxiosApi.pastChatDetail(roomId);
      console.log("채팅 데이터 보자", rsp.data);
      setChatList(rsp.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const accessToken = Common.getAccessToken();
    // 채팅방 정보가져오는 부분
    const getChatRoom = async () => {
      try {
        const rsp = await ChatAxiosApi.chatDetail(roomId);
        setRoomName(rsp.data.name);
        console.log(rsp.data.chatData);
      } catch (e) {
        if (e.rsp.status === 401) {
          await Common.handleUnauthorized();
          const newToken = Common.getAccessToken();
          if (newToken !== accessToken) {
            const rsp = await ChatAxiosApi.chatDetail(roomId);
            console.log(rsp.data.name);
            setRoomName(rsp.data.name);
          }
        }
      }
    };

    getChatRoom();
    getPastMessages();
  }, []);

  useEffect(() => {
    // console.log("방번호 : " + roomId);
    if (!ws.current) {
      ws.current = new WebSocket(Common.PALETTE_SOCKET_URL);
      ws.current.onopen = () => {
        console.log("connected to " + Common.PALETTE_SOCKET_URL);
        setSocketConnected(true);
      };
    }
    if (socketConnected) {
      ws.current.send(
        JSON.stringify({
          type: "ENTER",
          roomId: roomId,
          sender: sender,
          receiver: receiver,
          message: "처음으로 접속 합니다.",
        })
      );
    }
    ws.current.onmessage = (evt) => {
      const data = JSON.parse(evt.data);
      setChatList((prevItems) => [...prevItems, data]);
    };
  }, [socketConnected, roomId, sender, receiver]);
  // 화면 하단으로 자동 스크롤
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatList]);

  const chatContainerRef = useRef(null);

  // console.log(chatList);

  const togglePlusMenu = () => {
    setPlusMenuVisible(!isPlusMenuVisible);
    setTemaMenuVisible(false);
    setEmojiMenuVisible(false);
  };
  // 테마 토글
  const toggleTemaMenu = () => {
    setTemaMenuVisible(!isTemaMenuVisible);
    setPlusMenuVisible(false);
    setEmojiMenuVisible(false);
  };
  // 이모지 토글
  const toggleEmojiMenu = () => {
    setEmojiMenuVisible(!isEmojiMenuVisible);
    setPlusMenuVisible(false);
    setTemaMenuVisible(false);
  };
  // 테마 토글
  const handleTemaClick = (image) => {
    setBackgroundImage(image);
    setTemaMenuVisible(false);
  };
  //삭제토글
  const handleRoomDeleteClick = () => {
    // 서버에서 사용자 상태 확인 후 삭제 시도
    deleteModal();
  };
  const deleteModal = () => {
    setModalOpen(true);
    setModalContent("채팅방을 삭제하시겠습니까?");
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const deleteOkHandler = () => {
    onClickMsgClose();
    setModalOpen(false);
    navigate("/chat");
  };

  // 이미지 업로드 부분
  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (!file) return;

  //   const storageRef = chatstorage.ref();
  //   const fileRef = storageRef.child(file.name);
  //   fileRef
  //     .put(file)
  //     .then(() => {
  //       return fileRef.getDownloadURL();
  //     })
  //     .then((url) => {
  //       setImageURL(url);
  //       console.log("File available at", url);
  //       const messageData = {
  //         type: "IMAGE",
  //         sender: sender,
  //         receiver: receiver,
  //         message: "",
  //         imageUrl: url,
  //       };
  //       ws.current.send(JSON.stringify(messageData));
  //       setChatList((prevChatList) => [
  //         ...prevChatList,
  //         { sender: sender, message: "", imageUrl: url },
  //       ]); // 로컬 상태 업데이트
  //     })
  //     .catch((error) => {
  //       console.error("Error uploading file: ", error);
  //     });
  // };

  //커플 개인 닉네임 불러오기
  const coupleNickNameAxois = async (couple) => {
    const resNickName = await MainAxios.searchNickName(email, couple);
    setCoupleNickName(resNickName.data);
  };
  useEffect(() => {
    const coupleName = sessionStorage.getItem("coupleName");
    coupleNickNameAxois(coupleName);
  }, []);
  const closeBtnOnClickHandler = () => {
    navigate(-1);
  };
  const truncateRoomName = (name) => {
    return name.length > 5 ? name.slice(0, 5) + "..." : name;
  };
  // 날짜 표시형식 변환 함수
  const formatDateToTime = (isoDateString) => {
    console.log("ISO Date String:", isoDateString); // 디버깅용 로그
    const date = new Date(isoDateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours < 12 ? "오전" : "오후";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${period} ${formattedHours}:${formattedMinutes}`;
  };
  return (
    <GlobalStyle>
      <Modal
        open={modalOpen}
        header="채팅방 삭제"
        type={true}
        img={modalImg}
        close={closeModal}
        confirm={deleteOkHandler}
      >
        {modalContent}
      </Modal>
      <BookWrapper>
        <Chatpage backgroundImage={backgroundImage}>
          <TopDiv>
            <TopText>{coupleNickName[1]} 의 채팅</TopText>
            <TopName>채팅방 : {truncateRoomName(roomName)}</TopName>
            <RoomOut onClick={closeBtnOnClickHandler}>나가기</RoomOut>
          </TopDiv>
          <Textarea
            ref={chatContainerRef}
            isPlusMenuVisible={
              isPlusMenuVisible || isTemaMenuVisible || isEmojiMenuVisible
            }
          >
            {chatList.map((chat, index) => (
              <MessageBox key={index} isSender={chat.sender === sender}>
                <Message isSender={chat.sender === sender}>
                  {chat.message}
                </Message>
                <MessageTime isSender={chat.sender === sender}>
                  {formatDateToTime(chat.regDate)}
                </MessageTime>
              </MessageBox>
            ))}
          </Textarea>
          <PlusMenu isVisible={isPlusMenuVisible}>
            <PlusMenuBtn>
              {/* <label htmlFor="imageInput">
              <FaRegImage className="icon 이미지사진" />
            </label>
            <input
              type="file"
              id="imageInput"
              ref={inputFileRef}
              style={{ display: "none" }}
              onChange={handleImageUpload}
            /> */}
              <TbWallpaper className="icon 톱니" onClick={toggleTemaMenu} />
              <MdEmojiEmotions
                className="icon 임티"
                onClick={toggleEmojiMenu}
              />
              <MdDelete className="방삭제" onClick={handleRoomDeleteClick} />
            </PlusMenuBtn>
          </PlusMenu>
          <TemaMenu isVisible={isTemaMenuVisible}>
            <img
              src={chatBack1}
              alt="테마1"
              onClick={() => handleTemaClick(chatBack1)}
            />
            <img
              src={chatBack2}
              alt="테마2"
              onClick={() => handleTemaClick(chatBack2)}
            />
            <img
              src={chatBack3}
              alt="테마3"
              onClick={() => handleTemaClick(chatBack3)}
            />
            <img
              src={chatBack4}
              alt="테마3"
              onClick={() => handleTemaClick(chatBack4)}
            />
            <img
              src={chatBack5}
              alt="테마4"
              onClick={() => handleTemaClick(chatBack5)}
            />
            <img
              src={chatBack6}
              alt="테마3"
              onClick={() => handleTemaClick(chatBack6)}
            />
            <img
              src={chatBack7}
              alt="테마3"
              onClick={() => handleTemaClick(chatBack7)}
            />
            <img
              src={chatBack8}
              alt="테마3"
              onClick={() => handleTemaClick(chatBack8)}
            />
            <img
              src={chatBack9}
              alt="테마9"
              onClick={() => handleTemaClick(chatBack9)}
            />
          </TemaMenu>
          <EmojiMenu isVisible={isEmojiMenuVisible}>
            <EmojiIcon>
              <BsEmojiHeartEyes />
            </EmojiIcon>
            <EmojiIcon>
              <BsEmojiAngry></BsEmojiAngry>
            </EmojiIcon>
            <EmojiIcon>
              <BsEmojiAstonished />
            </EmojiIcon>
            <EmojiIcon>
              <BsEmojiFrown />
            </EmojiIcon>
            <EmojiIcon>
              <BsEmojiDizzy />
            </EmojiIcon>
            <EmojiIcon>
              <BsEmojiExpressionless />
            </EmojiIcon>
            <EmojiIcon>
              <BsEmojiGrin />
            </EmojiIcon>
          </EmojiMenu>
          <InputText>
            <button className="plus" onClick={togglePlusMenu}></button>
            <input
              type="text"
              value={inputMsg}
              onChange={onChangMsg}
              placeholder="메시지를 입력하세요"
              onKeyUp={onEnterKey}
            />
            <button className="send" onClick={onClickMsgSend}>
              <FaHeart className="heart" />
            </button>
          </InputText>
        </Chatpage>
      </BookWrapper>
    </GlobalStyle>
  );
};

export default ChatMain;
