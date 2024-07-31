import styled from "styled-components";
import CoupleImage from "../../common/couple/CoupleImg";
import Swiper from "./Swiper";
import { useState } from "react";
import clothesBg1 from "../../img/background/theme/clothes_background.jpg";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const StyledSlider = styled(Slider)`
  .slick-list {
    overflow: hidden;
  }

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slick-dots {
    bottom: 10px;

    li {
      margin: 0 5px;
    }

    button:before {
      font-size: 12px;
      color: gray;
    }

    .slick-active button:before {
      color: black;
    }
  }
`;

const CoupleimgCon = styled.div`
  margin-left: 103vw;
  display: flex;
  justify-content: center;
  width: 184vw;
  height: 20%;
  position: relative;
  gap: 500px;
  z-index: 1;
`;

const BookContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

const BookTheme = styled.div`
  width: 100%;
  height: 75vh;
  border: 1px solid #696969;
  background-color: #fff9f2;
  /* background-image: url(${clothesBg1});
  background-size: cover; */
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
`;

const BookTheme2 = styled.div`
  width: 100%;
  height: 75vh;
  border: 1px solid #696969;
  background-color: #fff9f2;
  /* background-image: url(${clothesBg1});
  background-size: cover; */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const BookSign = styled.div`
  width: 93vw;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  flex-direction: column;
`;

const BookSign2 = styled.div`
  width: 92vw;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  flex-direction: column;

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
`;

const Title = styled.div`
  width: 100%;
  height: 4%;
  margin-top: 1%;
  font-size: 24px;
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 3.5%;
`;

const OptionDiv = styled.div`
  width: 100%;
  height: 38px;
  margin: 0% 2% 2% 0%;
  display: flex;
  justify-content: end;
`;

const Options = styled.div`
  width: 85px;
  height: 74%;
  background-color: #fff;
  font-size: 12px;
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
`;

const OptionsSelectDiv = styled.div`
  width: auto;
  height: 4vh;
  display: flex;
  align-items: flex-end;
  z-index: 100;
`;

const ButtonDiv = styled.div`
  width: 70px;
  height: 4.5vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonRightDiv = styled.div`
  width: 70px;
  height: 4.5vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StroeButton = styled.div`
  width: 55px;
  height: 2.5vh;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  font-size: 13px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const ClothesFormContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 225px;
  height: 75%;
  align-items: end;
`;

const ClothesForm = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  margin-bottom: 2%;
  border-radius: 0.521vw;
  border: 2px solid pink;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ClothesForm2 = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  margin-bottom: 2%;
  border-radius: 0.521vw;
  border: 2px solid pink;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DateClothes = () => {
  const [isOnePiece, setIsOnePiece] = useState(false);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
  };

  return (
    <BookContainer>
      <StyledSlider {...settings}>
        <BookTheme>
          <BookSign>
            <Title>데이트 룩 코디</Title>
            <CoupleimgCon>
              <CoupleImage clothes={true} />
            </CoupleimgCon>
            <ClothesFormContainer>
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
          <BookSign2>
            <OptionDiv>
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
            <ClothesFormContainer>
              <ClothesForm2>
                <Swiper clothNum={4} OnePiece={isOnePiece} />
                <Swiper clothNum={5} OnePiece={isOnePiece} />
                <Swiper clothNum={7} OnePiece={isOnePiece} />
                <Swiper shoes={true} clothNum={6} />
              </ClothesForm2>
            </ClothesFormContainer>
          </BookSign2>
        </BookTheme2>
      </StyledSlider>
    </BookContainer>
  );
};
export default DateClothes;
