import styled from "styled-components";
import manprofile from "../../img/commonImg/남자프사.jpg";
import womanprofile from "../../img/commonImg/여자프사.jpg";
import heart from "../../img/commonImg/heart.png";
import { useEffect, useState } from "react";
import MainAxios from "../../axiosapi/MainAxios";
import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";

const Contain = styled.div`
  width: 300px; // 150px / 1920 * 100
  height: 15.74vh; // 150px / 953 * 100
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media screen and (max-width: 1200px) {
    width: 260px;
    height: 13vh;
  } 
  @media screen and (max-width: 768px) {
    width: 200px;
    height: 10vh;
    border-radius: 5px 5px 0 0;
  }
`;

const ProfileDiv = styled.div`
  width: flex;
  height: flex;
`;

const ProfileImgDiv = styled.div`
  width: 115px;
  height: 11vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1200px) {
    width: 110px;
    height: 8vh;
  } 
  @media screen and (max-width: 768px) {
    width: 25px;
    height: 5vh;
    border-radius: 5px 5px 0 0;
  }
`;

const HeartDiv = styled.div`
  width: 70px;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Heart = styled.div`
  width: 25px; // 25px / 1920 * 100
  height: 2.6233vh; // 25px / 953 * 100
  background-image: url(${heart});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  @media screen and (max-width: 1200px) {
    width: 23px;
    height: 2.4vh;
  } 
  @media screen and (max-width: 768px) {
    width: 16px;
    height: 8vh;
  }
`;

const Profile = styled.div`
  width: 70px; // 70px / 1920 * 100
  height: 7.3453vh; // 70px / 953 * 100
  background-image: ${({ imageurl }) => `url(${imageurl})`};
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  @media screen and (max-width: 1200px) {
    width: 60px;
    height: 6vh;
  } 
  @media screen and (max-width: 768px) {
    width: 30px;
    height: 3vh;
  }
`;

const Text = styled.div`
  width: auto;
  height: 1.0493vh; // 10px / 953 * 100
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px; // 13px / 1920 * 100
  font-weight: 600;
  color: black;
  @media screen and (max-width: 1200px) {
    font-size: 12px; // 13px / 1920 * 100
  } 
  @media screen and (max-width: 768px) {
    font-size: 9px; // 13px / 1920 * 100
  }
`;

const CoupleImg = () => {
  // 커플 닉네임 저장
  const [coupleNickName, setCoupleNickName] = useState(["", ""]);
  const email = sessionStorage.getItem("email");
  const imgUrl = sessionStorage.getItem("imgUrl");
  const myDarling = sessionStorage.getItem("myDarling");
  const coupleName = sessionStorage.getItem("coupleName");
  const [saveFirstEmail, setSaveFirstEmail] = useState("");

  //세션 커플이름이 바뀌었을 경우
  useEffect(() => {
    const fetchData = async (coupleNameData) => {
      try {
        console.log("커플이름 :" + coupleNameData);
        // 커플이름에 해당하는 첫 번째 이메일을 검색하고 저장합니다.
        const firstEmailResponse = await MemberAxiosApi.firstEmailGet(
          coupleNameData
        );
        const firstEmail = firstEmailResponse.data; // 예시에서는 firstEmailResponse에서 실제 데이터를 얻어오는 방법으로 수정해야 합니다.
        setSaveFirstEmail(firstEmail);
        // 첫 번째 이메일을 사용하여 다른 비동기 작업을 진행합니다.
        await Promise.all([coupleNickNameAxios(firstEmail)]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(coupleName);
  }, [coupleName]);
  //
  const coupleNickNameAxios = async (emailData) => {
    console.log("emailData : " + emailData);
    const resCouple = await MemberAxiosApi.renderCoupleNameSearch(emailData);
    console.log("이거 :" + resCouple.data);
    const resNickName = await MainAxios.searchNickName(
      emailData,
      resCouple.data
    );

    setCoupleNickName(resNickName.data);
    console.log("커플닉네임 확인:" + resNickName.data);
  };
  return (
    <Contain>
      <ProfileDiv>
        <ProfileImgDiv>
          <Profile imageurl={imgUrl ? imgUrl : manprofile} />
        </ProfileImgDiv>
        <Text>{coupleNickName[0] || "알콩"}</Text>
      </ProfileDiv>
      <HeartDiv>
        <Heart />
      </HeartDiv>
      <ProfileDiv>
        <ProfileImgDiv>
          <Profile imageurl={myDarling ? myDarling : womanprofile} />
        </ProfileImgDiv>
        <Text>{coupleNickName[1] || "달콩"}</Text>
      </ProfileDiv>
    </Contain>
  );
};

export default CoupleImg;
