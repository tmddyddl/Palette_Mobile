import styled, { css, keyframes } from "styled-components";
import CoupleImage from "../../common/couple/CoupleImg";
import Swiper from "./Swiper";
import { useCallback, useEffect, useState } from "react";
import clothesBg1 from "../../img/background/theme/clothes_background.jpg";
import { useNavigate } from "react-router-dom";

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

const CoupleimgCon = styled.div`
  margin-left: 103%;
  display: flex;
  justify-content: center;
  width: 745px;
  height: 20%;
  position: relative;
  gap: 500px;
  z-index: 1;  
  ${({ animate }) =>
    animate &&
    css`
      opacity: 0;
      transition: opacity 1s;
    `}
  @media screen and (max-width: 1200px) {
    width: 610px;
  }
  @media screen and (max-width: 768px) {
    width: 380px;
  }
`;

const BookTheme = styled.div`
  width: 497px;
  height: 67vh;
  margin-top: 5vh;
  margin-left: 0.7vw;
  border: 1px solid #696969;
  background-image: url(${clothesBg1});
  background-size: cover;
  background-position: left;
  background-repeat: no-repeat;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1200px) {
    width: 41.5%;
    height: 56vh;
    margin-top: 4vh;
  }
  @media screen and (max-width: 768px) {
    width: 41.5%;
    height: 34.5vh;
    margin-top: 3vh;
  }
`;

const BookTheme2 = styled.div`
  width: 497px;
  height: 67vh;
  margin-top: 5vh;
  margin-left: 0.1vw;
  border: 1px solid #696969;
  background-image: url(${clothesBg1});
  background-size: cover;
  background-position: right;
  background-repeat: no-repeat;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1200px) {
    width: 41.5%;
    height: 56vh;
    margin-top: 4vh;
  }
  @media screen and (max-width: 768px) {
    width: 41.5%;
    height: 34.5vh;
    margin-top: 3vh;
  }
`;

const BookSign = styled.div`
  width: 100%;
  aspect-ratio: 50/20;
  height: auto;
  display: flex;
  justify-content: end;
  flex-direction: column;
  align-items: center;
`;

const BookSign2 = styled.div`
  width: 100%;
  aspect-ratio: 50/20;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;  
  background-image: url(${clothesBg1});
  background-size: cover;
  transform: perspective(1000px) rotateY(0deg); /* 애니메이션 초기 위치 */
  transform-origin: left;

  & > .save2 {
    justify-content: end;
  }
  & > .clothDiv {
    height: 32%;
  }
  & > .optionSDiv {
    width: 480px;
    height: auto;
    display: flex;
    justify-content: flex-end;
  }
  ${({ animate }) =>
    animate &&
    css`
      animation: ${turnPageLeft} 1.8s forwards;
    `}
`;

const Title = styled.div`
  width: 100%;
  height: 4%;
  margin-top: 1%;
  font-size: 28px;
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 3.5%;
  @media screen and (max-width: 1200px) {
    font-size: 25px;
    font-weight: 600;
  }
  @media screen and (max-width: 768px) {
    font-size: 19px;
  }
`;

const OptionDiv = styled.div`
  width: 100%;
  height: 38px;
  display: flex;
  justify-content: end;  
  ${({ animate }) =>
    animate &&
    css`
      opacity: 0;
      transition: opacity 1.4s;
    `}
`;

const Options = styled.div`
  width: 100px;
  height: 100%;
  background-color: #fff;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  border-bottom: none;
  border-radius: 10px 10px 0 0;
  cursor: pointer;
  &:hover {
    background-color: rgba(189, 189, 189, 0.9);
  }
  @media screen and (max-width: 1200px) {
    width: 85px;
    height: 80%;
    font-size: 12px;
  }
  @media screen and (max-width: 768px) {
    width: 60px;
    height: 60%;
    font-size: 9px;
  }
`;

const OptionsSelectDiv = styled.div`
  width: auto;
  height: 4vh;
  display: flex;
  align-items: flex-end;
  z-index: 100;
`;

