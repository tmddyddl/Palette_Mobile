import styled, { css } from "styled-components";
import theme3_1 from "../../img/background/theme/new-1.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BookTheme = styled.div`
  width: 425px;
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
  background-image: url(${theme3_1});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  z-index: 999;
  ${({ animate }) =>
    animate &&
    css`
      opacity: 0;
      transition: opacity 0.9s;
      transition-delay: 0.6s;
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
