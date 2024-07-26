import styled, { keyframes } from "styled-components";
import letter from "../../img/background/mobile/편지봉투4.png";
import background from "../../img/background/mobile/background-6517956_1920.jpg";
import logo from "../../img/background/logo.png";
import { Outlet, Link } from "react-router-dom";
const zoomInDown = keyframes`
  from {
    opacity: 0;
    transform: scale3d(.1, .1, .1) translate3d(0, -1000px, 0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  60% {
    opacity: 1;
    transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
  to {
    transform: scale3d(1, 1, 1);
  }
`;
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
  font-size: 16px;
`;

const Book = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${letter});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${zoomInDown} 2s ease-out;
`;

const BookTheme = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoDiv = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.div`
  width: 30vw;
  aspect-ratio: 1/1;
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 50%;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  &:hover {
    transform: scale(0.95);
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.4);
  }
`;

const Contents = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
`;

const NotePaper = ({ notlogin }) => {
  return (
    <Background>
      <Book>
        <BookTheme>
          <LogoDiv notlogin={notlogin}>
            <Link to="/">
              <Logo />
            </Link>
          </LogoDiv>
          <Contents>
            <Outlet />
          </Contents>
        </BookTheme>
      </Book>
    </Background>
  );
};

export default NotePaper;
