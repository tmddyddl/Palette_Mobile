import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import boardBg from "../../img/background/theme/9.jpg";
import boardBg_1 from "../../img/background/theme/9-1.jpg";
import CoupleImg from "../../common/couple/CoupleImgMini";
import Guestbook from "./Guestbook";
import BoardAxios from "../../axiosapi/BoardAxios";
import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";

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
  background-image: url(${boardBg});
  background-size: cover;
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
  margin-left: 0.05vw;
  border: 1px solid #696969;
  background-image: url(${boardBg_1});
  background-size: cover;
  display: flex;
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

const BookSign2 = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${boardBg_1});
  background-size: cover;
  transform: perspective(1000px) rotateY(0deg); /* 애니메이션 초기 위치 */
  transform-origin: left;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ animate }) =>
    animate &&
    css`
      animation: ${turnPageLeft} 1.8s forwards;
    `}
`;

const BoardSide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
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
  @media screen and (max-width: 1200px) {
    font-size: 17px;
  }
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
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
  margin-left: 80%;
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
  @media screen and (max-width: 1200px) {
    margin-left: 65%;
  }
  @media screen and (max-width: 768px) {
    height: 1px;
    font-size: 8px;
    margin-left: 43%;
  }
`;
const BoardTable = styled.table`
  margin-top: 1vh;
  width: 87%;
  table-layout: fixed;
  border-collapse: collapse;
`;

const BoardTh = styled.th`
  height: 3vh;
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
  @media screen and (max-width: 1200px) {
    height: 25px;
  }
  @media screen and (max-width: 768px) {
    height: 15px;
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
  @media screen and (max-width: 1200px) {
    height: 25px;
    font-size: 11px;
  }
  @media screen and (max-width: 768px) {
    height: 15px;
    font-size: 10px;
  }
`;

const NameHover = styled(BoardTd)`
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;
const BoardPaginationContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  margin-bottom: 3%;
  margin-left: 1.5vw;
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
  @media screen and (max-width: 768px) {
    font-size: 10px;
    margin: 0 3px;
    padding: 1px 5px;
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

const GuestBoardGuestbook = ({url, clearUrl}) => {
  const coupleName = sessionStorage.getItem("coupleName");
  const email = sessionStorage.getItem("email");
  const [currentPage, setCurrentPage] = useState(1);
  const [boardData, setBoardData] = useState([]);
  // 내 방이면 true 아니면 false
  const [isMyHome, setIsMyHome] = useState(true);
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

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
    navigate(`/${coupleName}/board-details/${id}`);
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
    <>
      <BookTheme>
        <BoardSide>
          <BoardTitle>알콩 달콩 커플게시판</BoardTitle>
          <CoupleDiv>
            <CoupleImg />
          </CoupleDiv>
          <BoardGrayBar />
          <Link
            to={`/${coupleName}/board-write`}
            style={{ textDecoration: "none" }}
          >
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
    </>
  );
};

export default GuestBoardGuestbook;
