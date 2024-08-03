import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import PaymentComponent from "./PaymentComponent";
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
  height: 200px;
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
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #c8c8c8;
  align-items: center;
  justify-content: center;
`;
const PageTitleleft = styled.div`
  width: 35%;
  height: 100%;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const PageTitleRight = styled.div`
  width: 65%;
  height: 100%;
  padding-right: 1%;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const PopBoard = styled.div`
  width: 90%;
  height: 60%;
  margin-top: 1.2%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background-color: white;
`;

const BuyPage = styled.div`
  width: 50%;
  height: 90%;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-right: 1px solid darkgray;
  &:last-child {
    border-right: none;
  }
`;
const PageLeft = styled.div`
  width: 90%;
  height: 100%;
  display: flex;

  background-color: #eeeeee;
`;
const PageRight = styled.div`
  width: 90%;
  height: 100%;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #eeeeee;
`;
const PageInfo = styled.div`
  width: 100%;
  height: 100%;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const PageOne = styled.div`
  width: 100%;
  height: 30%;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PageTwo = styled.div`
  width: 100%;
  height: 20%;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PageThr = styled.div`
  width: 100%;
  height: 30%;
  font-size: 0.8rem;
  display: flex;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 2%;
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

const PagePop = (props) => {
  const { open, close } = props;
  const [amount, setAmount] = useState(null);
  const userEmail = sessionStorage.getItem("email");

  const isAmountAxios = useCallback(async () => {
    try {
      const response = await AlbumAxiosApi.getAmount(userEmail);
      const amount = Math.floor(response.data / 1000);
      setAmount(amount);
    } catch (error) {
      console.error("페이지 조회 실패", error);
      setAmount(null);
    }
  }, [userEmail]);

  useEffect(() => {
    if (open) {
      isAmountAxios();
    }
  }, [open, isAmountAxios]);

  // 결제
  const handlePaymentSuccess = () => {
    console.log("Payment was successful!");
    isAmountAxios(); // 결제 성공 후 금액 업데이트
  };

  return (
    <PopupOverlay className={open ? "openModal" : ""}>
      {open && (
        <Popup>
          <PopTitle>
            <PageTitleleft>페이지 구매</PageTitleleft>
            <PageTitleRight>
              최대 페이지 : 5 / 보유 페이지 :{" "}
              {amount !== null ? amount + 1 : "1"}
            </PageTitleRight>
          </PopTitle>
          <PopBoard>
            {amount < 4 && (
              <>
                <BuyPage>
                  <PageLeft>
                    <PageInfo>
                      <PageOne>페이지 1장 구매</PageOne>
                      <PageTwo>파격세일!!</PageTwo>
                      <PageThr>
                        <Strikethrough>5000원</Strikethrough>= 1000원
                      </PageThr>
                      <PaymentComponent
                        onPaymentSuccess={handlePaymentSuccess}
                        amount={1000}
                        order={"Palette Album 페이지 구매"}
                      />
                    </PageInfo>
                  </PageLeft>
                </BuyPage>
                {amount < 3 && (
                  <BuyPage>
                    <PageRight>
                      <PageInfo>
                        <PageOne>페이지 2장 구매</PageOne>
                        <PageTwo>파격세일!!</PageTwo>
                        <PageThr>
                          <Strikethrough>10000원</Strikethrough>= 2000원
                        </PageThr>
                        <PaymentComponent
                          onPaymentSuccess={handlePaymentSuccess}
                          amount={2000}
                          order={"Palette Album 페이지 2장 구매"}
                        />
                      </PageInfo>
                    </PageRight>
                  </BuyPage>
                )}
              </>
            )}
            {amount >= 4 && (
              <PageInfo>
                <PageOne>더 이상 페이지를 구매할 수 없습니다.</PageOne>
              </PageInfo>
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
export default PagePop;
