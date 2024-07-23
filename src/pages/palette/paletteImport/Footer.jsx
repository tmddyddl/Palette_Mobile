import { Link } from "react-router-dom";
import { styled } from "styled-components";
import one from "../../../img/loginImg/naver.png";
import two from "../../../img/loginImg/kakako.png";
import thr from "../../../img/commonImg/instagram.png";
import useKakao from "./KakaoChat";

const Footer = styled.div`
  width: 100%;
  height: 285px;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 40px 4.166vw;
  @media screen and (max-width: 1100px) {
    min-width: 840px;
  }
`;

const FooterLeft = styled.div`
  width: 100%;
  height: 256px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const TitleBox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  border-bottom: 1px solid darkgray;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TitleLeft = styled.div`
  width: 80%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 18px;
`;

const TitleRight = styled.div`
  width: 20%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 18px;
`;

const TextTitle = styled(Link)`
  width: 120px;
  height: 90%;
  display: flex;
  font-size: 16px;
  align-items: center;
  justify-content: flex-start;
  text-decoration: none;
  color: #000;
  &:hover {
    font-weight: bolder;
  }
`;

const Img = styled.div`
  width: 45px;
  height: 90%;
  background-image: url(${props => props.url});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  &:hover {
    transform: scale(0.9);
  }
`;

const IntroBox = styled.div`
  width: 100%;
  height: 146px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

const IntroText = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  font-size: 15px;
  align-items: center;
`;

const CopyrightBox = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const Copyright = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  font-size: 13px;
  align-items: center;
`;

const Foot = () => {
  useKakao("3e926147c6cccdc2e4dec8ce33bb6985"); // 여기에 본인의 카카오 앱 키를 입력하세요"3e926147c6cccdc2e4dec8ce33bb6985"

  const handleChat = () => {
    if (window.Kakao) {
      window.Kakao.Channel.chat({
        channelPublicId: "_raJpG", // 여기에 본인의 카카오톡 채널 ID를 입력하세요 "_raJpG"
      });
    }
  };

  return (
    <>
  <Footer>
    <FooterLeft>
      <TitleBox>
        <TitleLeft>
          <TextTitle to="">개인정보처리방침</TextTitle>
          <TextTitle to="">이용약관</TextTitle>
        </TitleLeft>
        <TitleRight>
          <Img url={one} />
          <Img url={two} as="button" onClick={handleChat} />
          <Img url={thr} />
        </TitleRight>
      </TitleBox>
      <IntroBox>
        <IntroText>
          Palette | 대표 : 곰돌이사육사 | 사업자등록번호 : 000-00-00000 |
          통신판매업 신고번호 : 제2024-서울강남-00000호 | 개인정보보호 책임자 :
          백승재
        </IntroText>
        <IntroText>
          주소 : 서울시 강남구 테헤란로14길 6 | 대표전화 : 02-000-0000
        </IntroText>
        <IntroText>
          고객센터 : @palette_service | 운영시간 : 평일 오전 9시 ~ 오후
          6시(주말/공휴일 휴무)
        </IntroText>
      </IntroBox>
      <CopyrightBox>
        <Copyright>Copyright 2024. Palette inc. all rights reserved.</Copyright>
      </CopyrightBox>
    </FooterLeft>
  </Footer>
  </>
)
};

export default Foot;
