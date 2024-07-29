import styled from "styled-components";
import LetterOpenImg from "../../img/background/mobile/편지지2.jpg";
import { Outlet, Link } from "react-router-dom";
import logo from "../../img/background/logo.png";
import chatLogo from "../../img/background/chatLogo.png";
import { useState, useEffect } from "react";
import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";
import BookMark from "../bookmark/BookMark";

const Contain = styled.div`
  width: 100vw;
  height: 100vh;
  /* background-image: url(${LetterOpenImg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat; */

  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const LetterBefore = styled.div`
  width: 100%;
  height: 100%;
`;
const LetterOpen = styled.div`
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LetterBox = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LogoBefore = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoDiv = styled.div`
  width: 100vw;
  height: 10vh;
  padding: 5%;
  border-bottom: 1px solid #696969;
  background-color: #feeee8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* z-index: 999; */
  & > .temp {
    width: 40px;
    height: 40px;
  }
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

const Logo2 = styled.div`
  width: 30vw;
  aspect-ratio: 1/1;
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
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
const BookMarkDiv = styled.div`
  width: 100%;
  background-color: #feeee8;
  display: flex;
  justify-content: center;
  align-items: end;
  z-index: 999;
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

const LoginLetter = ({ notLoginState }) => {
  return (
    <Contain>
      {!notLoginState && (
        <LogoBefore>
          <Link to="/">
            <Logo2 />
          </Link>
        </LogoBefore>
      )}
      {notLoginState && (
        <LogoDiv>
          <div className="temp"></div>
          <Link to={`/main-page`}>
            <Logo src={logo} />
          </Link>
          <Link to={`/Chat`}>
            <ChatLogo alt="logo" src={chatLogo} />
          </Link>
        </LogoDiv>
      )}
      {!notLoginState && (
        <>
          <LetterBefore>
            <Outlet />
          </LetterBefore>
        </>
      )}
      {notLoginState && (
        <>
          <LetterOpen>
            <LetterBox>
              <Outlet />
            </LetterBox>
          </LetterOpen>
        </>
      )}
      <BookMarkDiv>
        {!notLoginState && <></>}
        {notLoginState && (
          <>
            <BookMarkBox>
              <BookMark />
            </BookMarkBox>
          </>
        )}
      </BookMarkDiv>
    </Contain>
  );
};
export default LoginLetter;
