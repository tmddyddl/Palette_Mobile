import styled from "styled-components";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import LetterBtn from "../../img/background/mobile/편지봉투4-removebg-preview.png";

const Contain = styled.div`
  width: 100%;
  height: 100%;
`;

// const PaletteDiv = styled.div`
//   @font-face {
//     font-family: "Cafe24Lovingu";
//     src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/2405-3@1.1/Cafe24Lovingu.woff2")
//       format("woff2");
//     font-weight: normal;
//     font-style: normal;
//   }
//   width: 100%;
//   height: 40%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   color: #000;
//   font-size: 177px;
//   font-weight: normal;
//   font-family: "Cafe24Lovingu";
//   @media screen and (max-width: 654px) {
//     font-size: 27vw;
//   }
// `;

// const LetterImg = styled.div`
//   width: 200px;
//   height: 100px;
//   object-fit: cover;
// `;

const LoginDiv = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: aqua; */
  & > a {
    width: 50%;
    height: 50%;
    /* background-color: black; */
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const StyledBsPersonCircle = styled(BsPersonCircle)`
  width: 77%;
  height: 100%;
  cursor: pointer;
  border-radius: 50%;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  &:hover {
    transform: scale(0.9);
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.4);
  }
  @media screen and (max-width: 654px) {
  }
`;
const NotLogin = () => {
  return (
    <Contain>
      {/* <PaletteDiv>Palette</PaletteDiv> */}
      <LoginDiv>
        <Link to="/login-page">
          {/* <StyledBsPersonCircle color="rgba(0,0,0,0.7)" /> */}
          {/* <LetterImg src={LetterBtn} alt="Letter"></LetterImg> */}
        </Link>
      </LoginDiv>
    </Contain>
  );
};
export default NotLogin;
