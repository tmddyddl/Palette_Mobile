import styled, { keyframes, css } from "styled-components";
import theme8 from "../../img/background/theme/8.jpg";
import theme8_1 from "../../img/background/theme/8-1.jpg";
import CoupleImg from "../../common/couple/CoupleImgMini";
import AlbumAxiosApi from "../../axiosapi/AlbumAxiosApi";
import PagePop from "./import/PagePop";
import TemaPop from "./import/TemaPop";
import { useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useRef, useState } from "react";
import deleteImageFromFirebase from "../../firebase/firebaseAlbumDel";
import Modal from "../../pages/datediary/Modal";
import modalImg from "../../img/commonImg/전구 아이콘.gif";
import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "../../firebase/firebaseAlbum";
import TemaChange from "./import/TemaChange";
import MainAxios from "../../axiosapi/MainAxios";

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
  /* background-image: url(${theme8});
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
  /* background-image: url(${theme8_1});
  background-size: cover; */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const BookSign = styled.div`
  width: 92vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const BookSign2 = styled.div`
  width: 92vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const NextButton = styled.div`
  width: 20px;
  height: 20px;
  font-weight: 600;
  font-size: 22px;
  margin-left: 20px;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    color: #ff6750;
  }
`;

const InputDetailDiv = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30%;
`;

const ImgWrapper = styled.div`
  width: 90%;
  height: 50%;
  background-color: ${(props) => props.bgColor};
  align-items: center;
  justify-content: space-evenly;
  padding-right: 1%;
  margin-top: 20%;
  display: flex;
  flex-wrap: wrap;
`;

const ImgWrapper2 = styled.div`
  width: 90%;
  height: 79%;
  background-color: ${(props) => props.bgColor};
  padding-left: 0.4%;
  margin-top: 6%;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImgBox = styled.div`
  width: 26vw;
  height: 12vh;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1%;
  position: relative;
  overflow: hidden;
  &:hover {
    cursor: ${({ hasImage }) => (hasImage ? "pointer" : "default")};
    ${({ hasImage }) =>
      hasImage &&
      `
      & > ${Img} {
        transform: scale(1.18); /* 이미지 확대 효과 */
      }
      &::after {
        content: "삭제하기";
        position: absolute;
        bottom: 5px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.6);
        color: white;
        padding: 2px 5px;
        border-radius: 3px;
        font-size: 10px;
      }
    `}
  }
`;

const Dday = styled.div`
  width: 90%;
  height: 8%;
  font-size: 13px;
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: 3%;
`;

const AlbumTitle = styled.div`
  width: 90%;
  height: 4%;
  display: flex;
  align-items: center;
  padding-left: 2%;
  font-size: 20px;
  color: #000;
  font-weight: 800;
  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
`;

const AddButton = styled.div`
  width: 90%;
  height: 9%;
  justify-content: right;
  align-items: center;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #c8c8c8;
`;

const AddTema = styled.div`
  font-size: 12px;
  color: black;
  font-weight: bolder;
  cursor: pointer;
  &:hover {
    font-size: 13px;
    color: rgb(42, 65, 167);
  }
  @media screen and (max-width: 768px) {
    font-size: 9px;
    &:hover {
      font-size: 10px;
    }
  }
`;

const AddAlbum = styled.div`
  font-size: 12px;
  color: black;
  font-weight: bolder;
  margin-left: 3%;
  cursor: pointer;
  &:hover {
    font-size: 13px;
    color: rgb(42, 65, 167);
  }
  @media screen and (max-width: 768px) {
    font-size: 9px;
    &:hover {
      font-size: 10px;
    }
  }
`;

const TitleLine = styled.div`
  width: 90%;
  height: 4%;
  display: flex;
  justify-content: flex-end;
  padding-right: 1%;
  border-bottom: 1px solid #c8c8c8;
  font-size: 13px;
  color: black;
  font-weight: bolder;
  cursor: pointer;
  &:hover {
    color: rgb(108, 101, 212);
    font-size: 14px;
  }
  @media screen and (max-width: 768px) {
    font-size: 9px;
    &:hover {
      font-size: 10px;
    }
  }
`;

const CoupleDiv = styled.div`
  width: 90%;
  height: 22%;
  padding-right: 12%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const PlusButton = styled.button`
  width: 50px;
  height: 5vh;
  font-size: 30px;
  border-radius: 50px;
  background-color: #ccc;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #aaa;
  }
  @media screen and (max-width: 1200px) {
    width: 40px;
    height: 4vh;
    font-size: 25px;
  }
  @media screen and (max-width: 768px) {
    width: 25px;
    height: 2.5vh;
    font-size: 15px;
  }
