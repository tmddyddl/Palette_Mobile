import React, { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useParams, useNavigate } from "react-router-dom";
import BoardAxios from "../../axiosapi/BoardAxios";
import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";

const turnPageLeft = keyframes`
  0% {
    transform: perspective(1000px) rotateY(0deg);
    transform-origin: left;
  }
  30% {
    transform: perspective(1600px) rotateY(-25deg);
    transform-origin: left;
  } 
  100% {
    transform: perspective(1000px) rotateY(-180deg);
    transform-origin: left;
  }
`;

const BookTheme = styled.div`
  width: 99%;
  height: 75vh;
  border: 1px solid #696969;
  background-color: #fff9f2;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
`;

const BookSign = styled.div`
  width: 425px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const DetailsSide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const EditBackContainer = styled.div`
  width: 100%;
  margin-top: 2vh;
  margin-left: 50%;
  height: 1vh;
  display: flex;
  justify-content: ${(isMyHome) => isMyHome && "center"};
`;

const EditPost = styled.div`
  width: 60px;
  height: 100%;
  font-size: 12px;
  font-weight: 600;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;

const BackToGuestbook = styled.div`
  width: 60px;
  height: 100%;
  font-size: 12px;
  font-weight: 600;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;

const DetailsNumber = styled.div`
  margin-top: 3vh;
  width: 120px;
  height: 3vh;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DetailsTitle = styled.div`
  width: 100%;
  height: 10%;
  font-size: 24px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DetailsGrayBar = styled.div`
  width: 90%;
  height: 0.5%;
  background-color: #b0b0b0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DetailsMain = styled.div`
  margin-top: 3%;
  width: 88%;
  height: 45vh;
  font-weight: 600;
  font-size: 21px;
`;
const BoardImgDetail = styled.div`
  margin-top: 3%;
  width: 40vw;
  height: 22vh;
  background-image: ${({ imageurl }) => `url(${imageurl})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 10px;
`;

const BoardDetails = ({ url, clearUrl }) => {
  const [boardDetails, setBoardDetails] = useState(null); // State to store board details
  const [boardData, setBoardData] = useState([]);

  // 내 방이면 true 아니면 false
  const [isMyHome, setIsMyHome] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from URL params
  const coupleName = sessionStorage.getItem("coupleName");
  const email = sessionStorage.getItem("email");

  const [animate, setAnimate] = useState(false);

  const pageMove = useCallback(() => {
    setAnimate(true);
    setTimeout(() => {
      navigate(url);
      clearUrl();
    }, 1800);
  }, [navigate, url, clearUrl]);

  useEffect(() => {
    if (url) {
      const encodedUrl = encodeURI(url); //공백을 문자로 인코딩
      if (window.location.pathname !== encodedUrl) {
        pageMove();
      } else {
        clearUrl();
      }
    }
  }, [url, pageMove, clearUrl]);

  // Function to fetch board details based on ID
  const fetchBoardDetails = async (id) => {
    console.log("id : " + id);
    try {
      // Example: Fetch board details from an API
      const response = await BoardAxios.fetchBoardById(id);
      setBoardDetails(response.data); // Assuming response.data contains board details
    } catch (error) {
      console.error("Error fetching board details:", error);
    }
  };

  useEffect(() => {
    fetchBoardDataCN();
    // Fetch board details when component mounts
    if (id) {
      fetchBoardDetails(id);
    }
    isMyHomeAxios();
  }, [id]);

  //본인만 "새 게시물 작성"이 보이도록 하는 axios
  const isMyHomeAxios = async () => {
    const myCoupleNameData = await MemberAxiosApi.renderCoupleNameSearch(email);
    console.log("불러온 커플네임 : " + myCoupleNameData.data);
    console.log("세션 커플네임 :" + coupleName);
    if (myCoupleNameData.data !== coupleName) {
      setIsMyHome(false);
    } else {
      setIsMyHome(true);
    }
  };
  const fetchBoardDataCN = async () => {
    console.log(coupleName);
    try {
      const data = await BoardAxios.getCoupleName(coupleName);
      console.log("axios 데이터", data.data);
      setBoardData(data.data.reverse());
    } catch (error) {
      console.error("Failed to fetch board data", error);
    }
  };

  // 게시글 수정하기
  const updateBoardContentsAxios = async (idValue) => {
    navigate(`/board-update`, { state: idValue });
  };
  // 게시글 삭제하기
  const deleteBoardContentsAxios = async (idValue) => {
    const res = await BoardAxios.deleteBoard(idValue);
    navigate(`/board-guestbook`);

    console.log(res);
  };
  //삭제 버튼 이벤트 함수
  const deleteOnClickHandler = () => {
    deleteBoardContentsAxios(id);
  };

  return (
    <>
      <BookTheme>
        <BookSign>
          {boardDetails && ( // Render DetailsSide if boardDetails is not null
            <DetailsSide>
              <EditBackContainer isMyHome={isMyHome}>
                {isMyHome && (
                  <>
                    <EditPost
                      onClick={() => {
                        updateBoardContentsAxios(id);
                      }}
                    >
                      수정하기
                    </EditPost>
                    <EditPost onClick={deleteOnClickHandler}>삭제하기</EditPost>
                  </>
                )}
                <Link
                  to={`/board-guestbook`}
                  style={{ textDecoration: "none" }}
                >
                  <BackToGuestbook>돌아가기</BackToGuestbook>
                </Link>
              </EditBackContainer>
              <DetailsNumber>No. {boardDetails.id}</DetailsNumber>
              <DetailsTitle>{boardDetails.title}</DetailsTitle>
              <DetailsGrayBar />
              {boardDetails.imgUrl && (
                <BoardImgDetail imageurl={boardDetails.imgUrl} />
              )}
              <DetailsMain>{boardDetails.contents}</DetailsMain>
            </DetailsSide>
          )}
        </BookSign>
      </BookTheme>
    </>
  );
};

export default BoardDetails;
