import styled, { keyframes } from "styled-components";
import GlobalStyle from "../../PaletteStyle.js";
import CloseBook from "../../img/palettePg/cbook.png";
import page1 from "../../img/palettePg/1p.png";
import page2 from "../../img/palettePg/2p.png";
import page3 from "../../img/palettePg/3p.png";
import { useEffect, useRef, useState } from "react";
import Dots from "./paletteImport/Dots.jsx";
import Header from "./paletteImport/Header.jsx";
import Footer from "./paletteImport/Footer.jsx";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimatedDiv = styled.div`
  opacity: 0;
  animation: ${fadeInUp} 1s forwards;
  animation-play-state: paused;
  animation-delay: ${({ delay }) => delay || "0s"};
`;

const Background = styled.div`
  width: 100%;
  height: 835vh;
  display: flex;
  flex-direction: column;
  /* overflow: hidden; */
`;

const Intro = styled(AnimatedDiv)`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff9f2;
`;

const CloseBookImg = styled(AnimatedDiv)`
  width: 50%;
  height: 80%;
  background-image: url(${CloseBook});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const OpenBookImg = styled(AnimatedDiv)`
  width: 60%;
  height: 55%;
  background-image: ${({ imageurl }) => `url(${imageurl})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const Intro1 = styled(AnimatedDiv)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: #feeee8;
`;

const Intro2 = styled(AnimatedDiv)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  background-color: #fff9f2;
`;

const PageIntro = styled(AnimatedDiv)`
  width: 35%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.8vw;
`;

const Outer = styled.div`
  height: 100vh;
  overflow-y: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const PalettePage = () => {
  const DIVIDER_HEIGHT = 5;
  const outerDivRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const animatedElementsRef = useRef([]);

  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const pageHeight = window.innerHeight;
      let nextPage = currentPage;

      if (deltaY > 0) {
        if (currentPage < 9) {
          nextPage = currentPage + 1;
        }
      } else {
        if (currentPage > 1) {
          nextPage = currentPage - 1;
        }
      }

      const nextPageOffset = nextPage === 9 ? 30 : 0;
      const scrollPosition =
        pageHeight * (nextPage - 1) +
        DIVIDER_HEIGHT * (nextPage - 1) +
        nextPageOffset;

      if (outerDivRef.current) {
        outerDivRef.current.scrollTo({
          top: scrollPosition,
          left: 0,
          behavior: "smooth",
        });
      }

      setCurrentPage(nextPage);
    };

    const outerDivRefCurrent = outerDivRef.current;
    if (outerDivRefCurrent) {
      outerDivRefCurrent.addEventListener("wheel", wheelHandler);
    }

    return () => {
      if (outerDivRefCurrent) {
        outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
      }
    };
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);

    const pageHeight = window.innerHeight;
    const nextPageOffset = page === 9 ? 30 : 0;
    const scrollPosition =
      pageHeight * (page - 1) + DIVIDER_HEIGHT * (page - 1) + nextPageOffset;

    if (outerDivRef.current) {
      outerDivRef.current.scrollTo({
        top: scrollPosition,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  // Intersection Observer로 애니메이션 트리거
  useEffect(() => {
    const elements = animatedElementsRef.current;
    const options = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.animationPlayState = "running";
        }
      });
    }, options);

    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <Dots currentPage={currentPage} onPageChange={handlePageChange} />
      <Outer ref={outerDivRef}>
        <Background>
          <Header />
          <Intro ref={(el) => animatedElementsRef.current[0] = el} data-animate>
            <PageIntro ref={(el) => animatedElementsRef.current[1] = el} data-animate>연애의 시작,</PageIntro>
            <CloseBookImg ref={(el) => animatedElementsRef.current[2] = el} data-animate />
            <PageIntro ref={(el) => animatedElementsRef.current[3] = el} data-animate>Palette</PageIntro>
          </Intro>
          <Intro1 ref={(el) => animatedElementsRef.current[4] = el} data-animate>
            <OpenBookImg ref={(el) => animatedElementsRef.current[5] = el} imageurl={page1} data-animate />
            <PageIntro ref={(el) => animatedElementsRef.current[6] = el} data-animate>지금 연애하고 계신가요?</PageIntro>
          </Intro1>
          <Intro2 ref={(el) => animatedElementsRef.current[7] = el} data-animate>
            <PageIntro ref={(el) => animatedElementsRef.current[8] = el} data-animate>팔레트를 시작하세요!</PageIntro>
            <OpenBookImg ref={(el) => animatedElementsRef.current[9] = el} imageurl={page2} data-animate />
          </Intro2>
          <Intro1 ref={(el) => animatedElementsRef.current[10] = el} data-animate>
            <OpenBookImg ref={(el) => animatedElementsRef.current[11] = el} imageurl={page3} data-animate />
            <PageIntro ref={(el) => animatedElementsRef.current[12] = el} data-animate>팔레트는 연인과 더 가까워지며,</PageIntro>
          </Intro1>
          <Intro2 ref={(el) => animatedElementsRef.current[13] = el} data-animate>
            <PageIntro ref={(el) => animatedElementsRef.current[14] = el} data-animate>서로만의 공간을 만들어 나갈 수 있습니다.</PageIntro>
            <OpenBookImg ref={(el) => animatedElementsRef.current[15] = el} imageurl={page2} data-animate />
          </Intro2>
          <Intro1 ref={(el) => animatedElementsRef.current[16] = el} data-animate>
            <OpenBookImg ref={(el) => animatedElementsRef.current[17] = el} imageurl={page3} data-animate />
            <PageIntro ref={(el) => animatedElementsRef.current[18] = el} data-animate>둘만의 추억,</PageIntro>
          </Intro1>
          <Intro2 ref={(el) => animatedElementsRef.current[19] = el} data-animate>
            <PageIntro ref={(el) => animatedElementsRef.current[20] = el} data-animate>특별한 기억,</PageIntro>
            <OpenBookImg ref={(el) => animatedElementsRef.current[21] = el} imageurl={page2} data-animate />
          </Intro2>
          <Intro1 ref={(el) => animatedElementsRef.current[22] = el} data-animate>
            <OpenBookImg ref={(el) => animatedElementsRef.current[23] = el} imageurl={page3} data-animate />
            <PageIntro ref={(el) => animatedElementsRef.current[24] = el} data-animate>Palette로 시작해보세요.</PageIntro>
          </Intro1>
          <Footer />
        </Background>
      </Outer>
    </>
  );
};

export default PalettePage;
