import styled from "styled-components";
import theme6 from "../../img/background/theme/6.jpg";
// import theme12 from "../../img/background/theme/12.jpg";
import theme8 from "../../img/background/theme/8.jpg";
import theme3 from "../../img/background/theme/3.jpg";
import clothesBg from "../../img/background/theme/4.jpg";
import boardBg from "../../img/background/theme/board_background.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../../pages/datediary/Modal";
import soleModalImg from "../../img/mainImg/솔로잠금.gif";
import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";
import visitLcck from "../../img/mainImg/방문자 잠금.gif";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoShirtSharp } from "react-icons/io5";
import { GiNotebook } from "react-icons/gi";

const BookMarkDiv = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
`;
const Calender = styled(FaRegCalendarAlt)`
  width: 18%;
  height: 6vh;
  cursor: pointer;
  &:hover {
    background-color: #e9d2ca;
  }
`;
const Gallery = styled(GrGallery)`
  width: 18%;
  height: 6vh;
  cursor: pointer;
  &:hover {
    background-color: #e9d2ca;
  }
`;
const DateClothes = styled(IoShirtSharp)`
  width: 18%;
  height: 6vh;
  cursor: pointer;
  &:hover {
    background-color: #e9d2ca;
  }
`;
const DatePlanner = styled(FaMapLocationDot)`
  width: 18%;
  height: 6vh;
  cursor: pointer;
  &:hover {
    background-color: #e9d2ca;
  }
`;
const Board = styled(GiNotebook)`
  width: 18%;
  height: 6vh;
  cursor: pointer;
  &:hover {
    background-color: #e9d2ca;
  }
