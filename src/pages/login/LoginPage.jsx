import styled from "styled-components";
import personicon from "../../img/loginImg/person-icon.png";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import naver from "../../img/loginImg/naver.png";
import kakao from "../../img/loginImg/kakako.png";
import { SiGnuprivacyguard } from "react-icons/si";
import { useState } from "react";
import LoginAxios from "../../axiosapi/LoginAxios";
import Common from "../../common/Common";
import Modal from "../datediary/Modal";
import GoogleAndNaverNotLogin from "../../img/loginImg/구글,네이버 간편 로그인.gif";
import LoginModal from "../../common/utils/Modal";

const Contain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const IconDiv = styled.div`
  width: 90%;
  height: 22%;
  display: flex;
  justify-content: center;
`;

const Icon = styled.div`
  width: calc(110px - 1vw);
  height: calc(110px - 1vh);
  background-image: url(${personicon});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  @media screen and (max-width: 654px) {
    width: 30%;
    height: 100%;
  }
`;

const LoginDiv = styled.div`
  width: 100%;
  height: 32%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const InputContainer = styled.div`
  position: relative;
  width: 60%;
  height: 5vh;
  font-size: 16px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 654px) {
    font-size: 2vw;
  }
`;

const IconWrapper = styled.div`
  width: 15%;
  position: absolute;
  margin-left: 0.521vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputDiv = styled.input`
  width: 100%;
  height: 100%;
  padding-left: 20%;
  border: none;
  border-bottom: 0.21vh solid gray;
  background-color: transparent;
  font-size: 16px;
  font-weight: bolder;
  outline: none;
  &::placeholder {
    text-align: center;
    font-size: 15px;
    color: #b44a4a;
    font-weight: bolder;
    @media screen and (max-width: 654px) {
      font-size: 2vw;
    }
  }
  @media screen and (max-width: 654px) {
    width: 90%;
    height: 80%;
    font-size: 2vw;
  }
`;
const Message = styled.div`
  width: 100%;
  font-size: 12px;
  display: flex;
  justify-content: center;
  color: ${({ isCorrect }) => (isCorrect ? "green" : "red")};
  @media screen and (max-width: 654px) {
    font-size: 2vw;
  }
`;

const FindDiv = styled.div`
  width: 80%;
  height: 8%;
  display: flex;
  justify-content: space-evenly;
  & > div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  & > a {
    width: 29%;
    width: 29%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media screen and (max-height: 654px) {
    width: 270px;
  }
`;

const SigninDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Signin = styled.div`
  width: 70px;
  height: 100%;
  font-size: 16px;
  color: #b44a4a;
  font-weight: bolder;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media screen and (max-width: 654px) {
    font-size: 2.5vw;
  }
`;

const ForgotId = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #b44a4a;
  cursor: pointer;
  @media screen and (max-width: 654px) {
    font-size: 2.5vw;
  }
`;

const ForgotPassword = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #b44a4a;
  cursor: pointer;
  @media screen and (max-width: 654px) {
    font-size: 2.5vw;
  }
`;

const ButtonDiv = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginButton = styled.div`
  width: 180px;
  height: 50px;
  background-color: ${({ isActive }) =>
    isActive ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.1)"};
  border-radius: 1.042vw;
  font-size: 20px;
  color: #b44a4a;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  cursor: ${({ isActive }) => (isActive ? "pointer" : "not-allowed")};
  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.1)"};
  }
  @media screen and (max-width: 654px) {
    width: 40%;
    height: 50%;
    font-size: 3vw;
  }
`;

const SimpleLogin = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
`;

const CircleSide = styled.div`
  width: 12%;
  aspect-ratio: 1 / 1;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  &:hover {
    transform: scale(0.9);
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.4);
  }
`;
const GoogleIcon = styled(FcGoogle)`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const NaverIcon = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${naver});
  background-size: cover;
  background-position: center;
  cursor: pointer;
`;

const KakaoIcon = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${kakao});
  background-size: cover;
  background-position: center;
  cursor: pointer;
`;
const MdOutlineMailOutlineStyle = styled(MdOutlineMailOutline)`
  width: 24px;
  height: 2.518vh;
  color: gray;
`;
const MdLockOutlineStyled = styled(MdLockOutline)`
  width: 24px;
  height: 2.518vh;
  color: gray;
`;
const SiGnuprivacyguardStyle = styled(SiGnuprivacyguard)`
  width: 24px;
  height: 100%;
  color: gray;
`;

