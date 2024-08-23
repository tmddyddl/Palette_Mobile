import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import emailjs from "emailjs-com";
import Modal from "../../common/utils/Modal";
import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";
const Contain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TitleDiv = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 900;
  color: #b44a4a;
`;
const InputDiv = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
const InputDetailDiv = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  & > label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 23%;
    height: auto;
    font-size: 14px;
    color: #b44a4a;
    text-align: center;
    font-weight: bolder;
  }
  & > .InputCode,
  & > .InputEmail {
    width: 55%;
    height: 100%;
    border-radius: 0.521vw;
    border: none;
    background-color: rgba(0, 0, 0, 0.3);
    outline: none;
    box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
    padding-left: 5px;
    font-size: 14px;
    font-weight: 600;
  }
`;
const Empty = styled.div`
  width: 2%;
`;
const EmailAthouized = styled.div`
  width: 15%;
  border-radius: 10px;
  border: none;
  background-color: ${({ isActive }) =>
    isActive ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.2)"};
  outline: none;
  box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
  padding-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: ${({ isActive }) => (isActive ? "#b44a4a" : "#fe7a7a")};
  font-weight: 700;
  cursor: ${({ isActive }) => (isActive ? "pointer" : "not-allowed")};
  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.2)"};
  }
`;

const ButtonDiv = styled.div`
  width: 100%;
  height: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
  & > a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const WithdrawButton = styled.div`
  width: 35%;
  aspect-ratio: 3/1;
  background-color: ${({ isActive }) =>
    isActive ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.2)"};
  border-radius: 1.042vw;
  font-weight: 600;
  font-size: 15px;
  color: ${({ isActive }) => (isActive ? "#ccc" : "#b44a4a")};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: border;
  cursor: ${({ isActive }) => (isActive ? "pointer" : "not-allowed")};
  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.2)"};
  }
`;

const Message = styled.div`
  width: 100%;
  font-size: 10px;
  display: flex;
  justify-content: center;
  color: ${({ isCorrect }) => (isCorrect ? "green" : "red")};
