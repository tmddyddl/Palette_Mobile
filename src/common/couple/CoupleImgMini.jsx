import styled from "styled-components";
import manprofile from "../../img/commonImg/남자프사.jpg";
import womanprofile from "../../img/commonImg/여자프사.jpg";
import heart from "../../img/commonImg/heart.png";
import { useEffect, useState } from "react";
import MainAxios from "../../axiosapi/MainAxios";
import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";

const Contain = styled.div`
  width: 60vw; // 150px / 1920 * 100
  height: 15vh; // 150px / 953 * 100
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileDiv = styled.div`
  width: 100%;
  height: 100%;
  width: flex;
  height: flex;
`;

const ProfileImgDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeartDiv = styled.div`
  width: 70px;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Heart = styled.div`
  width: 23px;
  height: 2.4vh;
  background-image: url(${heart});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const Profile = styled.div`
  width: 50%;
  height: 50%;
  background-image: ${({ imageurl }) => `url(${imageurl})`};
  background-size: cover;
  background-position: center;
  border-radius: 50%;
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
`;

const CoupleImg = () => {
  // 커플 닉네임 저장
  const [coupleNickName, setCoupleNickName] = useState(["", ""]);
  const imgUrl = sessionStorage.getItem("imgUrl");
  const myDarling = sessionStorage.getItem("myDarling");
  const coupleName = sessionStorage.getItem("coupleName");
  const email = sessionStorage.getItem("email");
  useEffect(() => {
    const fetchData = async () => {
      const getCoupleName = await MemberAxiosApi.renderCoupleNameSearch(email);
      if (coupleName === getCoupleName.data) {
        await coupleNickNameAxios(email);
      }
    };
    fetchData();
  }, []);
  //세션 커플이름이 바뀌었을 경우
  useEffect(() => {
    const fetchData = async (coupleNameData) => {
      try {
        const getCoupleName = await MemberAxiosApi.renderCoupleNameSearch(
          email
        );
        // 방문했을 경우에만 해당 로직을 수행합니다.
        console.log("본인의 커플이름 :" + getCoupleName.data);
        console.log("현재 커플 이름:" + coupleNameData);
        if (getCoupleName.data !== coupleNameData) {
          // 커플이름에 해당하는 첫 번째 이메일을 검색하고 저장합니다.
          const firstEmailResponse = await MemberAxiosApi.firstEmailGet(
            coupleNameData
          );
          const firstEmail = firstEmailResponse.data; // 예시에서는 firstEmailResponse에서 실제 데이터를 얻어오는 방법으로 수정해야 합니다.
          // 첫 번째 이메일을 사용하여 다른 비동기 작업을 진행합니다.
          await Promise.all([coupleNickNameAxios(firstEmail)]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(coupleName);
  }, [coupleName]);

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
          <Profile imageurl={imgUrl} />
        </ProfileImgDiv>
        <Text>{coupleNickName[0] || "알콩"}</Text>
      </ProfileDiv>
      <HeartDiv>
        <Heart />
      </HeartDiv>
      <ProfileDiv>
        <ProfileImgDiv>
          <Profile imageurl={myDarling} />
        </ProfileImgDiv>
        <Text>{coupleNickName[1] || "달콩"}</Text>
      </ProfileDiv>
    </Contain>
  );
};

export default CoupleImg;
