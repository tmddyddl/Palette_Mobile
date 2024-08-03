import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import PaymentTema from "./PaymentTema";
import AlbumAxiosApi from "../../../axiosapi/AlbumAxiosApi";

const PopupOverlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: rgba(0, 0, 0, 0.1); /* 투명도를 낮춤 */
  backdrop-filter: blur(2px); /* 블러 효과 추가 */
  &.openModal {
    display: flex;
    animation: modal-bg-show 0.3s;
  }
`;
const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 95%;
  height: 300px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PopTitle = styled.div`
  width: 90%;
  height: 15%;
  padding-left: 1%;
  font-size: 1.1rem;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #c8c8c8;
  align-items: center;
  justify-content: flex-start;
`;

const PopBoard = styled.div`
  width: 95%;
  height: 55%; /* 최대 높이 설정 */
  max-height: 55%;
  margin-top: 0.5rem;
  padding: 0.5rem;
  display: flex;
  flex-wrap: wrap; /* 요소들이 한 줄에 3개씩 배치되도록 함 */
  align-items: flex-start; /* 요소들이 위쪽에 정렬되도록 함 */
  justify-content: space-between; /* 요소들 사이의 간격을 균등하게 분배 */
  border-radius: 0.5rem;
  background-color: white;
  overflow-y: auto; /* 세로 스크롤바 표시 */
`;

const BuyTema = styled.div`
  width: 50%;
  height: 90%;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const TemaInfo = styled.div`
  width: 100%;
  height: 100%;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const TemaOne = styled.div`
  width: 100%;
  height: 30%;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TemaTwo = styled.div`
  width: 100%;
  height: 20%;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TemaThr = styled.div`
  width: 100%;
  height: 30%;
  font-size: 0.8rem;
  display: flex;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
`;
const Strikethrough = styled.div`
  text-decoration: line-through;
`;

const CloseDiv = styled.div`
  width: 90%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1%;
`;
const CloseButton = styled.div`
  width: 15%;
  height: 90%;
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

const TemaPop = (props) => {
  const { open, close } = props;
  const [purchasedOrders, setPurchasedOrders] = useState([]);
  const userEmail = sessionStorage.getItem("email");

  const fetchPurchasedOrders = useCallback(async () => {
    try {
      const response = await AlbumAxiosApi.getTemaLoad(userEmail);
      const temaList = response.data.flatMap((dto) => dto.orderName);
      setPurchasedOrders(temaList);
    } catch (error) {
      console.error("테마 구매 중 에러 발생", error);
    }
  }, [userEmail]);

  useEffect(() => {
    if (open) {
      fetchPurchasedOrders();
    }
  }, [open, fetchPurchasedOrders]);

  const handlePaymentSuccess = () => {
    console.log("테마 구매 성공");
    fetchPurchasedOrders(); // 결제 성공 후 리스트 새로고침
  };

  const checkPurchased = (order) => {
    return purchasedOrders && purchasedOrders.includes(order);
  };
  return (
    <PopupOverlay className={open ? "openModal" : ""}>
      {open && (
        <Popup>
          <PopTitle>테마 구매</PopTitle>
          <PopBoard>
            {[
              {
                name: "SkyBlue",
                color: "#d9f2fc",
                price: 1100,
                order: "Palette SkyBlue Tema 구매",
              },
              {
                name: "Black",
                color: "#dadada",
                price: 1200,
                order: "Palette Black Tema 구매",
              },
              {
                name: "Pink",
                color: "#f6dee2",
                price: 1300,
                order: "Palette Pink Tema 구매",
              },
              {
                name: "Green",
                color: "#b9e7b7",
                price: 1400,
                order: "Palette Green Tema 구매",
              },
              {
                name: "Yellow",
                color: "#fffdb8",
                price: 1500,
                order: "Palette Yellow Tema 구매",
              },
              {
                name: "Purple",
                color: "#e5c9f5",
                price: 1600,
                order: "Palette Purple Tema 구매",
              },
            ].map((tema) => (
              <BuyTema key={tema.order}>
                <div
                  style={{
                    width: "90%",
                    height: "100%",
                    backgroundColor: tema.color,
                    display: "flex",
                  }}
                >
                  <TemaInfo>
                    <TemaOne>{tema.name} Tema</TemaOne>
                    {checkPurchased(tema.order) ? (
                      <TemaTwo>구매 완료</TemaTwo>
                    ) : (
                      <>
                        <TemaTwo>파격세일!!</TemaTwo>
                        <TemaThr>
                          <Strikethrough>{tema.price * 10}원</Strikethrough>{" "}
                          {">"} {tema.price}원
                        </TemaThr>
                        <PaymentTema
                          onPaymentSuccess={handlePaymentSuccess}
                          amount={tema.price}
                          order={tema.order}
                        />
                      </>
                    )}
                  </TemaInfo>
                </div>
              </BuyTema>
            ))}
          </PopBoard>
          <CloseDiv>
            <CloseButton onClick={close}>닫기</CloseButton>
          </CloseDiv>
        </Popup>
      )}
    </PopupOverlay>
  );
};
export default TemaPop;
