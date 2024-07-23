import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Globalstyle from "../../PaletteStyle";
import Header from "./paletteImport/Header";
import Category from "./paletteImport/Category";
import Footer from "./paletteImport/Footer";
import logosearch from "../../img/loginImg/findglass.png";
import { Link } from "react-router-dom";
import QnAItem from "./paletteImport/QnAItem";
import ScrollToTop from "./paletteImport/ScrollToTop";

const Background = styled.div`
  width: 100%;
  height: 200vh;
  display: flex;
  flex-direction: column;
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
  width: 12%;
`;

const SearchBox = styled.div`
  width: 90%;
  height: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SearchInput = styled.input.attrs({ type: "text" })`
  display: flex;
  width: 38%;
  height: 50%;
  padding: 2%;
  border: 3px solid gray;
  font-size: 16px;
  border-radius: 5px;
`;

const Searchlogo = styled.img`
  width: 2%;
  height: 16%;
  cursor: pointer;
  position: absolute;
  margin-left: 32%;
`;

const HelpBoard = styled.div`
  width: 90%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 1100px) {
    width: 100%;
  }
`;

const HelpTitle = styled.div`
  width: 90%;
  height: 8%;
  font-size: 1.2vw;
  border-bottom: 2px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1100px) {
    width: 100%;
  }
`;

const questions = [
  {
    q: "Q. 아이디를 모르겠어요.",
    a:
      "A. Palette 아이디는 가입 시 입력한 이메일 주소 입니다.\n" +
      "위 방법으로 아이디를 찾을 수 없는 경우 자세한 내용을 담아 고객센터로 문의해 주시면 재안내 드리도록 하겠습니다.",
  },
  {
    q: "Q. 비밀번호를 모르겠어요.",
    a:
      "A. 비트윈 아이디가 메일을 받을 수 있는 주소라면, 비밀번호 찾기 후 직접 비밀번호를 재설정 해주세요." +
      "만약 메일을 받을 수 없는 주소라면 고객센터로 문의 바랍니다.",
  },
  {
    q: "Q. 앨범에 사진을 올리고 싶어요.",
    a:
      "A. [사진 올리는 법]\n" +
      "\n1. + 버튼을 눌러 사진을 업로드 해주세요.\n" +
      "2. 삭제하고 싶은 사진은 다시 한번 클릭 해주세요.",
  },
  {
    q: "Q. Palette 개발자는 누구인가요 ?",
    a: "A. 개발진 명단은 총 5명입니다.\n\n이경섭\n박성진\n유승용\n백승재\n김도영\n\nKH정보교육원 곰돌이사육사의 2조 입니다!",
  },
  {
    q: "Q. 팔레트란 무엇인가요 ?",
    a:
      "A. Palette는 커플 커뮤니티 서비스 입니다.\n" +
      "연인과 함께 책 컨셉의 추억을 꾸미고 다른 연인들과도 소통할 수 있는 페이지 입니다.",
  },
];

const HelpPage = () => {
  const [openIndexes, setOpenIndexes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState(questions);

  const toggleQnA = (index) => {
    setOpenIndexes((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((i) => i !== index)
        : [...prevIndexes, index]
    );
  };

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredQuestions(questions);
    } else {
      const searchResults = questions.filter(
        (question) =>
          question.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          question.a.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredQuestions(searchResults);
    }
  }, [searchTerm]);

  const handleSearch = () => {
    if (searchTerm === "") {
      setFilteredQuestions(questions);
    } else {
      const searchResults = questions.filter(
        (question) =>
          question.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          question.a.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredQuestions(searchResults);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <Globalstyle />
      <Header />
      <ScrollToTop/>
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
                <Root4 to="/customer/help">자주 묻는 질문</Root4>
              </HelpRoot>
              <SearchBox>
                <SearchInput
                  placeholder="무엇을 도와드릴까요 ?"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Searchlogo src={logosearch} onClick={handleSearch} />
              </SearchBox>
              <HelpBoard>
                <HelpTitle>자주 묻는 질문</HelpTitle>
                {filteredQuestions.map((item, index) => (
                  <QnAItem
                    key={index}
                    q={item.q}
                    a={item.a}
                    isOpen={openIndexes.includes(index)}
                    onToggle={() => toggleQnA(index)}
                  />
                ))}
              </HelpBoard>
            </Board>
          </BoardWrapper>
        </Container>
        <Footer />
      </Background>
    </>
  );
};

export { questions };
export default HelpPage;
