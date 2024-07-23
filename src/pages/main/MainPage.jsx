import styled, { keyframes, css } from "styled-components";
import iu from "../../img/background/paletteLogo.png";
import CoupleDday from "../../common/couple/CoupleDday";
import CoupleImg from "../../common/couple/CoupleImg";
import couple1 from "../../img/mainImg/커플1.jpg";
import couple2 from "../../img/mainImg/커플2.jpg";
import couple3 from "../../img/mainImg/커플3.jpg";
import couple4 from "../../img/mainImg/커플4.jpg";
import { useCallback, useEffect, useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";
import AlbumAxiosApi from "../../axiosapi/AlbumAxiosApi";
import MainAxios from "../../axiosapi/MainAxios";
import { GiArchiveResearch } from "react-icons/gi";
import BoardAxios from "../../axiosapi/BoardAxios";
import theme3 from "../../img/background/theme/new.jpg";
import theme3_1 from "../../img/background/theme/new-1.jpg";
import postIt from "../../img/mainImg/postIt.png";

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
  width: 497px;
  height: 67vh;
  margin-top: 5vh;
  margin-left: 0.7vw;
  border: 1px solid #696969;
  background-image: url(${theme3});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1200px) {
    width: 420px;
    height: 56vh;
    margin-top: 4.2vh;
  }
  @media screen and (max-width: 768px) {
    width: 280px;
    height: 35vh;
    margin-top: 2.8vh;
  }
`;

const BookTheme2 = styled.div`
  width: 497px;
  height: 67vh;
  margin-top: 5vh;
  margin-left: 0.1vw;
  border: 1px solid #696969;
  background-image: url(${theme3_1});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1200px) {
    width: 420px;
    height: 56vh;
    margin-top: 4.2vh;
  }
  @media screen and (max-width: 768px) {
    width: 280px;
    height: 35vh;
    margin-top: 2.8vh;
  }
`;

const BookSign = styled.div`
  width: 497px;
  height: 100%;
  @media screen and (max-width: 1200px) {
    width: 420px;
    height: 56vh;
    margin-top: 4.2vh;
  }
  @media screen and (max-width: 768px) {
    width: 280px;
    height: 35vh;
    margin-top: 1vh;
  }
`;
const BookSign2 = styled.div`
  width: 497px;
  height: 67vh;
  background-image: url(${theme3_1});
  background-size: cover;
  border: 1px solid #696969;
  transform: perspective(1000px) rotateY(0deg); /* 애니메이션 초기 위치 */
  transform-origin: left;
  position: absolute;
  ${({ animate }) =>
    animate &&
    css`
      animation: ${turnPageLeft} 1.8s forwards;
    `}

  @media screen and (max-width: 1200px) {
    width: 430px;
    height: 56vh;
  }
  @media screen and (max-width: 768px) {
    width: 280px;
    height: 35vh;
  }
`;

const CoupleDiv = styled.div`
  width: 497px;
  height: 22vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1200px) {
    width: 420px;
    height: 16vh;
  }
  @media screen and (max-width: 768px) {
    width: 280px;
    height: 10vh;
  }
`;
const PaletteBanner = styled.div`
  width: 470px;
  height: 15vh;
  display: flex;
  background-image: url(${iu});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  @media screen and (max-width: 1200px) {
    width: 400px;
    height: 12vh;
  }
  @media screen and (max-width: 768px) {
    width: 360px;
    height: 7vh;
  }
`;
const DdayDiv = styled.div`
  width: 490px;
  height: 23vh;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ animate }) =>
    animate &&
    css`
      opacity: 0;
      transition: opacity 1.4s;
    `}
  @media screen and (max-width: 1200px) {
    width: 420px;
    height: 18vh;
  }
  @media screen and (max-width: 768px) {
    width: 280px;
    height: 11vh;
  }
`;
const GalleryDiv = styled.div`
  width: 497px;
  height: 38vh;
  ${({ animate }) =>
    animate &&
    css`
      opacity: 0;
      transition: opacity 1.4s;
    `}
  @media screen and (max-width: 1200px) {
    width: 420px;
    height: 32vh;
  }
  @media screen and (max-width: 768px) {
    width: 280px;
    height: 20vh;
  }
`;
const RecentPostDiv = styled.div`
  width: 330px;
  height: 24vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #000;
  @media screen and (max-width: 1200px) {
    width: 290px;
    height: 17vh;
  }
  @media screen and (max-width: 768px) {
    width: 180px;
    height: 11vh;
  }
