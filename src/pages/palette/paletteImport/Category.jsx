import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { styled, css } from "styled-components";

const Category = styled.div`
  width: 269px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff9f0;
  border-right: 1px solid darkgray;
  @media screen and (max-width: 1100px) {
    width: 755px;
    height: 5%;
    flex-direction: row;
    margin-bottom: 3%;
    border-right: none;
    border-bottom: 1px solid darkgray;
  }
`;

const activeTitleStyle = css`
  font-size: 38px; /* CateTitle의 글씨체가 커지는 효과 */
  font-weight: bold;
`;

const activeStyle = css`
  font-size: 19px; /* 글씨체가 커지는 효과 */
  font-weight: bold;
`;

const CateTitle = styled(Link)`
  width: 55%;
  height: 5%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 36px;
  text-decoration: none;
  color: #000;
  margin-bottom: 15%;
  &:hover {
    font-weight: bolder;
  }
  ${(props) => props.isActive && activeTitleStyle}
  @media screen and (max-width: 1100px) {
    width: 20%;
    height: 55%;
    justify-content: center;
    margin-bottom: 0%;
    border-right: 1px solid gray;
    font-size: 26px;
  }
`;

const CateContent = styled(Link)`
  width: 55%; 
  height: 3%;
  margin-bottom: 3%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 17px;
  text-decoration: none;
  color: #000;
  &:hover {
    font-weight: bolder;
  }
  ${(props) => props.isActive && activeStyle}
  @media screen and (max-width: 1100px) {
    width: 16%;
    height: 50%;
    margin-bottom: 0%;
    justify-content: center;
  }
`;

const Cate = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Category>
      <CateTitle to="/customer" isActive={currentPath === "/customer"}>
        고객센터
      </CateTitle>
      <CateContent
        to="/customer/notice"
        isActive={currentPath === "/customer/notice"}
      >
        공지사항
      </CateContent>
      <CateContent
        to="/customer/help"
        isActive={currentPath === "/customer/help"}
      >
        자주 묻는 질문
      </CateContent>
      <CateContent
        to="/customer/inquiry"
        isActive={currentPath === "/customer/inquiry"}
      >
        1:1 문의하기
      </CateContent>
    </Category>
  );
};

export default Cate;
