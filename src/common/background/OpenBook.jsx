import styled from "styled-components";
import logo from "../../img/background/logo.png";
import chatLogo from "../../img/background/chatLogo.png";
import { Outlet, Link } from "react-router-dom";
import BookMark from "../bookmark/BookMark";

const Background = styled.div`
  width: 430px;
  height: 100vh;
  background-color: #feeee8;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const LogoDiv = styled.div`
  width: 430px;
  height: 10vh;
  padding: 5%;
  border-bottom: 1px solid #696969;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 999;
`;

const Logo = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  &:hover {
    transform: scale(0.95);
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.4);
  }
`;
const ChatLogo = styled.img`
  width: 40px;
  height: 40px;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  &:hover {
    transform: scale(0.95);
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.4);
  }
`;
const BookDiv = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Book = styled.div`
  margin-top: 1%;
  width: 430px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const BookMarkDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: end;
  flex-grow: 1; /* 이 부분을 추가하여 남은 공간을 차지하게 합니다 */
`;

const BookMarkBox = styled.div`
  width: 100%;
  height: 8vh;
  border-top: 1px solid #696969;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OpenBook = () => {
  // const coupleName = sessionStorage.getItem("coupleName");
  return (
    <Background>
      <LogoDiv>
        <Link to={`/Chat`}>
          <ChatLogo alt="logo" src={chatLogo} />
        </Link>
        <Link to={`/main-page`}>
          <Logo alt="logo" src={logo} />
        </Link>
        <Link to={`/Chat`}>
          <ChatLogo alt="logo" src={chatLogo} />
        </Link>
      </LogoDiv>
      <BookDiv>
        <Book>
          <Outlet />
        </Book>
      </BookDiv>
      <BookMarkDiv>
        <BookMarkBox>
          <BookMark />
        </BookMarkBox>
      </BookMarkDiv>
    </Background>
  );
};

export default OpenBook;