`;
const BookMark = () => {
  const coupleName = sessionStorage.getItem("coupleName");
  const navigator = useNavigate();
  // 모달 내용
  const [modalContent, setModalContent] = useState("");
  //팝업 처리
  const [modalOpen, setModalOpen] = useState(false);
  const email = sessionStorage.getItem("email");
  const [notEqualCoupleName, setNotEqualCoupleName] = useState(false);

  //코드 모달 확인
  const codeModalOkBtnHandler = () => {
    closeModal();
    navigator("/login-page");
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  //솔로 모달
  const soloModal = () => {
    setModalOpen(true);
    setModalContent("커플 연결을 위해 로그인 페이지로 이동합니다.");
  };
  // 커플인지 확인하는 비동기함수
  const isCoupleAxios = async (emailValue) => {
    const coupleNameData = await MemberAxiosApi.renderCoupleNameSearch(
      emailValue
    );
    const resCouple = await MemberAxiosApi.isCoupleTrue(coupleNameData.data);
    return resCouple.data;
  };

  // 주인인지 방문객인지 확인
  const compareCoulpleNameFunction = async (emailData) => {
    try {
      const coupleNameData = await MemberAxiosApi.renderCoupleNameSearch(
        emailData
      );
      if (coupleNameData.data !== coupleName) {
        // 본인이 아닌 경우
        return false; // 결과를 false로 반환
      } else {
        // 본인이면서 커플일 경우
        return true; // 결과를 true로 반환
      }
    } catch (error) {
      console.error("커플 이름 비교 오류:", error);
      return false; // 오류 발생 시 false 반환
    }
  };

  const OpenDiaryOnClickHandler = async () => {
    try {
      const isCouple = await compareCoulpleNameFunction(email);

      if (isCouple) {
        // 커플일 경우
        if (await isCoupleAxios(email)) {
          navigator("/date-diary");
        } else {
          // 모달
          soloModal();
          setSession();
          console.log("솔로는 웁니다.");
        }
      } else {
        // 커플이 아닌 경우
        setModalOpen(true);
        setNotEqualCoupleName(true);
        setModalContent("방문자는 해당 기능이 잠겨있습니다.");
        navigator(`/${coupleName}/main-page`);
      }
    } catch (error) {
      // 에러 처리
      console.error("오류가 발생했습니다:", error);
    }
  };

  const OpenAlbumOnClickHandler = async () => {
    try {
      const isCouple = await compareCoulpleNameFunction(email);

      if (isCouple) {
        // 커플일 경우
        if (await isCoupleAxios(email)) {
          navigator("/date-album");
        } else {
          // 모달
          soloModal();
          setSession();
          console.log("솔로는 웁니다.");
        }
      } else {
        // 커플이 아닌 경우
        setModalOpen(true);
        setNotEqualCoupleName(true);
        setModalContent("방문자는 해당 기능이 잠겨있습니다.");
        navigator(`/${coupleName}/main-page`);
      }
    } catch (error) {
      // 에러 처리
      console.error("오류가 발생했습니다:", error);
    }
  };

  const OpenClothesOnClickHandler = async () => {
    try {
      const isCouple = await compareCoulpleNameFunction(email);

      if (isCouple) {
        // 커플일 경우
        if (await isCoupleAxios(email)) {
          navigator("/date-clothes");
        } else {
          // 모달
          soloModal();
          setSession();
          console.log("솔로는 웁니다.");
        }
      } else {
        // 커플이 아닌 경우
        setModalOpen(true);
        setNotEqualCoupleName(true);
        setModalContent("방문자는 해당 기능이 잠겨있습니다.");
        navigator(`/${coupleName}/main-page`);
      }
    } catch (error) {
      // 에러 처리
      console.error("오류가 발생했습니다:", error);
    }
  };

  const OpenDateplannerOnClickHandler = async () => {
    try {
      const isCouple = await compareCoulpleNameFunction(email);

      if (isCouple) {
        // 커플일 경우
        if (await isCoupleAxios(email)) {
          navigator(`/dateplanner`);
        } else {
          // 모달
          soloModal();
          setSession();
          console.log("솔로는 웁니다.");
        }
      } else {
        // 커플이 아닌 경우
        setModalOpen(true);
        setNotEqualCoupleName(true);
        setModalContent("방문자는 해당 기능이 잠겨있습니다.");
        navigator(`/${coupleName}/main-page`);
      }
    } catch (error) {
      // 에러 처리
      console.error("오류가 발생했습니다:", error);
    }
  };

  const OpenBoardOnClickHandler = async () => {
    if ((await isCoupleAxios(email)) === true) {
      navigator(`/board-guestbook`);
    } else {
      // 모달
      soloModal();
      setSession();
      console.log("솔로는 웁니다.");
    }
  };

  //방문객 모달 확인버튼 이벤트함수
  const visitCodeModalOkBtnHandler = () => {
    closeModal();
    navigator(`/${coupleName}/main-page`);
  };
  // 세션 초기화 함수
  const setSession = () =>{
    sessionStorage.setItem("email", "");
    sessionStorage.setItem("coupleName", "");
    sessionStorage.setItem("imgUrl", "");
    sessionStorage.setItem("myDarling", "");
    sessionStorage.setItem("kakaoImgUrl", "");
  }
  return (
    <BookMarkDiv>
      {notEqualCoupleName ? (
        <Modal
          open={modalOpen}
          header="방문객 기능잠금"
          type={true}
          confirm={visitCodeModalOkBtnHandler}
          img={visitLcck}
        >
          {modalContent}
        </Modal>
      ) : (
        <Modal
          open={modalOpen}
          header="솔로는 웁니다."
          type={true}
          confirm={codeModalOkBtnHandler}
          img={soleModalImg}
        >
          {modalContent}
        </Modal>
      )}
      <Calender onClick={OpenDiaryOnClickHandler}>다이어리</Calender>
      <Gallery onClick={OpenAlbumOnClickHandler}>갤러리</Gallery>
      <DateClothes onClick={OpenClothesOnClickHandler}>데이트룩</DateClothes>
      <DatePlanner onClick={OpenDateplannerOnClickHandler}>
        데이트 코스
      </DatePlanner>
      <Board onClick={OpenBoardOnClickHandler}>게시판</Board>
    </BookMarkDiv>
  );
};

export default BookMark;
