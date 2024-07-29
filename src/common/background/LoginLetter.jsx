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
  background-image: url(${LetterOpenImg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const LogoDiv = styled.div`
  width: 100vw;
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

const LoginLetter = ({ notLoginState }) => {
  const [coupleName, setCoupleName] = useState();
  const email = sessionStorage.getItem("email");
  useEffect(() => {
    if (notLoginState) {
      coupleNameAxios();
    }
  }, []);
  const coupleNameAxios = async () => {
    const res = await MemberAxiosApi.renderCoupleNameSearch(email);
    setCoupleName(res.data);
  };
  return (
    <Contain>
      <LogoDiv>
        {!notLoginState && (
          <Link to="/">
            <Logo src={logo} />
          </Link>
        )}
        {notLoginState && (
          <>
            <Link to={`/Chat`}>
              <ChatLogo alt="logo" src={chatLogo} />
            </Link>
            <Link to={`/${coupleName}/main-page`}>
              <Logo src={logo} />
            </Link>
            <Link to={`/Chat`}>
              <ChatLogo alt="logo" src={chatLogo} />
            </Link>
          </>
        )}
      </LogoDiv>
      <LetterOpen>
        <LetterBox>
          <Outlet />
        </LetterBox>
      </LetterOpen>
      <BookMarkDiv>
        <BookMarkBox>
          <BookMark />
        </BookMarkBox>
      </BookMarkDiv>
    </Contain>
  );
};
export default LoginLetter;
