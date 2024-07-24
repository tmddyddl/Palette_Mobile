import styled from "styled-components";
import LetterOpenImg from "../../img/background/mobile/편지봉투3.jpg";
import { Outlet, Link } from "react-router-dom";
import logo from "../../img/background/logo.png";
import { useState, useEffect } from "react";
import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";

const Contain = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-color: black; */
`;
const LetterOpen = styled.div`
  /* background-image: url(${LetterOpenImg}); */
  background-color: white;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
const Logo = styled.div`
  width: 150px;
  height: 150px;
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 50%;
  z-index: 10;
  transform: translateX(-50%);
  position: absolute;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  &:hover {
    transform: translateX(-50%) scale(0.95);
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.4);
  }
`;
const MobileBook = ({ modify }) => {
  const [coupleName, setCoupleName] = useState();
  const email = sessionStorage.getItem("email");
  useEffect(() => {
    if (modify) {
      coupleNameAxios();
    }
  }, []);
  const coupleNameAxios = async () => {
    const res = await MemberAxiosApi.renderCoupleNameSearch(email);
    setCoupleName(res.data);
  };
  return (
    <Contain>
      {!modify && (
        <Link to="/">
          <Logo />
        </Link>
      )}
      {modify && (
        <Link to={`/${coupleName}/main-page`}>
          <Logo />
        </Link>
      )}
      <LetterOpen>
        <Outlet />
      </LetterOpen>
    </Contain>
  );
};
export default MobileBook;
