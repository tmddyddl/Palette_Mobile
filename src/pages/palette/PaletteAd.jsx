import React, { useState, useEffect, useRef } from "react";
import { keyframes, styled } from "styled-components";
import { VelocityComponent } from "velocity-react";
import Header from "./paletteImport/Header";
import Footer from "./paletteImport/Footer";
import paletteLogo from "../../img/background/paletteLogo.png";
import Ad1 from "../../img/palettePg/Ad1.png";
import Ad2 from "../../img/palettePg/Ad2.png";
import Ad3 from "../../img/palettePg/Ad3.png";
import Ad4 from "../../img/palettePg/Ad4.png";
import Ads1 from "../../img/palettePg/Ads1.png";
import Ads2 from "../../img/palettePg/Ads2.png";
import Ads3 from "../../img/palettePg/Ads3.png";
import Ads4 from "../../img/palettePg/Ads4.png";
import Ads5 from "../../img/palettePg/Ads5.png";
import Ads6 from "../../img/palettePg/Ads6.png";
import Ads7 from "../../img/palettePg/Ads7.png";
import Ads8 from "../../img/palettePg/Ads8.png";
import Ads9 from "../../img/palettePg/Ads9.png";
import ScrollToTop from "./paletteImport/ScrollToTop";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(45px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimatedDiv = styled.div`
  opacity: 0;
  animation: ${fadeInUp} 1.5s forwards;
  animation-delay: ${({ delay }) => delay || "0s"};
`;

const Body = styled.div`
  &.no-scroll {
    overflow: hidden;
  }
`;

const Background = styled.div`
  width: 100%;
  height: auto;
  background-color: #ececec;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AdTitle = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  background-color: ${({ bgColor }) => bgColor};
  transition: background-color 1.2s;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 4%;
`;

const AdLine = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: #d0d7e9;
  opacity: 0;
  animation: ${fadeInUp} 0.8s forwards;
  animation-delay: ${({ delay }) => delay || "0s"};
  animation-play-state: paused;
`;

const AdLineTitle = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10%;
  color: #3f3f3f;
  font-size: 2.6rem;
  font-weight: bolder;
  opacity: 0;
  animation: ${fadeInUp} 0.8s forwards;
  animation-delay: ${({ delay }) => delay || "0s"};
  animation-play-state: paused;
`;
const AdLineTop = styled.div`
  width: 100%;
  height: 1vh;
  background-color: #fff9f2;
`;

const AdWrapper = styled.div`
  width: 100%;
  height: 105vh;
  background-color: #fff9f2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  animation: ${fadeInUp} 1.5s forwards;
  animation-delay: ${({ delay }) => delay || "0s"};
  animation-play-state: paused;
`;

const AdWrapper2 = styled.div`
  width: 100%;
  height: 105vh;
  background-color: #fff9f2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  animation: ${fadeInUp} 1.5s forwards;
  animation-delay: ${({ delay }) => delay || "0s"};
  animation-play-state: paused;
`;

const PaletteImg = styled(AnimatedDiv)`
  width: 30%;
  height: 40%;
  background-image: url(${paletteLogo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const AdTitleWrapper = styled.div`
  width: 50%;
  height: 10%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Letter = styled.div`
  opacity: 0;
  margin-top: 100px;
  font-size: 1.7rem;
  white-space: pre;
`;

const VelocityLetter = ({ letter, delay }) => (
  <VelocityComponent
    runOnMount
    animation={{ opacity: 1, marginTop: 0 }}
    duration={500}
    delay={delay}
  >
    <Letter>{letter}</Letter>
  </VelocityComponent>
);

const StyledSwiper = styled(Swiper)`
  width: 80%;
  height: 50%; // 원하는 높이로 설정
  .swiper-pagination {
    padding: 20px;
  }
  .swiper-pagination-bullet {
    background: #393939; // 페이지네이션 점 색상 변경
    width: 0.5vw;
    height: 1vh;
    margin-bottom: 100px;
  }
  .swiper-button-next,
  .swiper-button-prev {
    color: #393939; // 네비게이션 버튼 색상 변경
  }
`;

const StyledSwiper2 = styled(Swiper)`
  width: 80%;
  height: 80%; // 원하는 높이로 설정
  .swiper-pagination {
    padding: 25px;
  }
  .swiper-pagination-bullet {
    background: #393939; // 페이지네이션 점 색상 변경
    width: 0.7vw;
    height: 1.4vh;
  }
  .swiper-button-next,
  .swiper-button-prev {
    color: #393939; // 네비게이션 버튼 색상 변경
  }
`;

const Slide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  background-color: #fff9f2;
  background-image: ${({ imageurl }) => `url(${imageurl})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const AdPage = () => {
  const [letters, setLetters] = useState([]);
  const [bgColor, setBgColor] = useState("#feeee8");

  const bodyRef = useRef(null);
  const swiper1Ref = useRef(null);
  const swiper2Ref = useRef(null);
  const adLineTitleRefs = useRef([]);
  adLineTitleRefs.current = [];

  useEffect(() => {
    const bodyElement = bodyRef.current;

    const disableScroll = () => {
      bodyElement.classList.add("no-scroll");
    };
    const enableScroll = () => {
      bodyElement.classList.remove("no-scroll");
    };
    disableScroll();
    const text = "팔레트에 광고를 하고 싶으신가요?";
    const arr = text.split("").map((letter, index) => (
      <VelocityLetter
        key={index}
        letter={letter}
        delay={100 + index * 120} // 로고 애니메이션 이후에 시작
      />
    ));

    setTimeout(() => {
      setBgColor("#141414");
      setTimeout(() => {
        setLetters(arr);
      }, 1600);
    }, 1400); //배경색 변경

    setTimeout(() => {
      setBgColor("#D0D7E9");
    }, 2500);

    setTimeout(() => {
      enableScroll();
    }, 3000);

    return () => {
      enableScroll();
    };
  }, []);

  // 사용자를 마주했을 때 애니메이션 효과
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.animationPlayState = "running";
        }
      });
    }, observerOptions);

    adLineTitleRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      adLineTitleRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !adLineTitleRefs.current.includes(el)) {
      adLineTitleRefs.current.push(el);
    }
  };

  return (
    <Body ref={bodyRef}>
      <Background>
        <Header bgColor={bgColor} />
        <AdLineTop />
        <AdTitle bgColor={bgColor}>
          <PaletteImg data-animate />
          <AdTitleWrapper>{letters}</AdTitleWrapper>
        </AdTitle>
        <AdLineTop />
        <AdLine ref={addToRefs} data-animate>
          <AdLineTitle ref={addToRefs} data-animate>
            왜 Palette 인가 ?
          </AdLineTitle>
        </AdLine>
        <AdWrapper2 ref={addToRefs} data-animate>
          <StyledSwiper2
            key="swiper2"
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            modules={[Navigation, Pagination, Autoplay]}
            onSwiper={(swiper) => (swiper2Ref.current = swiper)}
          >
            <Slide imageurl={Ad1} />
            <Slide imageurl={Ad2} />
            <Slide imageurl={Ad3} />
            <Slide imageurl={Ad4} />
          </StyledSwiper2>
        </AdWrapper2>
        <AdLine ref={addToRefs} data-animate>
          <AdLineTitle ref={addToRefs} data-animate>
            Palette Details
          </AdLineTitle>
        </AdLine>
        <AdWrapper ref={addToRefs} data-animate>
          <StyledSwiper
            key="swiper1"
            spaceBetween={30}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination, Autoplay]}
            onSwiper={(swiper) => (swiper1Ref.current = swiper)} // ref 설정
          >
            <Slide imageurl={Ads1} />
            <Slide imageurl={Ads2} />
            <Slide imageurl={Ads9} />
            <Slide imageurl={Ads3} />
            <Slide imageurl={Ads4} />
            <Slide imageurl={Ads5} />
            <Slide imageurl={Ads6} />
            <Slide imageurl={Ads7} />
            <Slide imageurl={Ads8} />
          </StyledSwiper>
        </AdWrapper>
      </Background>
      <Footer />
      <ScrollToTop img={true} />
    </Body>
  );
};

export default AdPage;
