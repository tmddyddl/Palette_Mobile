import styled, { keyframes } from "styled-components";
import closebook from "../../img/background/closebook2.png";
import background from "../../img/background/theme/background3.jpg";
import logo from "../../img/background/logo.png";
import { Outlet, Link } from "react-router-dom";
import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";
import { useEffect, useState } from "react";
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
  background-size: 100% 100%;
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
  background-image: url(${closebook});
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
  margin-left: 52px;
  margin-bottom: 63px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 654px) {
    margin-left: 8%;
    margin-bottom: 10%;
  }
`;

const LogoDiv = styled.div`
  width: 420px;
  aspect-ratio: 420 /170;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 654px) {
    width: 70%;
    height: auto; /* 높이 자동 조절 */
  }
`;

const Logo = styled.div`
  width: 150px;
  height: 150px;
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 50%;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  &:hover {
    transform: scale(0.95);
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.4);
  }

  @media screen and (max-width: 654px) {
    width: 22vw;
    height: 22vw;
  }
`;

const Contents = styled.div`
  width: 420px;
  aspect-ratio: 420 /460;
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  align-items: center;
  font-size: 16px;

  @media screen and (max-width: 654px) {
    width: 70%;
    height: auto; /* 높이 자동 조절 */
  }
`;

const CloseBook = ({ modify }) => {
  const [coupleName, setCoupleName] = useState();
  const email = sessionStorage.getItem("email");
  useEffect(() => {
    if (modify) {
      coupleNameAxios();
    }
  }, []);
  const coupleNameAxios = async () => {
    const res = await MemberAxiosApi.renderCoupleNameSearch(email);
    setCoupleName(res.data);
  };
  return (
    <Background>
      <Book>
        <BookTheme>
          <LogoDiv>
            {!modify && (
              <Link to="/">
                <Logo />
              </Link>
            )}
            {modify && (
              <Link to={`/${coupleName}/main-page`}>
                <Logo />
              </Link>
            )}
          </LogoDiv>
          <Contents>
            <Outlet />
          </Contents>
        </BookTheme>
      </Book>
    </Background>
  );
};

export default CloseBook;