`;
const RecentPosts = styled.div`
  width: 308px;
  height: 20vh;
  border: 1px solid #000;
  @media screen and (max-width: 1200px) {
    width: 270px;
    height: 15vh;
  }
  @media screen and (max-width: 768px) {
    width: 170px;
    height: 10vh;
  }
`;
const DdayFormDiv = styled.div`
  width: 150px;
  height: 24vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #000;
  @media screen and (max-width: 1200px) {
    width: 130px;
    height: 17vh;
  }
  @media screen and (max-width: 768px) {
    width: 80px;
    height: 11vh;
  }
`;
const Dday = styled.div`
  width: 150px;
  height: 20vh;
  border: 1px solid #000;
  @media screen and (max-width: 1200px) {
    width: 130px;
    height: 15vh;
  }
  @media screen and (max-width: 768px) {
    width: 80px;
    height: 10vh;
  }
`;
const RecentTitle = styled.div`
  width: 308px;
  height: 4vh;
  border-bottom: 1px solid #000;
  display: flex;
  align-items: center;
  color: #000;
  font-weight: 800;
  font-size: 17px;
  @media screen and (max-width: 1200px) {
    width: 268px;
    height: 3.5vh;
    font-size: 15px;
  }
  @media screen and (max-width: 768px) {
    width: 168px;
    height: 2vh;
    font-size: 10px;
  }
`;
const Recents = styled.div`
  width: 308px;
  height: 4vh;
  padding-left: 3%;
  display: flex;
  align-items: center;
  color: #000;
  font-weight: 800;
  font-size: 16px;
  border-radius: 0.521vw;
  cursor: pointer;
  transition: transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  &:hover {
    transform: scale(0.97);
    color: royalblue;
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.2);
  }
  @media screen and (max-width: 1200px) {
    width: 268px;
    height: 2.8vh;
    font-size: 15px;
  }
  @media screen and (max-width: 768px) {
    width: 168px;
    height: 2vh;
    font-size: 10px;
  }
`;
const Ddays = styled.div`
  width: 150px;
  height: 4vh;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: #000;
  font-weight: 600;
  @media screen and (max-width: 1200px) {
    width: 120px;
    height: 3vh;
    font-size: 13px;
  }
  @media screen and (max-width: 768px) {
    width: 80px;
    height: 1.9vh;
    font-size: 9px;
  }
`;
const Picture = styled.div`
  width: 150px;
  height: 15.74vh;
  background-image: ${({ imageurl }) => `url(${imageurl})`};
  background-size: cover;
  border: 1px solid black;
  &:hover {
    transform: scale(1.02);
  }
  @media screen and (max-width: 1200px) {
    width: 130px;
    height: 13vh;
  }
  @media screen and (max-width: 768px) {
    width: 75px;
    height: 8vh;
  }
`;
const PictureDiv = styled.div`
  width: 497px;
  height: 20vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  @media screen and (max-width: 1200px) {
    width: 420px;
    height: 16vh;
  }
  @media screen and (max-width: 768px) {
    width: 300px;
    height: 11vh;
  }
`;
const VisitDiv = styled.div`
  width: 64%;
  height: 3.5vh;
  border-radius: 10px;
  border: 1px solid #fff;
  & > .visitDiv {
    display: flex;
  }
  & > div > input {
    width: 89%;
    height: 3vh;
    padding-left: 1.083vw;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    outline: none;
    color: #fff;
    font-size: 0.8vw;
    font-weight: 500;
  }
  @media screen and (max-width: 1200px) {
    height: 3vh;
    & > div > input {
      height: 2.5vh;
    }
  }
  @media screen and (max-width: 768px) {
    height: 2.5vh;
    & > div > input {
      height: 2vh;
    }
  }
`;
const VisitList = styled.div`
  width: 100%;
  height: 3vh;
  border-radius: 10px;
  margin-top: 1%;
  border: 1px solid #fff;
  color: #fff;
  background-color: #d2e2eb;
  font-size: 16px;
  font-weight: 500;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    transform: scale(0.95);
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.4);
    color: #5549f7;
  }
  @media screen and (max-width: 1200px) {
    height: 2.5vh;
    font-size: 14px;
  }
  @media screen and (max-width: 768px) {
    height: 2.4vh;
    font-size: 12px;
  }