`;
const Contexts = styled.div`
  width: 100%;
  height: 50%;
  font-size: 10vw;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const Withdrawal = () => {
  const navigate = useNavigate();
  // 키보드 입력
  const [inputEmail, setInputEmail] = useState("");
  // 유효성 확인
  const [isId, setIsId] = useState("");
  const [isCode, setIsCode] = useState(false);
  //이메일 보낸 후 상태 저장.
  const [isEmailSent, setIsEmailSent] = useState(false);
  // 비교할 인증코드
  const [certificationCode, setCertificationCode] = useState("");
  //인증코드 저장
  const [inputCertificationCode, setInputCertificationCode] = useState(null);
  //인증 확인 상태
  const [isEmail, setIsEmail] = useState(false);
  // 에러 메세지
  const [idMessage, setIdMessage] = useState("");

  // 모달 내용 변경
  const [modalContent, setModalContent] = useState("");
  // 모달 해더
  const [headerContents, SetHeaderContents] = useState("");
  //팝업 처리
  const [modalOpen, setModalOpen] = useState(false);
  const emailplaceholder = sessionStorage.getItem("email");
  const closeModal = () => {
    setModalOpen(false);
  };
  // 5~ 20자리의 영문자, 숫자, 언더스코어(_)로 이루어진 문자열이 유효한 아이디 형식인지 검사하는 정규표현식
  const onChangeEmail = (e) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setInputEmail(e.target.value);
    if (!emailRegex.test(e.target.value)) {
      setIdMessage("이메일 형식이 올바르지 않습니다.");
      setIsId(false);
    } else {
      if (e.target.value === emailplaceholder) {
        setIdMessage("올바른 형식입니다.");
        setIsId(true);
      } else {
        setIdMessage("계정이 일치하지 않습니다.");
        setIsId(false);
      }
    }
  };

  // 이메일 전송시 파라미터 넘기는 함수
  const sendVerificationEmail = async (toEmail) => {
    const generatedCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    setCertificationCode(generatedCode);
    // 이메일 보내기
    // 여기서 정의해야 하는 것은 위에서 만든 메일 템플릿에 지정한 변수({{ }})에 대한 값을 담아줘야 한다.
    const templateParams = {
      toEmail: toEmail, // 수신 이메일
      toName: "고객님",
      certificationCode: generatedCode,
    };
    try {
      const response = await emailjs.send(
        "service_7cipsqb", // 서비스 ID
        "service_7cipsqb", // 템플릿 ID
        templateParams,
        "VKzT47hXDU3sC3R13" // public-key
      );
      console.log("이메일이 성공적으로 보내졌습니다:", response);
      setIdMessage("이메일이 성공적으로 보내졌습니다!");
      setIsId(true);
      setIsEmailSent(true);
      // 이메일 전송 성공 처리 로직 추가
    } catch (error) {
      console.error("이메일 보내기 실패:", error);
      setIdMessage("이메일 보내기 실패했습니다!");
      setIsId(false);
      setIsEmailSent(false);
      // 이메일 전송 실패 처리 로직 추가
    }
  };
  // 이메일 인증 버튼 handler
  const emailCertificationBtnHandler = () => {
    if (isId) {
      sendVerificationEmail(inputEmail);
    }
  };
  // 코드 확인 버튼 이벤트
  const emailCertificationCodeOnClick = () => {
    if (inputCertificationCode === certificationCode) {
      SetHeaderContents("인증코드확인");
      setModalOpen(true);
      setModalContent("확인되었습니다.");
      setIsCode(true);
    } else {
      SetHeaderContents("인증코드확인");
      setModalOpen(true);
      setModalContent("인증코드가 다릅니다.");
      setIsCode(false);
    }
  };
  //코드 모달 확인
  const codeModalOkBtnHandler = () => {
    closeModal();
    setIsEmail(true);
  };
  // 인증 코드 입력 처리 함수 수정
  const handleCertificationCodeInput = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 6) {
      setInputCertificationCode(value);
    }
  };
  //회원 탈퇴하는 로직 함수
  const signuOutBtnOnclickHandler = () => {
    const memberDeleteAxios = async () => {
      const rsp = await MemberAxiosApi.memberDelete(inputEmail);
      console.log(rsp.data);
    };
    memberDeleteAxios();
    if (isEmail && isCode) {
      sessionStorage.setItem("email", "");
      navigate("/");
    }
  };

  return (
    <Contain>
      <TitleDiv>회원탈퇴</TitleDiv>
      <Modal
        open={modalOpen}
        header={headerContents}
        type={true}
        confirm={codeModalOkBtnHandler}
      >
        {modalContent}
      </Modal>
      <InputDiv>
        <InputDetailDiv>
          <label>이메일</label>
          <input
            className="InputEmail"
            value={inputEmail}
            onChange={onChangeEmail}
            placeholder={emailplaceholder}
          />
          <Empty></Empty>
          <EmailAthouized
            isActive={isId}
            onClick={emailCertificationBtnHandler}
          >
            인증
          </EmailAthouized>
        </InputDetailDiv>
        {inputEmail && <Message isCorrect={isId}>{idMessage}</Message>}

        {isEmailSent && (
          <InputDetailDiv>
            <label>인증코드</label>
            <input
              className="InputCode"
              // value={certificationCode}
              onChange={handleCertificationCodeInput}
            />
            <Empty></Empty>
            <EmailAthouized
              isActive={isEmailSent}
              onClick={emailCertificationCodeOnClick}
            >
              확인
            </EmailAthouized>
          </InputDetailDiv>
        )}
        <Contexts>
          정말 탈퇴하실 건가요?
          <br /> ㅠ.ㅠ
        </Contexts>
      </InputDiv>
      <ButtonDiv>
        <WithdrawButton
          isActive={isEmail && isCode}
          onClick={signuOutBtnOnclickHandler}
        >
          탈퇴하기
        </WithdrawButton>
      </ButtonDiv>
    </Contain>
  );
};

export default Withdrawal;
