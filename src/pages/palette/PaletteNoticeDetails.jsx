import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Globalstyle from '../../PaletteStyle';
import Header from './paletteImport/Header';
import Footer from './paletteImport/Footer';
import Category from "./paletteImport/Category";
import { exText } from './PaletteNotice'; // 예시 데이터 사용
import ScrollToTop from './paletteImport/ScrollToTop';

const Background = styled.div`
  width: 100%;
  height: 200vh;
  display: flex;
  flex-direction: column;
  font-size: 1.8rem;
`;

const Container = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff9f2;
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
  width: 9%;
`;
const Root4 = styled(Root)`
  width: 10%;
`;


const HelpBoard = styled.div`
  width: 90%;
  height: 45%;
  display: flex;
  align-items: center;
  border-top: 1px solid darkgray;
  border-bottom: 1px solid darkgray;
`;

const HelpBoardText = styled.div`
  width: 96%;
  height: 90%;
  font-size: 22px;
  padding: 3%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const TitleBox = styled.div`
  width: 90%;
  height: 6%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top: 2px solid darkgray;
`;

const TitleLeft = styled.div`
  width: 64%;
  height: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 24px;
  @media screen and (max-width: 1100px) {
    font-size: 19px;
  }
`;

const TitleRight = styled.div`
  width: 32%;
  height: 90%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 20px;
  @media screen and (max-width: 1100px) {
    font-size: 17px;
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

const BtnBox = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackBtn = styled.button`
  width: 100px;
  height: 20%;
  font-size: 16px;
  border-radius: 0.5rem;
  background-color: #fff9f0;
  cursor: pointer;
  &:hover {
    background-color: #dadada;
  }
`

const NoticeDetailPage = () => {
  const { id } = useParams();
  const notice = exText.find((item) => item.classNo.toString() === id);
  const navigate = useNavigate(); 

  const backBtnClick = () => {
    navigate(`/customer/notice`);
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
                <Root4 to="/customer/notice">공지사항</Root4>
              </HelpRoot>
              <TitleBox>
                <TitleLeft>
                제목 : {notice.title}
                </TitleLeft>
                <TitleRight>
                작성일: {notice.join}
                </TitleRight>
              </TitleBox>
              <HelpBoard>
                    <HelpBoardText>
                    {notice ? (
                        <div>
                        <p>{notice.title}</p>
                        </div>
                    ) : (
                        <p>공지사항을 찾을 수 없습니다.</p>
                    )}
                    </HelpBoardText>
              </HelpBoard>
              <BtnBox>
                <BackBtn onClick={() => backBtnClick()}>뒤로가기</BackBtn>
              </BtnBox>
            </Board>
          </BoardWrapper>
        </Container>
        <Footer />
        <ScrollToTop/>
      </Background>
    </>
  );
};

export default NoticeDetailPage;