`;
const VisitSearchBtn = styled(GiArchiveResearch)`
  width: 11%;
  height: 3.148vh;
  color: green;
  cursor: pointer;
  @media screen and (max-width: 1200px) {
    height: 3vh;
  }
  @media screen and (max-width: 768px) {
    height: 2.5vh;
  }
`;
const SettingDiv = styled.div`
  width: 497px;
  height: 4vh;
  display: flex;
  justify-content: end;
  align-items: center;
  ${({ animate }) =>
    animate &&
    css`
      opacity: 0;
      transition: opacity 1.4s;
    `}
  & > .space {
    width: 1vw;
  }
  @media screen and (max-width: 1200px) {
    width: 420px;
    height: 3.5vh;
  }
  @media screen and (max-width: 768px) {
    width: 280px;
    height: 1.7vh;
  }
`;
// flipInX 애니메이션 정의
const flipInX = keyframes`
  from {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }

  40% {
    transform: perspective(400px) rotate3d(1, 0, 0, -10deg);
    animation-timing-function: ease-in;
  }

  70% {
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    animation-timing-function: ease-in;
  }

  to {
    transform: perspective(400px) rotate3d(1, 0, 0, 0deg);
    animation-timing-function: ease-in;
    opacity: 1;
  }
`;
const Setting = styled(IoSettingsSharp)`
  width: 1.563vw;
  height: 3.148vh;
  color: rgba(0, 0, 0, 0.8);
  margin-right: 2%;
  cursor: pointer;
  &:hover {
    color: rgba(131, 55, 55, 0.8);
  }
`;
const SettingFormat = styled.div`
  width: 380px;
  padding-left: 150px;
  height: auto;
  border-radius: 10px;
  margin-top: 22vh;
  display: flex;
  justify-content: end;
  align-items: center;
  animation: ${flipInX} 0.5s ease-in-out; /* 애니메이션 적용 */
  @media screen and (max-width: 1200px) {
    margin-top: 20vh;
  }
  @media screen and (max-width: 768px) {
    margin-top: 18vh;
  }
`;
const SettingForm = styled.div`
  width: 500px;
  height: 360px;
  background-image: url(${postIt});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: first baseline;
  z-index: 10;
  @media screen and (max-width: 768px) {
    width: 400px;
    height: 300px;
  }
`;
const Btn = styled.div`
  width: 70px;
  height: 35px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  &:hover {
    transform: scale(0.95);
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.4);
  }
`;
const BtnDiv = styled.div`
  width: 260px;
  height: 20vh;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 230px;
    height: 17vh;
  }
`;

const XbtnDiv = styled.div`
  width: 250px;
  height: 10vh;
  padding-right: 20px;
  display: flex;
  justify-content: end;
  align-items: end;
  @media screen and (max-width: 768px) {
    width: 230px;
    height: 8vh;
  }
