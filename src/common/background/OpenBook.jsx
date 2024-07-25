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
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  &:hover {
    transform: scale(0.95);
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.4);
  }
`;
const ChatLogo = styled.img`
  width: 50px;
  height: 50px;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  &:hover {
    transform: scale(0.95);
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.4);
  }
`;
const Book = styled.div`
  width: 430px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const OpenBook = () => {
  // const coupleName = sessionStorage.getItem("coupleName");
  return (
    <Background>
      <LogoDiv>
        <Link to={`/main-page`}>
          <Logo alt="logo" src={logo} />
        </Link>
        <Link to={`/Chat`}>
          <ChatLogo alt="logo" src={chatLogo} />
        </Link>
      </LogoDiv>
      <Book>
        <Outlet />
      </Book>
      <BookMark />
    </Background>
  );
};

export default OpenBook;
