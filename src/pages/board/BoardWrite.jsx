import React, { useEffect, useState, useRef, useCallback } from "react";
import styled, { css, keyframes } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import BoardAxios from "../../axiosapi/BoardAxios";
import boardBg from "../../img/background/theme/9.jpg";
import boardBg_1 from "../../img/background/theme/9-1.jpg";
import CoupleImg from "../../common/couple/CoupleImgMini";
import AddPhoto from "../../img/board/AddPhoto.png";
import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "../../firebase/firebaseBoard";

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

const WriteSide = styled.div`
  width: 100%;
  height: 100%;  
  ${({ animate }) =>
    animate &&
    css`
      opacity: 0;
      transition: opacity 1.4s;
    `}
`;

const BackToGuestbook = styled.div`
  margin-top: 2%;
  padding-right: 2%;
  width: 100%;
  height: 1vh;
  font-size: 13px;
  font-weight: 600;
  color: black;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  &:hover {
    font-size: 14px;
    color: blue;
  }
  @media screen and (max-width: 768px) {
    font-size: 10px;
    &:hover {
      font-size: 11px;
    }
  }
`;

const WriteTitle = styled.div`
  margin-left: 1.5vw;
  margin-top: 4vh;
  width: 100%;
  height: 10%;
  display: flex;
  @media screen and (max-width: 1200px) {
    margin-top: 3vh;
  }
  @media screen and (max-width: 768px) {
    margin-top: 1.5vh;
  }
`;

const WriteTitleInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 30px;
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

const WriteGrayBar = styled.div`
  margin-left: 5%;
  width: 90%;
  height: 0.5%;
  background-color: #b0b0b0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WriteAddPhoto = styled.button`
  margin-top: 2%;
  margin-left: 5%;
  width: 2vw;
  height: 3.5vh;
  background-image: url(${AddPhoto});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #aaa;
  }
  @media screen and (max-width: 1200px) {
    height: 3vh;
  }
  @media screen and (max-width: 768px) {
    height: 1.5vh;
  }
`;
const WriteMain = styled.div`
  margin-left: 1.5vw;
  margin-top: 1.2vh;
  width: 90%;
  height: 60%;
  display: flex;
  align-items: flex-start;
`;
const WriteMainInput = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 20px;
  resize: none;
  overflow-y: auto;
  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
`;
const WritePost = styled.div`
  margin-top: 2%;
  width: 100%;
  padding-right: 5%;
  height: 1vh;
  font-size: 16px;
  font-weight: 600;
  color: black;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  &:hover {
    font-size: 14px;
    color: blue;
  }
  @media screen and (max-width: 768px) {
    font-size: 10px;
    &:hover {
      font-size: 11px;
    }
  }
`;

const itemsPerPage = 10;
const maxPageButtons = 5;

const BoardWrite = ({url, clearUrl}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [file, setFile] = useState(null);
  const [urls, setUrls] = useState("");
  const [boardData, setBoardData] = useState([]);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  // 세션 추가
  const email = sessionStorage.getItem("email");
  const coupleName = sessionStorage.getItem("coupleName");
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
  

  // useEffect(() => {
  //   fetchBoardData();
  // }, []);
  useEffect(() => {
    fetchBoardDataCN();
  }, []);

  const fetchBoardDataCN = async () => {
    const coupleName = sessionStorage.getItem("coupleName");
    console.log(coupleName);
    try {
      const data = await BoardAxios.getCoupleName(coupleName);
      console.log("axios 데이터", data.data);
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
  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadClick = () => {
    if (!file) return;

    const fileRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress handling can be added here if needed
      },
      (error) => {
        console.error("Upload failed:", error);
        alert("파일 업로드 실패");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrls(downloadURL);
        });
      }
    );
  };

  const handleAddPhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async () => {
    if (!title || !contents) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      let downloadURL = "";

      if (file) {
        const fileRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(fileRef, file);

        downloadURL = await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // 업로드 진행 상태 처리 (optional)
            },
            (error) => {
              console.error("파일 업로드 실패:", error);
              alert("파일 업로드에 실패했습니다.");
              reject(error);
            },
            async () => {
              try {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(url);
              } catch (error) {
                console.error("URL 가져오기 실패:", error);
                reject(error);
              }
            }
          );
        });
      }

      const boardData = {
        title,
        contents,
        imgUrl: downloadURL,
        memberEmail: email || "",
      };
      console.log("제출할 데이터:", boardData);
      await submitBoard(boardData);
    } catch (error) {
      console.error("게시글 생성 실패:", error);
      alert("게시글 생성에 실패했습니다.");
    }
  };

  const submitBoard = async (boardReqDto) => {
    const coupleName = sessionStorage.getItem("coupleName");
    try {
      console.log("서버로 전송할 데이터:", boardReqDto, coupleName);
      const response = await BoardAxios.createBoard(boardReqDto, coupleName);

      console.log("서버 응답 데이터:", response);
      navigate(`/${coupleName}/board-guestbook`); // 리다이렉트
    } catch (error) {
      console.error(
        "게시글 생성 실패:",
        error.response ? error.response.data : error
      );
      alert(
        `게시글 생성에 실패했습니다: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
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
          ></Link>
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
        <WriteSide animate={animate}>
          <Link
            to={`/${coupleName}/board-guestbook`}
            style={{ textDecoration: "none" }}
          >
            <BackToGuestbook>돌아가기</BackToGuestbook>
          </Link>
          <WriteTitle>
            <WriteTitleInput
              type="text"
              placeholder="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </WriteTitle>
          <WriteGrayBar />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            style={{ display: "none" }}
          />
          <WriteAddPhoto onClick={handleAddPhotoClick}></WriteAddPhoto>
          <WriteMain>
            <WriteMainInput
              placeholder="내용을 입력하세요."
              value={contents}
              onChange={(e) => setContents(e.target.value)}
            />
          </WriteMain>
          <WritePost onClick={handleSubmit}>게시하기</WritePost>
        </WriteSide>
        </BookSign2>
      </BookTheme2>
    </>
  );
};

export default BoardWrite;