const LoginPage = () => {
  // 키보드 입력
  const [inputEmail, setInputEmail] = useState("");
  // 유효성 검사
  const [isId, setIsId] = useState(false);
  const [isPwd, setIsPwd] = useState(false);
  // 패스워드 입력
  const [inputpwd, setInputPwd] = useState("");
  // 에러 메세지
  const [idMessage, setIdMessage] = useState("");
  // 모달 내용 변경
  const [modalContent, setModalContent] = useState("");
  // sole인지 확인
  const [isCouple, setIsCouple] = useState();
  //팝업 처리
  const [modalOpen, setModalOpen] = useState(false);
  // 모달 헤더
  const [modalHeader, setModalheader] = useState("");
  // 모달 이미지
  const [modalImg, setModalImg] = useState();
  // 모달 변경
  const [isModalImg, setIsModalImg] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };
  const navigate = useNavigate();
  // 5~ 20자리의 영문자, 숫자, 언더스코어(_)로 이루어진 문자열이 유효한 아이디 형식인지 검사하는 정규표현식
  const onChangeEmail = (e) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setInputEmail(e.target.value);
    if (!emailRegex.test(e.target.value)) {
      setIdMessage("이메일 형식이 올바르지 않습니다.");
      setIsId(false);
    } else {
      setIdMessage("올바른 형식 입니다.");
      setIsId(true);
    }
  };
  const onChangePwd = (e) => {
    setInputPwd(e.target.value);
    setIsPwd(true);
  };
  //이메일로 커플이름 찾는 비동기 함수
  const coupleNameSearchAxios = async (email) => {
    const resCoupleName = await LoginAxios.emailToCoupleNameSearch(email);
    console.log(resCoupleName.data);
    // `coupleName`을 `sessionStorage`에 저장합니다.
    sessionStorage.setItem("coupleName", resCoupleName.data);
  };
  const loginBtnHandler = () => {
    if (isId && isPwd) {
      sessionStorage.setItem("email", inputEmail);
      //커플이름 search후 세션에 저장.
      coupleNameSearchAxios(inputEmail);
      // 로그인, main-page를 커플이름으로 구별해서 이동.
      loginAxios(inputEmail, inputpwd);
    }
  };
  const loginAxios = async (email, pwd) => {
    try {
      const response = await LoginAxios.login(email, pwd);
      if (response.data.grantType === "bearer") {
        console.log("accessToken : ", response.data.accessToken);
        console.log("refreshToken : ", response.data.refreshToken);
        Common.setAccessToken(response.data.accessToken);
        Common.setRefreshToken(response.data.refreshToken);
        sessionStorage.setItem("email", email);

        navigate(`/main-page`);
      } else {
        setModalOpen(true);
        setIsModalImg(false);
        setModalheader("로그인 에러");
        setModalContent("암호화에 실패했습니다.");
      }
    } catch (error) {
      console.log(error);
      setModalOpen(true);
      setModalheader("로그인 에러");
      setIsModalImg(false);
      setModalContent("계정이 없습니다.");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && isId && isPwd) {
      loginBtnHandler();
    }
  };
  //카카오 간편 로그인 이벤트 함수
  const kakaoLoginOnClick = () => {
    // 직접 구현
    const kakaoAuthorizeAxios = async () => {
      const REST_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
      const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
      const KAKAO_PATH = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

      window.location.href = KAKAO_PATH;
    };
    kakaoAuthorizeAxios();
  };
  const codeModalOkBtnHandler = () => {
    closeModal();
  };
  //모달 함수
  const modalClickHandler = () => {
    setModalOpen(true);
    setIsModalImg(true);
    setModalImg(GoogleAndNaverNotLogin);
    setModalContent("서비스를 지원하지 않습니다. 카카오 서비스만 지원합니다.");
  };
  return (
    <Contain>
      {isModalImg ? (
        <Modal
          open={modalOpen}
          header={modalHeader}
          type={true}
          confirm={codeModalOkBtnHandler}
          img={modalImg}
        >
          {modalContent}
        </Modal>
      ) : (
        <LoginModal
          open={modalOpen}
          header={modalHeader}
          type={true}
          confirm={codeModalOkBtnHandler}
        >
          {modalContent}
        </LoginModal>
      )}
      <IconDiv>
        <Icon />
      </IconDiv>
      <LoginDiv>
        <>
          <InputContainer>
            <IconWrapper>
              <MdOutlineMailOutlineStyle />
            </IconWrapper>
            <InputDiv
              type="text"
              placeholder="Email ID"
              value={inputEmail}
              onChange={onChangeEmail}
            />
          </InputContainer>
          {inputEmail && <Message isCorrect={isId}>{idMessage}</Message>}
        </>
        <InputContainer>
          <IconWrapper>
            <MdLockOutlineStyled />
          </IconWrapper>
          <InputDiv
            type="password"
            placeholder="Password"
            value={inputpwd}
            onChange={onChangePwd}
            onKeyDown={handleKeyDown} //패스워드를 입력하고 엔터를 눌렀을 경우
          />
        </InputContainer>
      </LoginDiv>
      <FindDiv>
        <>
          <Link to="/signup-page" style={{ textDecoration: "none" }}>
            <SigninDiv>
              <SiGnuprivacyguardStyle />
              <Signin>&nbsp;Sign in</Signin>
            </SigninDiv>
          </Link>
        </>
        <>
          <Link to="/find-email" style={{ textDecoration: "none" }}>
            <ForgotId>Forgot ID</ForgotId>
          </Link>
          <Link to="/find-password" style={{ textDecoration: "none" }}>
            <ForgotPassword>Password?</ForgotPassword>
          </Link>
        </>
      </FindDiv>
      <SimpleLogin>
        <div>
          <CircleSide>
            <GoogleIcon onClick={() => modalClickHandler()} />
          </CircleSide>
          <CircleSide>
            <NaverIcon onClick={() => modalClickHandler()} />
          </CircleSide>
          <CircleSide>
            <KakaoIcon onClick={kakaoLoginOnClick} />
          </CircleSide>
        </div>
      </SimpleLogin>
      <ButtonDiv>
        <LoginButton isActive={isId && isPwd} onClick={loginBtnHandler}>
          Login
        </LoginButton>
      </ButtonDiv>
    </Contain>
  );
};

export default LoginPage;
