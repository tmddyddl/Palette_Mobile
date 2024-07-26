import styled from "styled-components";
import LetterOpenImg from "../../img/background/mobile/편지지2.jpg";
import { Outlet, Link } from "react-router-dom";
import logo from "../../img/background/logo.png";
import { useState, useEffect } from "react";
import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";

const Contain = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${LetterOpenImg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const LetterOpen = styled.div`
  width: 100%;
  height: 100%;
`;
const Logo = styled.div`
  width: 30vw;
  aspect-ratio: 1/1;
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 50%;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  &:hover {
    transform: scale(0.95);
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.4);
  }
`;
const LogoDiv = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoginLetter = ({ modify }) => {
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
      <LogoDiv>
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
      </LogoDiv>
      <LetterOpen>
        <Outlet />
      </LetterOpen>
    </Contain>
  );
};
export default LoginLetter;
