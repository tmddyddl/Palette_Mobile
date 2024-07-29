import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import CoupleImg from "../../common/couple/CoupleImgMini";
import Guestbook from "./Guestbook";
import BoardAxios from "../../axiosapi/BoardAxios";
import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";

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

const BookContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

const BookTheme = styled.div`
  width: 100%;
  height: 75vh;
  border: 1px solid #696969;
  background-color: #fff9f2;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
`;

const BookTheme2 = styled.div`
  width: 100%;
  height: 75vh;
  border: 1px solid #696969;
  background-color: #fff9f2;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const BookSign2 = styled.div`
  width: 92vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const BoardSide = styled.div`
  width: 92vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const BoardTitle = styled.div`
  margin-top: 2%;
  width: 100%;
  height: 6%;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoupleDiv = styled.div`
  width: 100%;
  height: 18%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoardGrayBar = styled.div`
  margin-top: 1.5vh;
  width: 90%;
  height: 0.5%;
  background-color: #b0b0b0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoardPost = styled.div`
  margin-top: 2vh;
  width: 230px;
  margin-left: 65vw;
  height: 1vh;
  font-size: 11px;
  font-weight: 600;
  color: black;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  cursor: pointer;
  &:hover {
    font-size: 12px;
    color: rgb(42, 65, 167);
  }
`;
const BoardTable = styled.table`
  margin-top: 1vh;
  width: 87%;
  table-layout: fixed;
  border-collapse: collapse;
`;

const BoardTh = styled.th`
  height: 25px;
  background-color: gray;
  border: 1px solid black;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  padding: 0;
  box-sizing: border-box;
  vertical-align: middle;
  &:nth-child(1) {
    width: 15%;
  }
  &:nth-child(2) {
    width: 60%;
  }
  &:nth-child(3) {
    width: 25%;
  }
`;

const BoardTd = styled.td`
  height: 3.2vh;
  border: 1px solid black;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
`;

const NameHover = styled(BoardTd)`
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;

const BoardPaginationContainer = styled.div`
  bottom: 0;
  left: 0;
  margin-top: 3%;
  margin-bottom: 3%;
  width: 87%;
  height: 3vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoardPaginationButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  cursor: pointer;
  &:hover {
    background-color: #eeeeee;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const GuestbookSide = styled.div`
  width: 100%;
  height: 100%;
  ${({ animate }) =>
    animate &&
    css`
      opacity: 0;
      transition: opacity 1.4s;
    `}
`;

const itemsPerPage = 10;
const maxPageButtons = 5;

const GuestBoardGuestbook = ({ url, clearUrl }) => {
  const coupleName = sessionStorage.getItem("coupleName");
  const email = sessionStorage.getItem("email");
  const [currentPage, setCurrentPage] = useState(1);
  const [boardData, setBoardData] = useState([]);
  // 내 방이면 true 아니면 false
  const [isMyHome, setIsMyHome] = useState(true);
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
  };

  const pageMove = useCallback(() => {
    setAnimate(true);
    setTimeout(() => {
      navigate(url);
      clearUrl();
    }, 1800);
  }, [navigate, url, clearUrl]);

  useEffect(() => {
    if (url) {
      const encodedUrl = encodeURI(url); //공백을 문자로 인코딩
      if (window.location.pathname !== encodedUrl) {
        pageMove();
      } else {
        clearUrl();
      }
    }
  }, [url, pageMove, clearUrl]);

  useEffect(() => {
    fetchBoardDataCN();
    isMyHomeAxios();
  }, []);

  //본인만 "새 게시물 작성"이 보이도록 하는 axios
  const isMyHomeAxios = async () => {
    const myCoupleNameData = await MemberAxiosApi.renderCoupleNameSearch(email);
    if (myCoupleNameData.data !== coupleName) {
      setIsMyHome(false);
    } else {
      setIsMyHome(true);
    }
  };

  const fetchBoardDataCN = async () => {
    try {
      const data = await BoardAxios.getCoupleName(coupleName);
      setBoardData(data.data.reverse());
    } catch (error) {
      console.error("Failed to fetch board data", error);
    }
  };

  const handleNameClick = (id) => {
    navigate(`/board-details/${id}`);
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentData = boardData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(boardData.length / itemsPerPage);

  const getPaginationButtons = () => {
    const buttons = [];
    let startPage = Math.max(currentPage - Math.floor(maxPageButtons / 2), 1);
    let endPage = startPage + maxPageButtons - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxPageButtons + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <BoardPaginationButton
          key={i}
          onClick={() => handleClick(i)}
          style={{
            fontWeight: currentPage === i ? "bold" : "normal",
          }}
        >
          {i}
        </BoardPaginationButton>
      );
    }

    return buttons;
  };

  return (
    <BookContainer>
      <StyledSlider {...settings}>
        <BookTheme>
          <BoardSide>
            <BoardTitle>{coupleName}의 커플게시판</BoardTitle>
            <CoupleDiv>
              <CoupleImg />
            </CoupleDiv>
            <BoardGrayBar />
            <Link to={`/board-write`} style={{ textDecoration: "none" }}>
              {isMyHome && <BoardPost>새 게시물 작성</BoardPost>}
            </Link>
            <BoardTable>
              <thead>
                <tr>
                  <BoardTh>ID</BoardTh>
                  <BoardTh>Name</BoardTh>
                  <BoardTh>Date</BoardTh>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item) => (
                  <tr key={item.id}>
                    <BoardTd>{item.id}</BoardTd>
                    <NameHover onClick={() => handleNameClick(item.id)}>
                      {item.title}
                    </NameHover>
                    <BoardTd>{item.regDate}</BoardTd>
                  </tr>
                ))}
              </tbody>
            </BoardTable>
            <BoardPaginationContainer>
              <BoardPaginationButton
                onClick={() => handleClick(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt; 이전
              </BoardPaginationButton>
              {getPaginationButtons()}
              <BoardPaginationButton
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                다음 &gt;
              </BoardPaginationButton>
            </BoardPaginationContainer>
          </BoardSide>
        </BookTheme>
        <BookTheme2>
          <BookSign2 animate={animate}>
            <GuestbookSide animate={animate}>
              <Guestbook />
            </GuestbookSide>
          </BookSign2>
        </BookTheme2>
      </StyledSlider>
    </BookContainer>
  );
};

export default GuestBoardGuestbook;
