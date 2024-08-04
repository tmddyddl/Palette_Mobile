import styled from "styled-components";
import LetterOpenImg from "../../img/background/mobile/편지지2.jpg";
import { Outlet, Link, useNavigate } from "react-router-dom";
import logo from "../../img/background/logo.png";
import chatLogo from "../../img/background/chatLogo.png";
import BookMark from "../bookmark/BookMark";
import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";
import { useState } from "react";
import Modal from "../../pages/datediary/Modal";
import visitLcck from "../../img/mainImg/방문자 잠금.gif";
import soleModalImg from "../../img/mainImg/솔로잠금.gif";
const Contain = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: ${({ notLoginState }) =>
    `url(${notLoginState ? "" : LetterOpenImg})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const LetterBefore = styled.div`
  width: 100%;
  height: 100%;
`;
const LetterOpen = styled.div`
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LetterBox = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LogoBefore = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoDiv = styled.div`
  width: 100vw;
  height: 10vh;
  padding: 5%;
  border-bottom: 1px solid #696969;
  background-color: #feeee8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* z-index: 999; */
  & > .temp {
    width: 40px;
    height: 40px;
  }
`;

const Logo = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  &:hover {
    transform: scale(0.95);
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.4);
  }
`;

const Logo2 = styled.div`
  width: 30vw;
  aspect-ratio: 1/1;
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
`;

const ChatLogo = styled.div`
  width: 40px;
  height: 40px;
  background-image: url(${(props) => props.chatImg});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  &:hover {
    transform: scale(0.95);
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.4);
  }
`;
const BookMarkDiv = styled.div`
  width: 100%;
  background-color: #feeee8;
  display: flex;
  justify-content: center;
  align-items: end;
  z-index: 999;
  flex-grow: 1; /* 이 부분을 추가하여 남은 공간을 차지하게 합니다 */
`;

const BookMarkBox = styled.div`
  width: 100%;
  height: 8vh;
  border-top: 1px solid #696969;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginLetter = ({ notLoginState }) => {
  const email = sessionStorage.getItem("email");
  const coupleName = sessionStorage.getItem("coupleName");
  const navigator = useNavigate();
  // 모달 내용
  const [modalContent, setModalContent] = useState("");
  //팝업 처리
  const [modalOpen, setModalOpen] = useState(false);
  const [notEqualCoupleName, setNotEqualCoupleName] = useState(false);

  //코드 모달 확인
  const codeModalOkBtnHandler = () => {
    closeModal();
    navigator("/login-page");
  };
  //솔로 모달
  const soloModal = () => {
    setModalOpen(true);
    setModalContent("커플 연결을 위해 로그인 페이지로 이동합니다.");
  };
  const closeModal = () => {
    setModalOpen(false);
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
  // 커플인지 확인하는 비동기함수
  const isCoupleAxios = async (emailValue) => {
    const coupleNameData = await MemberAxiosApi.renderCoupleNameSearch(
      emailValue
    );
    const resCouple = await MemberAxiosApi.isCoupleTrue(coupleNameData.data);
    return resCouple.data;
  };
  const OpenChatOnClickHandler = async () => {
    try {
      const isCouple = await compareCoulpleNameFunction(email);

      if (isCouple) {
        // 커플일 경우
        if (await isCoupleAxios(email)) {
          navigator(`/Chat`);
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
        navigator(`/main-page`);
      }
    } catch (error) {
      // 에러 처리
      console.error("오류가 발생했습니다:", error);
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
    <Contain notLoginState={notLoginState}>
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
      {!notLoginState && (
        <LogoBefore>
          <Link to="/">
            <Logo2 />
          </Link>
        </LogoBefore>
      )}
      {notLoginState && (
        <LogoDiv>
          <div className="temp"></div>
          <Link to={`/main-page`}>
            <Logo src={logo} />
          </Link>
          <ChatLogo chatImg={chatLogo} onClick={OpenChatOnClickHandler} />
        </LogoDiv>
      )}
      {!notLoginState && (
        <>
          <LetterBefore>
            <Outlet />
          </LetterBefore>
        </>
      )}
      {notLoginState && (
        <>
          <LetterOpen>
            <LetterBox>
              <Outlet />
            </LetterBox>
          </LetterOpen>
        </>
      )}
      <BookMarkDiv>
        {!notLoginState && <></>}
        {notLoginState && (
          <>
            <BookMarkBox>
              <BookMark />
            </BookMarkBox>
          </>
        )}
      </BookMarkDiv>
    </Contain>
  );
};
export default LoginLetter;