`;
const CloseBtn = styled(IoMdCloseCircleOutline)`
  width: 25px;
  height: 25px;
  color: rgba(0, 0, 0, 0.8);
  cursor: pointer;
  &:hover {
    color: rgba(131, 55, 55, 0.8);
  }
  @media screen and (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;
const VisitContainer = styled.div`
  width: 90%;
  height: 13vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1200px) {
    height: 10vh;
  }
  @media screen and (max-width: 768px) {
    height: 7vh;
  }
`;
const BackMyHome = styled.div`
  width: 96px;
  height: 3vh;
  font-size: 0.6vw;
  font-weight: 700;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
  }
  @media screen and (max-width: 1200px) {
    width: 70px;
    height: 2.5vh;
  }
  @media screen and (max-width: 768px) {
    width: 40px;
    height: 1.5vh;
  }
`;

const MainPage = ({url, clearUrl}) => {
  const coupleName = sessionStorage.getItem("coupleName");
  const navigate = useNavigate();
  // 커플 이름 검색 후 추가
  const [searchTerm, setSearchTerm] = useState("");

  // 설정 폼 변화
  const [settingForm, setSettingForm] = useState(false);
  // 커플 이름 검색 함수

  //디데이 값 저장
  const [saveDday, setSaveDday] = useState("");
  //디데이 존재하는지
  const [isDday, setIsDday] = useState(false);
  //searchCouple 포함 리스트 저장
  const [searchCoupleList, setSearchCoupleList] = useState([]);
  // 내 방이면 true 아니면 false
  const [isMyHome, setIsMyHome] = useState(true);
  //갤러리에서 이미지 메인 화면에 오도록 저장하는 변수
  const [gallaryImg, setGallaryImg] = useState(Array(4).fill(null));
  //갤러리 이미지 받아오는 비동기 함수
  const listGallaryImg = async (siteCoupleName) => {
    //커플 이름으로 email 받아오는 await 함수
    const res = await MemberAxiosApi.firstEmailGet(siteCoupleName);
    //email로 gallary 이미지들 받아오는 await 함수
    const gallaryList = await AlbumAxiosApi.getImages(res.data);
    const galleries = gallaryList.data;
    // 평탄화 작업
    const updatedImages = galleries.slice(0, 4).map((image) => image.urls[0]);
    setGallaryImg(updatedImages);
  };
  const [animate, setAnimate] = useState(false);

  const pageMove = useCallback(() => {
    setAnimate(true);
    setTimeout(() => {
      navigate(url);
      clearUrl(); // URL 초기화
    }, 1800);
  }, [navigate, url, clearUrl]);

  useEffect(() => {
    if (url) {
      pageMove();
    }
  }, [url, pageMove]);

  useEffect(() => {
    listGallaryImg(coupleName);
    fetchBoardDataCN();
  }, [coupleName]);

  useEffect(() => {
    fetchBoardDataCN();
  }, []);
  useEffect(() => {
    console.log(gallaryImg);
  }, [gallaryImg]);
  //커플 이름 검색
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = (index) => {
    const coupleName = searchCoupleList[index];
    if (coupleName) {
      sessionStorage.setItem("coupleName", coupleName);
      console.log(
        "오픈북 검색창 searchTerm",
        searchTerm,
        " coupleName",
        coupleName
      );
      navigate(`/${coupleName}/main-page`);
      setIsMyHome(false);
      setSearchTerm(""); // 필요시 네비게이션 후 검색어 초기화
    }
  };

  //설정 폼 변화 함수
  const settingFromStatus = () => {
    setSettingForm(true);
  };
  const closeFromStatus = () => {
    setSettingForm(false);
  };
  const [boardSaveData, setBoardSaveData] = useState([]);
  const email = sessionStorage.getItem("email");
  useEffect(() => {
    dDayAxois();
  }, [isDday, coupleName]);

  //디데이 값을 가져오는 비동기함수
  const dDayAxois = async () => {
    //이메일로 커플이름 search
    const coupleName = await MemberAxiosApi.renderCoupleNameSearch(email);
    // Dday값 가져오기
    const resDday = await MainAxios.searchDday(coupleName.data);
    console.log(resDday.data);
    if (resDday.data !== "") {
      setIsDday(true);
      setSaveDday(resDday.data);
    } else {
      setIsDday(false);
    }
  };
  // 게시물 가져오기
  const fetchBoardDataCN = async () => {
    console.log(coupleName);
    try {
      const data = await BoardAxios.getCoupleName(coupleName);
      setBoardSaveData(data.data);
      console.log("axios 데이터", data.data);
    } catch (error) {
      console.error("Failed to fetch board data", error);
    }
  };
  // 100일 계산 함수
  const hundredCalculate = () => {
    return saveDday - 100;
  };
  //500일 계산 함수
  const fiveHundredCalculate = () => {
    return saveDday - 500;
  };
  // 방문 검색 onChange 함수
  const visitSearchOnChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const coupleNameListAxios = async (visitCoupleName) => {
    if (visitCoupleName !== "") {
      const res = await MainAxios.visitCoupleNameSearchList(visitCoupleName);
      setSearchCoupleList(res.data);
    } else {
      setSearchCoupleList([]);
    }
  };
  useEffect(() => {
    coupleNameListAxios(searchTerm);
  }, [searchTerm]);
  const goHomeOnClickHandler = () => {
    MycoupleNameSearch(email);
    setIsMyHome(true);
  };
  const MycoupleNameSearch = async (emailValue) => {
    const myCoupleNameData = await MemberAxiosApi.renderCoupleNameSearch(
      emailValue
    );
    sessionStorage.setItem("coupleName", myCoupleNameData.data);
    navigate(`/${myCoupleNameData.data}/main-page`);
  };
  //게시물 보기로 이동
  const boardOnClickHandler = (id) => {
    navigate(`/${coupleName}/board-details/${id}`);
  };

  // 방문자 검색 글자수
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <>
      <BookTheme>
        <BookSign>
          <CoupleDiv>
            <PaletteBanner />
          </CoupleDiv>
          <CoupleDiv>
            <CoupleImg isMyHome={isMyHome} />
          </CoupleDiv>
          <CoupleDiv>
            <CoupleDday isMyHome={isMyHome} />
            <VisitContainer>
              <VisitDiv>
                <div className="visitDiv">
                  <input
                    type="text"
                    placeholder="다른 미니홈피 검색"
                    value={searchTerm}
                    onChange={visitSearchOnChange}
                    onKeyDown={handleKeyPress}
                  />
                  <VisitSearchBtn />
                </div>
                {/* 여기 검색단어 맵으로 뿌려줄 예정 */}
                {searchCoupleList.map((couple, index) => (
                  <VisitList key={index} onClick={() => handleSearch(index)}>
                    {truncateText(couple, 15)}
                  </VisitList>
                ))}
              </VisitDiv>
            </VisitContainer>
          </CoupleDiv>
        </BookSign>
      </BookTheme>
      <BookTheme2>
        <BookSign2 animate={animate}>
          <SettingDiv animate={animate}>
            <BackMyHome onClick={goHomeOnClickHandler}>
              내 홈으로 돌아가기
            </BackMyHome>
            <div className="space" />
            {!settingForm && (
              <Setting onClick={settingFromStatus} openform={settingForm} />
            )}
            {settingForm && (
              <SettingFormat>
                <SettingForm>
                  <div className="settingDiv">
                    <XbtnDiv>
                      <CloseBtn onClick={closeFromStatus} />
                    </XbtnDiv>
                    <BtnDiv>
                      <Btn
                        onClick={() => {
                          navigate("/modify");
                        }}
                      >
                        수정하기
                      </Btn>
                      <Btn
                        onClick={() => {
                          sessionStorage.setItem("email", "");
                          navigate("/");
                        }}
                      >
                        로그아웃
                      </Btn>
                      <Btn
                        onClick={() => {
                          navigate("/withdrawal");
                        }}
                      >
                        회원탈퇴
                      </Btn>
                    </BtnDiv>
                  </div>
                </SettingForm>
              </SettingFormat>
            )}
          </SettingDiv>
          <DdayDiv animate={animate}>
            <RecentPostDiv>
              <RecentPosts>
                <RecentTitle>&nbsp;최근 게시물</RecentTitle>
                {boardSaveData.slice(0, 4).map((item, index) => (
                  <Recents
                    key={index}
                    onClick={() => {
                      boardOnClickHandler(item.id);
                    }}
                  >
                    &nbsp;{item.title}
                  </Recents>
                ))}
              </RecentPosts>
            </RecentPostDiv>
            <DdayFormDiv>
              <Dday>
                <Ddays>&nbsp;TODAY : 8 </Ddays>
                {isDday ? (
                  <>
                    <Ddays>&nbsp;TOTAL : {saveDday} day</Ddays>
                    <Ddays>&nbsp;100일 : {hundredCalculate()} day</Ddays>
                    <Ddays>&nbsp;500일 : {fiveHundredCalculate()} day</Ddays>
                  </>
                ) : (
                  <>
                    <Ddays>&nbsp;TOTAL : 입력해주세요. </Ddays>
                    <Ddays>&nbsp;100일 : 입력해주세요. </Ddays>
                    <Ddays>&nbsp;500일 : 입력해주세요.</Ddays>
                  </>
                )}

                <Ddays>&nbsp;알콩이 생일 : D - 70 </Ddays>
              </Dday>
            </DdayFormDiv>
          </DdayDiv>
          <GalleryDiv animate={animate}>
            <PictureDiv>
              <Picture imageurl={gallaryImg[0] ? gallaryImg[0] : couple1} />
              <Picture imageurl={gallaryImg[1] ? gallaryImg[1] : couple2} />
            </PictureDiv>
            <PictureDiv>
              <Picture imageurl={gallaryImg[2] ? gallaryImg[2] : couple3} />
              <Picture imageurl={gallaryImg[3] ? gallaryImg[3] : couple4} />
            </PictureDiv>
          </GalleryDiv>
        </BookSign2>
      </BookTheme2>
    </>
  );
};

export default MainPage;