const ButtonDiv = styled.div`
  width: 79px;
  height: 5vh;
  margin-right: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1200px) {
    width: 70px;
    height: 4.5vh;
  }
  @media screen and (max-width: 768px) {
    width: 60px;
    height: 3vh;
  }
`;

const ButtonRightDiv = styled.div`
  width: 79px;
  height: 5vh;
  margin-left: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1200px) {
    width: 70px;
    height: 4.5vh;
  }
  @media screen and (max-width: 768px) {
    width: 60px;
    height: 3vh;
  }
`;

const StroeButton = styled.div`
  width: 79px;
  height: 3.5vh;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  font-size: 16px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
  @media screen and (max-width: 1200px) {
    width: 70px;
    height: 3vh;
    font-size: 15px;
  }
  @media screen and (max-width: 768px) {
    width: 50px;
    height: 2.5vh;
    font-size: 12px;
  }
`;

const ClothesFormContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 75%;
  align-items: end;
  ${({ animate }) =>
    animate &&
    css`
      opacity: 0;
      transition: opacity 1.4s;
    `}
`;

const ClothesForm = styled.div`
  width: 253px;
  height: 100%;
  background-color: #fff;
  margin-right: 15%;
  border-radius: 0.521vw;
  border: 2px solid pink;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 1200px) {
    width: 230px;
  }
  @media screen and (max-width: 768px) {
    width: 150px;
  }
`;
const ClothesForm2 = styled.div`
  width: 253px;
  height: 100%;
  background-color: #fff;
  margin-left: 15%;
  border-radius: 0.521vw;
  border: 2px solid pink;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 1200px) {
    width: 230px;
  }
  @media screen and (max-width: 768px) {
    width: 150px;
  }
`;

const DateClothes = ({ url, clearUrl }) => {
  const [isOnePiece, setIsOnePiece] = useState(false);

  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  const pageMove = useCallback(() => {
    setAnimate(true);
    setTimeout(() => {
      navigate(url);
      clearUrl();
    }, 1800);
  }, [navigate, url, clearUrl]);

  useEffect(() => {
    if (url) {
      if (window.location.pathname !== url) {
        pageMove();
      } else {
        clearUrl();
      }
    }
  }, [url, pageMove, clearUrl]);

  return (
    <>
      <BookTheme>
        <BookSign>
          <Title>데이트 룩 코디</Title>
          <CoupleimgCon animate={animate}>
            <CoupleImage clothes={true} />
          </CoupleimgCon>
          <ClothesFormContainer>
            <ButtonDiv>
              <StroeButton>저장</StroeButton>
            </ButtonDiv>
            <ClothesForm>
              <Swiper clothNum={1} />
              <Swiper clothNum={2} />
              <Swiper shoes={true} clothNum={3} />
            </ClothesForm>
          </ClothesFormContainer>
        </BookSign>
      </BookTheme>
      <BookTheme2>
        <div className="clothDiv" />
        <BookSign2 animate={animate}>
          <OptionDiv animate={animate}>
            <OptionsSelectDiv>
              <Options
                onClick={() => {
                  setIsOnePiece(true);
                }}
              >
                원피스
              </Options>
              <Options
                onClick={() => {
                  setIsOnePiece(false);
                }}
              >
                상＆하의
              </Options>
            </OptionsSelectDiv>
          </OptionDiv>
          <ClothesFormContainer animate={animate}>
            <ClothesForm2>
              <Swiper clothNum={4} OnePiece={isOnePiece} />
              <Swiper clothNum={5} OnePiece={isOnePiece} />
              <Swiper clothNum={7} OnePiece={isOnePiece} />
              <Swiper shoes={true} clothNum={6} />
            </ClothesForm2>
            <ButtonRightDiv>
              <StroeButton>저장</StroeButton>
            </ButtonRightDiv>
          </ClothesFormContainer>
        </BookSign2>
      </BookTheme2>
    </>
  );
};
export default DateClothes;
