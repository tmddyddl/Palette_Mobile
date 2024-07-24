import styled from "styled-components";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginAxios from "../../axiosapi/LoginAxios";
import Modal from "../datediary/Modal";
import findIdImg from "../../img/loginImg/아이디찾기.gif";
const Contain = styled.div`
  width: 100%;
  height: 100%;
`;
const IconDiv = styled.div`
  width: 100%;
  height: 20%;
  margin-top:40% ;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputDiv = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
const ButtonDiv = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FindButton = styled.div`
  width: 27%;
  height: 32px;
  background-color: rgba(46, 46, 46, 0.4);
  border-radius: 16px;
  box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
  font-size: 20px;
  color: #b44a4a;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }

`;
const InputDetailDiv = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  gap: 2px;

  & > label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 29%;
    height: auto;
    font-size: 14px;
    color: #b44a4a;
    text-align: center;
    font-weight: bolder;

  }

  & > .InputClass {
    width: 53%;
    height: auto;
    border-radius: 0.521vw;
    border: none;
    background-color: rgba(0, 0, 0, 0.3);
    outline: none;
    box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
    padding-left: 0.521vw;
    font-size: 14px;
    font-weight: 600;
    
  }
`;

const RegisterationInput1 = styled.input`
  width: 22%;
  height: auto;
  border-radius: 0.521vw;
  border: none;
  background-color: rgba(0, 0, 0, 0.3);
  outline: none;
  box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
  padding-left: 0.521vw;
  font-size: 14px;
  font-weight: 600;

`;
const Text = styled.div`
  width: 3%;
  height: auto;
  font-weight: bolder;
  font-size: 15px;
  color: #b44a4a;
  display: flex;
  justify-content: center;
  align-items: center;

`;
const RegisterationInput2 = styled.input`
  width: 7%;
  height: auto;
  border-radius: 0.521vw;
  border: none;
  background-color: rgba(0, 0, 0, 0.3);
  outline: none;
  box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
  padding-left: 0.208vw;
  font-size: 14px;
  font-weight: 600;

`;
const FaMagnifyingGlassStyle = styled(FaMagnifyingGlass)`
  width: calc(110px - 1vw);
  height: calc(110px - 1vh);
  color: rgba(0, 0, 0, 0.7);


`;
const Message = styled.div`
  width: 100%;
  font-size: 12px;
  display: flex;
  justify-content: center;
  color: ${({ isCorrect }) => (isCorrect ? "green" : "red")};

`;
const FindEmail = () => {
  //주민등록번호 표현 상태 변수
  const [rrnFirstPart, setRrnFirstPart] = useState("");
  const [rrnSecondPart, setRrnSecondPart] = useState("");
  // 유효한 주민등록번호인지 확인
  const [isRrnValid, setIsRrnValid] = useState(false);
  //주민등록번호 메세지
  const [isRrnValidMessage, setIsRrnValidMessage] = useState("");
  // 이름값 저장
  const [Name, setName] = useState("");

  // 찾은 결과 ID값 저장
  const [email, setEmail] = useState("");
  // 모달 해더
  const [headerContents, SetHeaderContents] = useState("");
  // 모달 내용
  const [modalContent, setModalContent] = useState("");
  //팝업 처리
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  //코드 모달 확인
  const codeModalOkBtnHandler = () => {
    closeModal();
    if (email !== "") {
      navigate("/login-page");
    }
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const findIdOnclickHandler = () => {
    findIdAxios();
  };
  // 아이디찾기 버튼 이벤트 및 결과 출력
  const findIdAxios = async () => {
    const combinedRnn = combineRRN(rrnFirstPart, rrnSecondPart);
    try {
      const showUserId = await LoginAxios.findIdResult(Name, combinedRnn);
      SetHeaderContents("아이디 확인");
      setModalOpen(true);
      if (showUserId.data === "") {
        setModalContent("잘못된 요청입니다. 입력 값을 확인해주세요.");
      } else {
        setModalContent(`아이디: ${showUserId.data} 입니다.`);
        setEmail(showUserId.data);
      }
      // console.log(showEmail);
    } catch (error) {
      if (error.response) {
        // 서버가 응답했지만 상태 코드가 2xx 범위를 벗어나는 경우
        switch (error.response.status) {
          case 400:
            setModalContent("잘못된 요청입니다. 입력 값을 확인해주세요.");
            break;
          case 401:
            setModalContent("잘못된 요청입니다. 입력 값을 확인해주세요.");
            console.log();
            break;
          case 403:
            setModalContent("접근 권한이 없습니다.");
            break;
          case 404:
            setModalContent("서버를 찾을 수 없습니다.");
            break;
          case 500:
            setModalContent(
              "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
            );
            break;
          default:
            setModalContent(
              `오류가 발생했습니다: ${error.response.statusText}`
            );
        }
      } else if (error.request) {
        // 요청이 서버에 도달하지 못한 경우 (네트워크 오류 등)
        setModalContent("서버가 응답하지 않습니다.");
      } else {
        // 요청을 설정하는 중에 오류가 발생한 경우
        setModalContent(`오류가 발생했습니다: ${error.message}`);
      }
    }
  };

  // 5~ 20자리의 영문자, 숫자, 언더스코어(_)로 이루어진 문자열이 유효한 아이디 형식인지 검사하는 정규표현식
  //주민등록번호 앞 6자리 숫자 유효성검사
  const handleRrnFirstPartChange = (e) => {
    const inputValue = e.target.value;

    if (/^[0-9]*$/.test(inputValue) && inputValue.length <= 6) {
      setRrnFirstPart(inputValue);
    }

    // 유효성 검사 로직 추가
    if (inputValue.length === 6 && rrnSecondPart.length === 1) {
      setIsRrnValid(true);
      setIsRrnValidMessage("유효합니다.");
    } else {
      setIsRrnValid(false);
      setIsRrnValidMessage("값이 유효하지 않습니다.");
    }

    if (inputValue === "" && rrnSecondPart === "") {
      setIsRrnValidMessage("");
    }
  };
  //주민등록번호 뒤 1자리 숫자 유효성검사
  const handleRrnSecondPartChange = (e) => {
    const inputValue = e.target.value;

    if (/^[1-4]{0,1}$/.test(inputValue) && inputValue.length <= 1) {
      setRrnSecondPart(inputValue);
    }

    // 유효성 검사 로직 추가
    if (rrnFirstPart.length === 6 && inputValue.length === 1) {
      setIsRrnValid(true);
      setIsRrnValidMessage("유효합니다.");
    } else {
      setIsRrnValid(false);
      setIsRrnValidMessage("값이 유효하지 않습니다.");
    }

    if (inputValue === "" && rrnFirstPart === "") {
      setIsRrnValidMessage("");
    }
  };
  //주민등록번호 따로 받은 자리 합치는 함수
  const combineRRN = (firstPart, secondPart) => {
    // 문자열을 숫자로 변환
    const firstNum = parseInt(firstPart, 10);
    const secondNum = parseInt(secondPart, 10);

    // 계산 수행
    return firstNum * 10 + secondNum;
  };
  // 이름 입력 함수
  const nameInputOnChange = (e) => {
    const name = e.target.value;
    setName(name);
  };

  return (
    <Contain>
      <Modal
        open={modalOpen}
        header={headerContents}
        type={true}
        confirm={codeModalOkBtnHandler}
        img={findIdImg}
      >
        {modalContent}
      </Modal>
      <IconDiv>
        <FaMagnifyingGlassStyle />
      </IconDiv>
      <InputDiv>
        <InputDetailDiv>
          <label>이름</label>
          <input className="InputClass" onChange={nameInputOnChange} />
        </InputDetailDiv>
        <>
          <InputDetailDiv>
            <label>주민등록번호</label>
            <RegisterationInput1
              value={rrnFirstPart}
              onChange={handleRrnFirstPartChange}
            />
            <Text> - </Text>
            <RegisterationInput2
              value={rrnSecondPart}
              onChange={handleRrnSecondPartChange}
            />
            <Text>*</Text>
            <Text>*</Text>
            <Text>*</Text>
            <Text>*</Text>
            <Text>*</Text>
            <Text>*</Text>
          </InputDetailDiv>
          <Message isCorrect={isRrnValid}>{isRrnValidMessage}</Message>
        </>
      </InputDiv>
      <ButtonDiv>
        <FindButton onClick={findIdOnclickHandler}>찾기</FindButton>
      </ButtonDiv>
    </Contain>
  );
};

export default FindEmail;
