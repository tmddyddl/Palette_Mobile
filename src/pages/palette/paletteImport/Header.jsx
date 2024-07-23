import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../img/background/logo.png";
import PLogo from "../../../img/background/paletteLogo.png";

const HeaderContainer = styled.div`
  width: 100%;
  height: 10vh;
  background-color: ${({ bgColor }) => bgColor || "#feeee8"};
  transition: background-color 1.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 1100px) {
    min-width: 840px;
  }
`;

const LogoBox = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const PaletteLogo = styled(Link)`
  width: 47%;
  height: 70%;
  display: flex;
  margin-top: 1%;
  background-image: url(${PLogo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: start;
`;

const CenterLogo = styled(Link)`
  width: 7.292vw;
  height: 14.69vh;
  display: flex;
  margin-top: 2.8%;
  border-radius: 50%;
  background-image: url(${Logo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 1001;
  &:hover {
    transform: scale(0.95);
  }
`;

const MenuBar = styled.div`
  width: 100%;
  height: 5vh;
  background-color: ${({ bgColor }) => bgColor || "#feeee8"};
  transition: background-color 1.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  &:hover {
    opacity: 90%;
  }
  @media screen and (max-width: 1100px) {
    min-width: 840px;
  }
`;

const MenuBox = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Menu = styled(Link)`
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-size: 1vw;
  color: #000;
  &:hover {
    font-weight: bolder;
  }
  @media screen and (max-width: 1210px) {
    font-size: 13px;
  }
`;

const Header = ({ bgColor }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <HeaderContainer bgColor={bgColor}>
        <LogoBox>
          <PaletteLogo to="/"></PaletteLogo>
          <CenterLogo to="/"></CenterLogo>
        </LogoBox>
      </HeaderContainer>
      <MenuBar bgColor={bgColor}>
        <MenuBox>
          <Menu to="/">Palette 소개</Menu>
          <Menu to="/customer">고객센터</Menu>
          <Menu to="/customer/ad" isActive={currentPath === "/customer/ad"}>
            광고문의
          </Menu>
          <Menu to="/not-login">시작하기</Menu>
        </MenuBox>
      </MenuBar>
    </>
  );
};

export default Header;
