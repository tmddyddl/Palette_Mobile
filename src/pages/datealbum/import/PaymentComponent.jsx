import React, { useState } from "react";
import * as PortOne from "@portone/browser-sdk/v2";
import styled from "styled-components";
import modalImg from "../../../img/commonImg/전구 아이콘.gif";
import Modal from "../../datediary/Modal";
import AlbumAxiosApi from "../../../axiosapi/AlbumAxiosApi";
// import AxiosApi from "../../../axiosapi/AlbumAxiosApi";

const BuyButton = styled.div`
  padding: 0.4rem 0.7rem;
  font-size: 0.65rem;
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

const PaymentComponent = ({ onPaymentSuccess, amount, order }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("잘못된 요청입니다.");
  const [modalType, setModalType] = useState(false);
  const userEmail = sessionStorage.getItem("email");

  const modalOkBtnHandler = () => {
    closeModal();
    navigator("/login-page");
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handlePayment = async () => {
    const customerName = await AlbumAxiosApi.getCustomer(userEmail);
    const userName = customerName.data;
    const storeId = "store-7bad9ad7-1c77-49a1-b374-45668a8ef9cb"; // 포트원 관리자 콘솔에서 가져온 Store ID
    const channelKey = "channel-key-720b1a91-7a32-4fc4-ac44-40fa627f18b9"; // 포트원 관리자 콘솔에서 가져온 채널 키
    const shortId = crypto.randomUUID().slice(0, 32); // UUID 생성 후 처음 8자리 사용
    const paymentId = `payment-${shortId}`;
    const totalAmount = amount; // 결제 금액
    const orderName = order;
    const currency = "CURRENCY_KRW";
    const payMethod = "CARD";
    const customer = {
      fullName: userName, // 구매자 이름 추가
      phoneNumber: "010-0000-0000", // 구매자 전화번호 추가
      email: userEmail, // 구매자 이메일 추가
    };

    try {
      const token = localStorage.getItem("accessToken");

      console.log("결제 요청 데이터:", {
        storeId,
        channelKey,
        paymentId,
        orderName,
        totalAmount,
        currency,
        payMethod,
        customer,
      });

      const response = await PortOne.requestPayment({
        storeId: storeId,
        channelKey: channelKey,
        paymentId: paymentId,
        orderName: orderName,
        totalAmount: totalAmount,
        currency: currency,
        payMethod: payMethod,
        customer: customer,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // 모바일 환경을 고려한 리디렉션 URL 설정
        redirectUrl: `${window.location.origin}/payment-redirect`,
      });

      if (response.code != null) {
        // 오류 발생
        setModalOpen(true);
        setModalType(false);
        setModalText("결제를 취소하였습니다.");
      } else {
        // 결제가 성공한 경우
        const notified = await fetch(`http://localhost:5000/payment/complete`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            paymentId: response.paymentId,
            orderName: orderName,
            totalAmount: totalAmount,
            customer: customer,
            // 추가적인 주문 정보를 여기에 전달
          }),
        });

        if (notified.ok) {
          setModalOpen(true);
          setModalType(false);
          setModalText("결제 성공!");
          onPaymentSuccess();
        } else {
          const errorText = await notified.text();
          setModalOpen(true);
          setModalText(`결제 처리 중 오류가 발생했습니다: ${errorText}`);
        }
      }
    } catch (error) {
      setModalOpen(true);
      setModalText("결제 중 에러 발생");
      console.error("결제 중 에러 발생:", error);
    }
  };

  return (
    <>
      <BuyButton onClick={handlePayment}>구매 하기</BuyButton>
      <Modal
        open={modalOpen}
        header="안내"
        close={closeModal}
        type={modalType}
        confirm={modalOkBtnHandler}
        img={modalImg}
      >
        {modalText}
      </Modal>
    </>
  );
};

export default PaymentComponent;
