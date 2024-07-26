import React, { useEffect, useState, useRef, useCallback } from "react";
import styled, { css, keyframes } from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import BoardAxios from "../../axiosapi/BoardAxios";
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
  width: 99%;
  height: 75vh;
  border: 1px solid #696969;
  background-color: #fff9f2;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
`;

const BookSign = styled.div`
  width: 425px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const WriteTop = styled.div`
  width: 90%;
  height: 7%;
  display: flex;
  align-items: center;
  justify-content: end;
`;

const WriteSide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
`;

const BackToGuestbook = styled.div`
  width: 100%;
  height: 3vh;
  font-size: 12px;
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
`;

const WriteTitle = styled.div`
  margin-top: 4vh;
  width: 90%;
  height: 10%;
  display: flex;
`;

const WriteTitleInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 24px;
`;

const WriteGrayBar = styled.div`
  width: 90%;
  height: 0.5%;
  background-color: #b0b0b0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PhotoDiv = styled.div`
  width: 90%;
  height: 10%;
  padding-left: 1%;
  display: flex;
  align-items: center;
  justify-content: start;
`;

const WriteAddPhoto = styled.button`
  width: 8vw;
  height: 7vh;
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
  font-size: 15px;
  resize: none;
  overflow-y: auto;
`;

const WritePost = styled.div`
  margin-top: 2%;
  width: 100%;
  padding-right: 5%;
  height: 1vh;
  font-size: 14px;
  font-weight: 600;
  color: black;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  &:hover {
    font-size: 15px;
    color: blue;
  }
`;

const BoardUpdate = ({ url, clearUrl }) => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [file, setFile] = useState(null);
  // const [url, setUrl] = useState("");
  const [boardData, setBoardData] = useState([]);
  const fileInputRef = useRef(null);
  const [placeholderTitle, setPlaceholderTitle] = useState("");
  const [placeholderContents, setPlaceholderContents] = useState("");
  // id 값을 넘김
  const location = useLocation();
  const idValue = location.state;

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

  useEffect(() => {
    fetchBoardDataCN();
    // 아이디로 데이터 불러오기
    fetchByIdAxios();
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

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAddPhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const updatehandleSubmit = async () => {
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
      await updateSubmitBoard(boardData);
    } catch (error) {
      console.error("게시글 생성 실패:", error);
      alert("게시글 생성에 실패했습니다.");
    }
  };

  const updateSubmitBoard = async (boardReqDto) => {
    try {
      console.log("서버로 전송할 데이터:", boardReqDto);
      const response = await BoardAxios.updateBoard(idValue, boardReqDto);

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
  // id로 board 데이터 불러오기
  const fetchByIdAxios = async () => {
    const res = await BoardAxios.fetchBoardById(idValue);
    setPlaceholderTitle(res.data.title);
    setPlaceholderContents(res.data.contents);
  };
  return (
    <>
      <BookTheme>
        <BookSign>
          <WriteSide>
            <WriteTop>
              <Link
                to={`/${coupleName}/board-guestbook`}
                style={{ textDecoration: "none" }}
              >
                <BackToGuestbook>돌아가기</BackToGuestbook>
              </Link>
            </WriteTop>
            <WriteTitle>
              <WriteTitleInput
                type="text"
                placeholder={placeholderTitle}
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
            <PhotoDiv>
              <WriteAddPhoto onClick={handleAddPhotoClick}></WriteAddPhoto>
            </PhotoDiv>
            <WriteMain>
              <WriteMainInput
                placeholder={placeholderContents}
                value={contents}
                onChange={(e) => setContents(e.target.value)}
              />
            </WriteMain>
            <WritePost onClick={updatehandleSubmit}>수정하기</WritePost>
          </WriteSide>
        </BookSign>
      </BookTheme>
    </>
  );
};

export default BoardUpdate;
