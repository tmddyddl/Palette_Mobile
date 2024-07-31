import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import AlbumAxiosApi from "../../../axiosapi/AlbumAxiosApi";

const PopupOverlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: rgba(0, 0, 0, 0.08); /* 투명도를 낮춤 */
  &.openModal {
    display: flex;
    animation: modal-bg-show 0.1s;
  }
`;
const Popup = styled.div`
  position: fixed;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 95%;
  height: 200px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const TitleDiv = styled.div`
  width: 90%;
  height: 15%;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #c8c8c8;
  align-items: center;
  justify-content: flex-start;
`;

const TitleLeft = styled.div`
  width: 60%;
  height: 100%;
  padding-left: 1%;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const TitleRight = styled.div`
  width: 90%;
  height: 100%;
  padding-right: 1%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const TitleRightBtn = styled.div`
  width: 28%;
  height: 80%;
  background-color: #eccdaf;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
`;

const PopBoard = styled.div`
  width: 95%;
  height: 60%; /* 최대 높이 설정 */
  max-height: 60%;
  margin-top: 0.5rem;
  padding: 0.5rem;
  display: flex;
  flex-wrap: wrap; /* 요소들이 한 줄에 3개씩 배치되도록 함 */
  align-items: flex-start; /* 요소들이 위쪽에 정렬되도록 함 */
  border-radius: 0.5rem;
  background-color: white;
  overflow-y: auto; /* 세로 스크롤바 표시 */
`;

const BuyTema = styled.div`
  width: 33%; /* 요소들이 한 줄에 3개씩 배치되도록 함 */
  height: 90%;
  margin-bottom: 0.5rem; /* 요소들 사이의 간격 */
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TemaSky = styled.div`
  width: 90%;
  height: 100%;
  background-color: #d9f2fc;
  display: flex;
`;
const TemaBlack = styled.div`
  width: 90%;
  height: 100%;
  background-color: #dadada;
  display: flex;
`;
const TemaPink = styled.div`
  width: 90%;
  height: 100%;
  background-color: #f6dee2;
  display: flex;
`;
const TemaGreen = styled.div`
  width: 90%;
  height: 100%;
  background-color: #b9e7b7;
  display: flex;
`;
const TemaYellow = styled.div`
  width: 90%;
  height: 100%;
  background-color: #fffdb8;
  display: flex;
`;
const TemaPurple = styled.div`
  width: 90%;
  height: 100%;
  background-color: #e5c9f5;
  display: flex;
`;
const TemaInfo = styled.div`
  width: 100%;
  height: 100%;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const TemaOne = styled.div`
  width: 100%;
  height: 60%;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseDiv = styled.div`
  width: 90%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CloseButton = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  margin-top: 2px;
  border: none;
  border-radius: 0.6rem;
  background-color: darkgray;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`;

const BuyButton = styled.div`
  padding: 0.4rem 0.7rem;
  font-size: 0.7rem;
  margin-bottom: 4%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 0.5rem;
  background-color: darkgray;
  cursor: pointer;
  &:hover {
    background-color: #8e8e8e;
  }
`;

const TemaChange = ({ open, close, setBgColor }) => {
  const [purchasedThemes, setPurchasedThemes] = useState([]); // 구매한 테마 목록 상태

  const userEmail = sessionStorage.getItem("email");

  // 사용자가 구매한 테마를 가져오는 함수
  const fetchPurchasedThemes = useCallback(async () => {
    try {
      const response = await AlbumAxiosApi.getTemaLoad(userEmail);
      const temaList = response.data.flatMap((dto) => dto.orderName); // 구매한 테마 이름 추출
      setPurchasedThemes(temaList);
    } catch (error) {
      console.error("Error fetching purchased themes:", error);
    }
  }, [userEmail]);

  useEffect(() => {
    if (open) {
      fetchPurchasedThemes(); // 팝업이 열릴 때 구매한 테마 로드
    }
  }, [open, fetchPurchasedThemes]);

  const handleSetColor = (color) => () => {
    setBgColor(color);
    localStorage.setItem(`${userEmail}_themeColor`, color);
    close();
  };

  return (
    <PopupOverlay className={open ? "openModal" : ""}>
      {open && (
        <Popup>
          <TitleDiv>
            <TitleLeft>보유 테마 목록</TitleLeft>
            <TitleRight>
              <TitleRightBtn onClick={handleSetColor("#eccdaf")}>
                기본테마
              </TitleRightBtn>
            </TitleRight>
          </TitleDiv>
          <PopBoard>
            {/* 구매한 테마만 표시 */}
            {purchasedThemes.includes("Palette SkyBlue Tema 구매") && (
              <BuyTema>
                <TemaSky>
                  <TemaInfo>
                    <TemaOne>SkyBlue Tema</TemaOne>
                    <BuyButton onClick={handleSetColor("#d9f2fc")}>
                      변경 하기
                    </BuyButton>
                  </TemaInfo>
                </TemaSky>
              </BuyTema>
            )}
            {purchasedThemes.includes("Palette Black Tema 구매") && (
              <BuyTema>
                <TemaBlack>
                  <TemaInfo>
                    <TemaOne>Black Tema</TemaOne>
                    <BuyButton onClick={handleSetColor("#dadada")}>
                      변경 하기
                    </BuyButton>
                  </TemaInfo>
                </TemaBlack>
              </BuyTema>
            )}
            {purchasedThemes.includes("Palette Pink Tema 구매") && (
              <BuyTema>
                <TemaPink>
                  <TemaInfo>
                    <TemaOne>Pink Tema</TemaOne>
                    <BuyButton onClick={handleSetColor("#f6dee2")}>
                      변경 하기
                    </BuyButton>
                  </TemaInfo>
                </TemaPink>
              </BuyTema>
            )}
            {purchasedThemes.includes("Palette Green Tema 구매") && (
              <BuyTema>
                <TemaGreen>
                  <TemaInfo>
                    <TemaOne>Green Tema</TemaOne>
                    <BuyButton onClick={handleSetColor("#b9e7b7")}>
                      변경 하기
                    </BuyButton>
                  </TemaInfo>
                </TemaGreen>
              </BuyTema>
            )}
            {purchasedThemes.includes("Palette Yellow Tema 구매") && (
              <BuyTema>
                <TemaYellow>
                  <TemaInfo>
                    <TemaOne>Yellow Tema</TemaOne>
                    <BuyButton onClick={handleSetColor("#fffdb8")}>
                      변경 하기
                    </BuyButton>
                  </TemaInfo>
                </TemaYellow>
              </BuyTema>
            )}
            {purchasedThemes.includes("Palette Purple Tema 구매") && (
              <BuyTema>
                <TemaPurple>
                  <TemaInfo>
                    <TemaOne>Purple Tema</TemaOne>
                    <BuyButton onClick={handleSetColor("#e5c9f5")}>
                      변경 하기
                    </BuyButton>
                  </TemaInfo>
                </TemaPurple>
              </BuyTema>
            )}
          </PopBoard>
          <CloseDiv>
            <CloseButton onClick={close}>닫기</CloseButton>
          </CloseDiv>
        </Popup>
      )}
    </PopupOverlay>
  );
};

export default TemaChange;
