import styled from "styled-components";
import { Link } from "react-router-dom";

const Contain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoginBtn = styled.div`
  width: 15vw;
  aspect-ratio: 1/1;
  border-radius: 50%;
  cursor: pointer;
  margin-top: 4vh;
`;

const NotLogin = () => {
  return (
    <Contain>
      <Link to="/login-page">
        <LoginBtn />
      </Link>
    </Contain>
  );
};
export default NotLogin;
