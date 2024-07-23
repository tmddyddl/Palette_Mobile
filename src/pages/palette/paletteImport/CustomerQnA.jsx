import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HelpQ = styled(Link)`
  width: 174px;
  height: 70%;
  display: flex;
  align-items: center;
  border: 1px solid gray;
  justify-content: center;
  margin-left: 1.5%;
  margin-top: 1%;
  text-decoration: none;
  color: #000;
  &:hover {
    font-weight: bolder;
  }
  @media screen and (max-width: 1100px) {
    height: 55%;
  }
`;

const HelpQText = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  font-size: 15px;
  align-items: center;
  border: none;
  @media screen and (max-width: 1100px) {
    font-size: 12px;
  }
`;

const QnAItem = ({ q }) => {
  return (
    <>
      <HelpQ to="/customer/help">
        <HelpQText>{q}</HelpQText>
      </HelpQ>
    </>
  );
};

export default QnAItem;
