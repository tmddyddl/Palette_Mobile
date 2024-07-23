import styled, { keyframes, css } from "styled-components";
import theme3 from "../../img/background/theme/new.jpg";
import theme3_1 from "../../img/background/theme/new-1.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// 책 넘기는 애니메이션을 위한 keyframes
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
const BookTheme = styled.div`
  width: 497px;
  height: 67vh;
  margin-top: 5vh;
  margin-left: 0.7vw;
  border: 1px solid #696969;
  background-image: url(${theme3});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 1200px) {
    width: 420px;
    height: 56vh;
    margin-top: 4.2vh;
  }
  @media screen and (max-width: 768px) {
    width: 280px;
    height: 35vh;
    margin-top: 2.8vh;
  }
`;

const BookTheme2 = styled.div`
  width: 497px;
  height: 67vh;
  margin-top: 5vh;
  margin-left: 0.1vw;
  border: 1px solid #696969;
  background-image: url(${theme3_1});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1200px) {
    width: 420px;
    height: 56vh;
    margin-top: 4.2vh;
  }
  @media screen and (max-width: 768px) {
    width: 280px;
    height: 35vh;
    margin-top: 2.8vh;
  }
`;

const PaletteText = styled.div`
  position: absolute;
  font-size: 60px;
`

const BookSign = styled.div`
  width: 497px;
  height: 67vh;

  @media screen and (max-width: 1200px) {
    width: 420px;
    height: 56vh;
  }
  @media screen and (max-width: 768px) {
    width: 280px;
    height: 35vh;
  }
`;
const BookSign2 = styled.div`
  width: 497px;
  height: 67vh;
  border: 1px solid #696969;
  background-image: url(${theme3_1});
  background-size: cover;
  transform: perspective(1000px) rotateY(0deg); /* 애니메이션 초기 위치 */
  transform-origin: left;
  border-left: 0.5px solid black;
  overflow: hidden;
  z-index: 999;
  ${({ animate }) =>
    animate &&
    css`
      animation: ${turnPageLeft} 1.8s forwards;
    `}
  @media screen and (max-width: 1200px) {
    width: 420px;
    height: 56vh;
  }
  @media screen and (max-width: 768px) {
    width: 280px;
    height: 35vh;
  }
`;

const ContentsDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ animate }) =>
    animate &&
    css`
      opacity: 0;
      transition: opacity 1.4s;
    `}
  & > p {
    font-size: 60px;
  @media screen and (max-width: 1200px) {
    font-size: 45px;
    font-weight: 500;
  }
  @media screen and (max-width: 768px) {
    font-size: 25px;
    font-weight: 400;
  }
  }
`;
const BeforeMainPage = () => {
  const [animate, setAnimate] = useState(false);
  const coupleName = sessionStorage.getItem("coupleName");
  const navigate = useNavigate();
  useEffect(() => {
    pageMove();
  }, []);
  const pageMove = () => {
    setAnimate(true);
    setTimeout(() => {
      navigate(`/${coupleName}/main-page`);
    }, 1800);
  };
  return (
    <>
      <BookTheme>
        <BookSign>
          <ContentsDiv>
            <p>둘만의 공간,</p>
          </ContentsDiv>
        </BookSign>
      </BookTheme>
      <BookTheme2>
        <BookSign2 animate={animate}>
          <ContentsDiv animate={animate}>
            {/* <p>Palette</p> */}
          </ContentsDiv>
        </BookSign2>
        <PaletteText>Palette</PaletteText>
      </BookTheme2>
    </>
  );
};

export default BeforeMainPage;
