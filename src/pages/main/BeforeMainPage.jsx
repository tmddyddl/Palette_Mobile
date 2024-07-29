import styled, { css, keyframes } from "styled-components";
import theme3_1 from "../../img/background/theme/new-1.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// 책 넘기는 애니메이션을 위한 keyframes
const turnPageUp = keyframes`
  0% {
    transform: perspective(1000px) rotateX(0deg);
    transform-origin: top;
  }
  30% {
    transform: perspective(2200px) rotateX(30deg);
    transform-origin: top;
  } 
  100% {
    transform: perspective(1000px) rotateX(270deg);
    transform-origin: top;
  }
`;
const BookTheme = styled.div`
  width: 92vw;
  height: 75vh;
  border-radius: 5px;
  border: 1px solid #696969;
  background-image: url(${theme3_1});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PaletteText = styled.div`
  position: absolute;
  font-size: 60px;
`;

const BookSign = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #696969;
  background-image: url(${theme3_1});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  z-index: 999;
  ${({ animate }) =>
    animate &&
    css`
      animation: ${turnPageUp} 1.8s forwards;
    `}
`;

const ContentsDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & > p {
    font-size: 40px;
    font-weight: 500;
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
        <BookSign animate={animate}>
          <ContentsDiv>
            <p>둘만의 공간</p>
          </ContentsDiv>
        </BookSign>
        <PaletteText>Palette</PaletteText>
      </BookTheme>
    </>
  );
};

export default BeforeMainPage;
