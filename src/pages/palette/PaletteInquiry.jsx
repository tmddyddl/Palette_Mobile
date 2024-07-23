import { styled } from "styled-components";
import Globalstyle from "../../PaletteStyle";
import Header from "./paletteImport/Header";
import Category from "./paletteImport/Category";
import Footer from "./paletteImport/Footer";
import { Link } from "react-router-dom";
import emailjs from '@emailjs/browser';
import { useRef, useState } from "react";
import Modal from "../datediary/Modal";
import modalImg from "../../img/commonImg/전구 아이콘.gif";
import ScrollToTop from "./paletteImport/ScrollToTop";

const Background = styled.div`
  width: 100%;
  height: 200vh;
  display: flex;
  flex-direction: column;
  @media (max-width: 1100px) {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
const Container = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff9f2;
  position: sticky;
  @media screen and (max-width: 1100px) {
    min-width: 840px;
  }
`;

const BoardWrapper = styled.div`
  width: 1380px;
  height: 90%;
  display: flex;
  @media screen and (max-width: 1100px) {
    flex-direction: column;
    margin-left: 10%;
    min-width: 755px;
  }
  @media screen and (max-width: 768px) {
    margin-left: 5%;
  }
`;

const Board = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff9f0;
  @media screen and (max-width: 1100px) {
    min-width: 755px;
  }
`;

const HelpRoot = styled.div`
  width: 90%;
  height: 5%;
  display: flex;
  font-size: 14px; 
`;

const Root = styled(Link)`
  width: 7%;
  height: 100%;
  display: flex;
  text-decoration: none;
  color: #000;
  &:hover {
    font-weight: bolder;
  }
`;
const Root2 = styled(Root)`
  width: 2%;
`;
const Root3 = styled(Root)`
  width: 8%;
`;
const Root4 = styled(Root)`
  width: 11%;
`;

const HelpBoard = styled.form`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const InquiryTitle = styled.div`
  width: 90%;
  height: 7%;
  border-bottom: 2px solid gray;
  font-size: 25px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const InfoBox = styled.div`
  width: 90%;
  height: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 2px solid gray;
`;

const InfoTitle = styled.div`
  width: 90%;
  height: 6vh;
  font-size: 18px;
  display: flex;
  align-items: center;
`;
const InfoInput = styled.input`
  width: 30%;
  height: 15%;
  padding: 10px;
  font-size: 16px;
  display: flex;
  align-items: center;
`;
const CheckBox = styled.div`
  width: 100%;
  height: 5vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
`;
const ContentBox = styled.div`
  width: 90%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 2px solid gray;
`;

const AgreeBox = styled.div`
  width: 90%;
  height: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 2px solid gray;
`;

const AgreeTitle = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const AgreeCheck = styled(Link)`
  width: 10%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  &:hover {
    font-weight: bolder;
  }
`;

const ContentInput = styled.textarea`
  width: 90%;
  height: 70%;
  padding: 20px;
  font-size: 16px;
  display: flex;
  justify-content: flex-start;
`;

const FinishBox = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FinishBtn = styled.button`
  width: 13%;
  height: 20%;
  font-size: 0.9rem;
  border-radius: 0.5rem;
  background-color: #fff9f0;
  cursor: pointer;
  &:hover {
    background-color: #dadada;
  }
`;

const CustomCheckbox = styled.input`
  appearance: none;
  width: 14px;
  height: 14px;
  border: 1px solid gray;
  margin-right: 1%;
  cursor: pointer;
  &:checked {
    background-color: black;
  }
  &:focus {
    outline: none;
  }
  &:hover {
    border: 2px solid black;
  }
`;

const InquiryPage = () => {
  const [modalContent, setModalContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [numberCheck, setNumberCheck] = useState(false);
  const [userCheck, setUserCheck] = useState(false);
  const form = useRef();
    
  const codeModalOkBtnHandler = () => {
    closeNextModal();
  };
  const closeNextModal = () => {
    setModalOpen(false);
    window.location.reload()
  };
  const closeModal = () => {
    setModalOpen(false);
    window.location.reload()
  };

  const handleNumberCheckChange = (e) => {
    setNumberCheck(e.target.checked);
  };

  const handleUserCheckChange = (e) => {
    setUserCheck(e.target.checked);
  };


  const sendEmail = e => {
    e.preventDefault();
    const formData = new FormData(form.current);
    formData.append("number_check", numberCheck);
    formData.append("user_check", userCheck);

    emailjs.sendForm("service_clr6n2r", "template_6xr5ezh", form.current, "9YS83vnE1IHakDSR9").then(
      (result) => {
        setModalOpen(true);
        setModalContent("성공적으로 이메일이 전송되었습니다.");
        form.current.reset();
      },
      (error) => {
        console.log(error.text);
        setModalOpen(true);
        setModalContent("이메일 전송에 실패 하였습니다. ");
      },
    );
  };


  return (
    <>
      <Globalstyle />
      <Header />
      <Background>
        <Container>
          <BoardWrapper>
            <Category />
            <Board>
              <HelpRoot>
                <Root to="/">Palette</Root>
                <Root2>{">"}</Root2>
                <Root3 to="/customer">고객센터</Root3>
                <Root2>{">"}</Root2>
                <Root4 to="/customer/inquiry">1:1 문의하기</Root4>
              </HelpRoot>
              <HelpBoard ref={form} onSubmit={sendEmail} >
                <InquiryTitle>❯❯ 1:1 문의하기</InquiryTitle>
                <InfoBox>
                  <InfoTitle>연락처</InfoTitle>
                  <InfoInput type="text" name="user_number" placeholder="ex) 010-1234-5678" required />
                  <CheckBox>
                    <CustomCheckbox type="checkbox" name="number_check" checked={numberCheck} onChange={handleNumberCheckChange} />
                    답변 등록 시 카카오톡 또는 문자 알림 수신 (미동의 할 경우 이메일만 답변)
                  </CheckBox>
                  <InfoTitle>이메일</InfoTitle>
                  <InfoInput type="email" 
                  name="user_email" 
                  placeholder="ex)abcd@mail.com"
                  maxLength={20}
                  required />
                </InfoBox>
                <ContentBox>
                  <InfoTitle>문의 내용</InfoTitle>
                  <ContentInput name="message" placeholder="문의 사항을 입력해주세요." required />
                </ContentBox>
                <AgreeBox>
                  <InfoTitle>약관 동의</InfoTitle>
                  <CheckBox>
                    <CustomCheckbox type="checkbox" name="user_check" checked={userCheck} onChange={handleUserCheckChange} />
                    <AgreeTitle>비회원 개인정보 수집 이용 동의</AgreeTitle>
                    <AgreeCheck>자세히</AgreeCheck>
                  </CheckBox>
                </AgreeBox>
                <FinishBox>
                  <FinishBtn type="submit">문의 등록</FinishBtn>
                </FinishBox>
              </HelpBoard>
            </Board>
          </BoardWrapper>
          <Modal
            open={modalOpen}
            header="안내"
            type={true}
            close={closeModal}
            img={modalImg}
            confirm={codeModalOkBtnHandler}
            >
            {modalContent}
          </Modal>
        </Container>
        <Footer />
        <ScrollToTop/>
      </Background>
    </>
  );
};

export default InquiryPage;
