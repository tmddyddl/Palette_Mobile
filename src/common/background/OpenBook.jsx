import styled from "styled-components";
import openbook from "../../img/background/openbook.png";
import background from "../../img/background/theme/background3.jpg";
import logo from "../../img/background/logo.png";
import { Outlet, Link } from "react-router-dom";
import BookMark from "../bookmark/BookMark";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const LogoDiv = styled.div`
  width: 192px;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1200px) {
    width: 10vw;
    height: 15.5vh;
  }
  @media screen and (max-width: 768px) {
    width: 10vw;
    height: 10vh;
  }
`;

const BookMarkDiv = styled.div`
  width: 864px;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 11.5vh; // 추가된 부분
  margin-right: 20%;
  @media screen and (max-width: 1200px) {
    width: 40vw;
    height: 15.5vh;
    margin-top: 113px; // 추가된 부분
    margin-left: 50px;
    margin-right: 80px;
  }
  @media screen and (max-width: 768px) {
    width: 40vw;
    height: 10vh;
    margin-top: 73px; // 추가된 부분
    margin-right: 80px;
  }
`;
const Logo = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  &:hover {
    transform: scale(0.95);
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.4);
  }
  @media screen and (max-width: 1200px) {
    width: 120px;
    height: 120px;
  }
  @media screen and (max-width: 768px) {
    width: 90px;
    height: 90px;
  }
`;
const Book = styled.div`
  width: 1190px;
  height: 85vh;
  background-image: url(${openbook});
  /* background-size: contain; */
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 1200px) {
    width: 1000px;
    height: 650px;
  }
  @media screen and (max-width: 768px) {
    width: 670px;
    height: 410px;
  }
`;
const TopContain = styled.div`
  width: 1920px;
  height: 17.838vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1200px) {
    width: 1000px;
    height: 17.838vh;
  }
  @media screen and (max-width: 768px) {
    width: 768px;
    height: 15vh;
  }
`;
const OpenBook = ({ onNavigate }) => {
  // const coupleName = sessionStorage.getItem("coupleName");
  return (
    <Background>
      <TopContain>
        <BookMarkDiv />
        <LogoDiv>
          <Link to={`/main-page`}>
            <Logo alt="logo" src={logo} />
          </Link>
        </LogoDiv>
        <BookMarkDiv>
          <BookMark onNavigate={onNavigate}/>
        </BookMarkDiv>
      </TopContain>
      <Book>
        <Outlet />
      </Book>
    </Background>
  );
};

export default OpenBook;