`;

const DateAlbum = ({ url, clearUrl }) => {
  const [animate, setAnimate] = useState(false);
  const [imgBoxes, setImgBoxes] = useState(
    Array(15)
      .fill(null)
      .map((_, index) => (index === 0 ? "+" : null))
  );
  const [images, setImages] = useState(Array(15).fill(null));
  const navigate = useNavigate();
  const userEmail = sessionStorage.getItem("email");
  const [pageOpen, setPageOpen] = useState(false);
  const [temaOpen, setTemaOpen] = useState(false);
  const [temaChange, setTemaChange] = useState(false);
  const [bgColor, setBgColor] = useState("#eccdaf");
  const [modalContent, setModalContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const coupleName = sessionStorage.getItem("coupleName");
  //디데이 상태저장
  const [isDday, setIsDday] = useState();
  //디데이 값 저장
  const [saveDday, setSaveDday] = useState("");
  //코드 모달 확인

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
      if (window.location.pathname !== url) {
        pageMove();
      } else {
        clearUrl();
      }
    }
  }, [url, pageMove, clearUrl]);

  const codeModalOkBtnHandler = () => {
    closeNextModal();
    navigate("/date-album");
  };

  const closeNextModal = () => {
    setModalOpen(false);
  };

  //솔로 함수
  const nextModal = () => {
    setModalOpen(true);
    setModalContent("페이지 구매 후 이용 가능합니다.");
  };

  const isAmountAxios = async () => {
    try {
      const response = await AlbumAxiosApi.getAmount(userEmail);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching amount:", error);
      setModalContent("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      setModalOpen(true);
      return null;
    }
  };

  const handleNext = async () => {
    try {
      setAnimate(true);
      setTimeout(() => {
        navigate("/date-album2");
      }, 1800);
      // const amount = await isAmountAxios(); // async 호출의 결과를 변수에 저장
      // if (amount !== null && amount % 1000 === 0) {
      //   setAnimate(true);
      //   setTimeout(() => {
      //     navigate("/date-album2");
      //   }, 1800);
      // } else {
      //   // 모달
      //   nextModal();
      //   console.log(amount);
      // }
    } catch (error) {
      console.error("Error in handleNext:", error);
      setModalContent("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setPageOpen(false);
    setTemaOpen(false);
    setTemaChange(false);
    setModalOpen(false);
  };

  const handlePagePopup = () => {
    setPageOpen(true);
  };
  const handleTemaPopup = () => {
    setTemaOpen(true);
  };
  const handleTemaChange = () => {
    setTemaChange(true);
  };

  // 이미지 불러오기
  useEffect(() => {
    // 로컬 스토리지에서 저장된 테마 색상을 가져옴
    const savedColor = localStorage.getItem(`${userEmail}_themeColor`);
    if (savedColor) {
      setBgColor(savedColor);
    }

    const fetchAlbum = async () => {
      try {
        const response = await AlbumAxiosApi.getImages(userEmail);
        const galleries = response.data;
        const updatedImages = Array(15).fill(null);
        galleries.slice(0, 15).forEach((image, index) => {
          updatedImages[index] = image.urls;
        });
        setImages(updatedImages);

        // 이미지를 기반으로 imgBoxes 배열 업데이트
        const newImgBoxes = Array(15).fill(null);
        const imageCount = galleries.length;
        if (imageCount < 15) {
          newImgBoxes[imageCount] = "+";
        }
        setImgBoxes(newImgBoxes);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchAlbum();
    //디데이 가져오기
    dDayAxios();
  }, [userEmail]);

  // 이미지 저장
  const handleAddImage = (index, file) => {
    const timestamp = new Date().getTime(); // 현재 타임스탬프 생성
    const storageRef = ref(storage, `images/${timestamp}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // 이미지 URL을 먼저 화면에 표시
    const previewUrl = URL.createObjectURL(file);

    // 이미지와 imgBoxes 배열 업데이트
    const newImages = [...images];
    const newImgBoxes = [...imgBoxes];

    newImages[index] = previewUrl;
    newImgBoxes[index] = null;
    if (index + 1 < newImgBoxes.length) {
      newImgBoxes[index + 1] = "+";
    }

    setImages(newImages);
    setImgBoxes(newImgBoxes);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // 업로드 진행 상태를 업데이트할 수 있습니다.
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at", url);

          const updatedImages = [...images];
          updatedImages[index] = url;

          setImages(updatedImages);

          // 이미지를 저장하기 위한 URL 업데이트
          await saveImageUrls(url);
        } catch (error) {
          console.error("Error getting download URL:", error);
        }
      }
    );
  };

  const saveImageUrls = async (previewUrl) => {
    const saveDate = {
      email: userEmail,
      urls: previewUrl,
    };
    try {
      const response = await AlbumAxiosApi.albumReg(saveDate);
      console.log("URLs saved successfully:", response.data);
    } catch (error) {
      console.error("Axios 에러!!!!!!!!!Error saving URLs:", error);
    }
  };

  const handleDeleteImage = async (index) => {
    const imageUrlToDelete = Array.isArray(images[index])
      ? images[index][0]
      : images[index];
    try {
      await AlbumAxiosApi.deleteImage(userEmail, imageUrlToDelete);

      // 삭제 후 이미지 배열(데이터베이스)만 새로고침
      const response = await AlbumAxiosApi.getImages(userEmail);
      const galleries = response.data;
      const updatedImages = Array(15).fill(null);
      galleries.slice(0, 15).forEach((image, index) => {
        updatedImages[index] = image.urls;
      });
      setImages(updatedImages);

      // 이미지를 기반으로 imgBoxes 배열 업데이트
      const newImgBoxes = Array(15).fill(null);
      const imageCount = galleries.length;
      if (imageCount < 15) {
        newImgBoxes[imageCount] = "+";
      }
      setImgBoxes(newImgBoxes);

      await deleteImageFromFirebase(imageUrlToDelete); // 파이어베이스 삭제
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleFileInputChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      handleAddImage(index, file);
    }
  };
  // DDay 바꾸는 함수
  const dDayAxios = async () => {
    const resDday = await MainAxios.searchDday(coupleName);
    if (resDday.data !== "") {
      setIsDday(true);
      setSaveDday(resDday.data);
      console.log("if실행");
    } else {
      setIsDday(false);
      console.log("else 실행");
    }
  };
  // 이미지 박스 렌더링 함수
  const ImgBoxComponent = ({
    index,
    startIndex,
    box,
    image,
    handleDeleteImage,
    handleFileInputChange,
  }) => {
    const fileInputRef = useRef(null);

    const handleClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    return (
      <ImgBox
        onClick={() => image && handleDeleteImage(index)}
        hasImage={image !== null}
      >
        {image && <Img src={image} alt={`album-${index + 1}`} />}
        {box === "+" && (
          <>
            <PlusButton onClick={handleClick}>+</PlusButton>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => handleFileInputChange(index, e)}
            />
          </>
        )}
      </ImgBox>
    );
  };

  const renderImageBoxes = (startIndex, endIndex) => {
    return imgBoxes
      .slice(startIndex, endIndex)
      .map((box, index) => (
        <ImgBoxComponent
          key={startIndex + index}
          index={startIndex + index}
          startIndex={startIndex}
          box={box}
          image={images[startIndex + index]}
          handleDeleteImage={handleDeleteImage}
          handleFileInputChange={handleFileInputChange}
        />
      ));
  };

  return (
    <BookContainer>
      <StyledSlider {...settings}>
        <BookTheme>
          <BookSign>
            <CoupleDiv>
              <CoupleImg />
            </CoupleDiv>
            <AlbumTitle>♥ {coupleName} 의 앨범 ♥</AlbumTitle>
            <TitleLine onClick={handleTemaChange}>테마 변경</TitleLine>
            <ImgWrapper bgColor={bgColor}>{renderImageBoxes(0, 6)}</ImgWrapper>
          </BookSign>
        </BookTheme>
        <BookTheme2>
          <BookSign2>
            <AddButton>
              <AddTema onClick={handleTemaPopup}>테마 추가</AddTema>
              <AddAlbum onClick={handlePagePopup}>앨범 추가</AddAlbum>
            </AddButton>
            <ImgWrapper2 bgColor={bgColor}>
              {isDday ? (
                <Dday>♥ D + {saveDday} ♥</Dday>
              ) : (
                <Dday>♥ 사귄날을 입력해주세요! ♥</Dday>
              )}
              {renderImageBoxes(6, 15)}
            </ImgWrapper2>
          </BookSign2>
        </BookTheme2>
      </StyledSlider>
      {/* <InputDetailDiv>
        <NextButton onClick={handleNext}>▶▶</NextButton>
      </InputDetailDiv> */}
      <TemaChange
        open={temaChange}
        close={closeModal}
        setBgColor={setBgColor}
      />
      <TemaPop open={temaOpen} close={closeModal} />
      <PagePop open={pageOpen} close={closeModal} />
      <Modal
        open={modalOpen}
        header="안내"
        type={true}
        close={closeModal}
        confirm={codeModalOkBtnHandler}
        img={modalImg}
      >
        {modalContent}
      </Modal>
    </BookContainer>
  );
};

export default DateAlbum;
