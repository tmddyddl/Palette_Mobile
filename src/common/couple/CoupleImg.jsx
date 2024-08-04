import styled from "styled-components";
import manprofile from "../../img/commonImg/남자프사.jpg";
import womanprofile from "../../img/commonImg/여자프사.jpg";
import heart from "../../img/commonImg/heart.png";
import MainAxios from "../../axiosapi/MainAxios";
import { useEffect, useState } from "react";
import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";
import { profileStorage } from "../../firebase/ProfileImgUpload";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const Contain = styled.div`
  width: ${({ clothes }) => (clothes ? "100%" : "350px")};
  height: 100%;
  margin-right: 1.5%;
  display: flex;
  justify-content: ${({ clothes }) => (clothes ? "space-between" : "center")};
  align-items: center;
`;
const ProfileDiv = styled.div`
  width: ${({ clothes }) => (clothes ? "100%" : "211px")};
  height: ${({ clothes }) => (clothes ? "100%" : "20vh")};
  display: ${({ clothes }) => (clothes ? "flex" : "block")};
  flex-direction: ${({ direction }) => (direction ? "row-reverse" : "row")};
  justify-content: space-evenly;
`;
const ProfileImgDiv = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const HeartDiv = styled.div`
  width: 8vw;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Heart = styled.div`
  width: 200px;
  height: 200px;
  background-image: url(${heart});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;
const Profile = styled.div`
  width: 80px;
  height: 80px;
  background-image: ${({ imageurl }) =>
    `url(${imageurl ? imageurl : manprofile})`};
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  position: absolute;
`;
const TextDiv = styled.div`
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Text = styled.div`
  width: ${({ clothes }) => (clothes ? "20%" : "100%")};
  height: ${({ clothes }) => (clothes ? "5vh" : "6.345vh")};
  background-color: ${({ clothes }) => (clothes ? "#feeee8" : "none")};
  border-radius: ${({ clothes }) => (clothes ? "8px" : "none")};
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: #000;
  @media screen and (max-height: 575px) {
    display: none;
  }
`;

const ProfileCover = styled.div`
  width: 80px;
  height: 80px;
  background-color: transparent;
  border-radius: 50%;
  position: relative;
  display: ${({ clothes }) => (clothes ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const Label = styled.label`
  cursor: pointer;
  width: 18vw;
  height: 25px;
  display: none;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  font-size: 10px;
  ${ProfileCover}:hover & {
    display: flex;
  }
`;

const Input = styled.input`
  display: none;
`;

const CoupleImg = ({ clothes = false }) => {
  const [coupleNickName, setCoupleNickName] = useState(["", ""]);
  const [imgUrl, setImgUrl] = useState();
  const [myDarling, setMyDarling] = useState();
  const [isMyHome, setIsMyHome] = useState(true);
  const coupleName = sessionStorage.getItem("coupleName");
  //카카오 로그인시 프로필 자동 변경
  const kakaoProfileUrl = sessionStorage.getItem("kakaoImgUrl");
  const email = sessionStorage.getItem("email");

  //카카오 프로필 사진저장 비동기 함수
  const kakaoProfileImgAxios = async (emailvalue, kakaoProfile) => {
    const res = await MemberAxiosApi.profileUrlSave(emailvalue, kakaoProfile);
    if ((kakaoProfileUrl !==null && kakaoProfile !=="")&& res.data) {
      setImgUrl(kakaoProfile);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      if (kakaoProfileUrl !==null && kakaoProfileUrl !=="") {
        await kakaoProfileImgAxios(email, kakaoProfileUrl);
      }
      const getCoupleName = await MemberAxiosApi.renderCoupleNameSearch(email);
      if (coupleName === getCoupleName.data) {
        setIsMyHome(true);
        await coupleNickNameAxios(email);
        await getUserSex();
        await coupleProfileAxios(getCoupleName.data, email);
      }
    };
    fetchData();
  }, []);
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
          setIsMyHome(false);
          // 커플이름에 해당하는 첫 번째 이메일을 검색하고 저장합니다.
          const firstEmailResponse = await MemberAxiosApi.firstEmailGet(
            coupleNameData
          );
          const firstEmail = firstEmailResponse.data; // 예시에서는 firstEmailResponse에서 실제 데이터를 얻어오는 방법으로 수정해야 합니다.
          // 첫 번째 이메일을 사용하여 다른 비동기 작업을 진행합니다.
          await Promise.all([
            coupleNickNameAxios(firstEmail),
            coupleProfileAxios(coupleNameData, email),
          ]);
          console.log("isMyHome 상태 확인:",isMyHome);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(coupleName);
  }, [coupleName]);

  //파일 업로드 이벤트 함수
  const AddImgBtnOnChangeHandler = (e) => {
    const selectedFile = e.target.files[0];
    console.log("파일 경로 : ", selectedFile);
    // 선택된 파일을 즉시 업로드 후 DB에 다시 저장
    handleFileUpload(email, selectedFile);
  };

  const handleFileUpload = async (userEmail, saveFileData) => {
    const storageRef = ref(profileStorage, saveFileData.name);
    try {
      // 이미지 업로드
      await uploadBytesResumable(storageRef, saveFileData);
      console.log("File uploaded successfully!");

      // 이전 이미지가 있는 경우 삭제
      if (imgUrl && imgUrl !=="") {
        try {
          const oldFileRef = ref(profileStorage, imgUrl);
          await deleteObject(oldFileRef);
          console.log("Previous file deleted successfully!");
        } catch (error)   {
          console.error("Error deleting previous file:", error);
          // 이전 파일이 이미 삭제된 경우라도 진행합니다.
        }
      }

      // 이미지 다운로드 및 저장
      const url = await getDownloadURL(storageRef);
      if (url) {
        setImgUrl(url);
        sessionStorage.setItem("imgUrl", url);
        const res = await MemberAxiosApi.profileUrlSave(userEmail, url);
        if (res.data === true) console.log("DB에 저장되었습니다.");
        else console.log("DB 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("File upload failed:", error);
    }
  };

  // 커플 이미지 DB에서 불러오기
  const coupleProfileAxios = async (coupleNameData, emailData) => {
    const res = await MemberAxiosApi.coupleProfileUrl(
      coupleNameData,
      emailData
    );
    console.log("CoupleNameData좀 보자", coupleNameData);
    console.log("emailData보자", emailData);
    console.log("커플 두사람의 profileImgUrl:", res.data);
    if (res.data[0]) {
      setImgUrl(res.data[0]);
      sessionStorage.setItem("imgUrl", res.data[0]);
    }
    if (res.data[1]) {
      setMyDarling(res.data[1]);
      sessionStorage.setItem("myDarling", res.data[1]);
    }
  };
   //사용자의 기본 이미지 저장하기
   const getUserSex = async () => {
    try {
      // 사용자의 성별 가져오기
      const res = await MainAxios.mySexSearch(email);
      console.log("Sex:", res.data);
      // 이미지가 존재하는 확인
      const existUrl = await MemberAxiosApi.searchProfileUrl(email);
      console.log("내 프로필 이미지:", existUrl.data);
      const isCoupleTrue = await MemberAxiosApi.isCoupleTrue(coupleName);
      if (
        (existUrl.data === null ||
          existUrl.data === "" ||
          existUrl.data === "notExist") &&
        res.data === "Man"
      ) {
        const resMan = await MemberAxiosApi.profileUrlSave(email, manprofile);
     
        console.log(resMan.data);
      } else if (
        (existUrl.data === null ||
          existUrl.data === "" ||
          existUrl.data === "notExist") &&
        res.data === "Woman"
      ) {
        const resWoman = await MemberAxiosApi.profileUrlSave(
          email,
          womanprofile
        );
        if (!(isCoupleTrue.data)) {
          sessionStorage.setItem("myDarling", manprofile);
        }
        console.log(resWoman.data);
      }
      if (!(isCoupleTrue.data)&&
      res.data === "Man") {
        sessionStorage.setItem("myDarling", womanprofile);
      }
      if (!(isCoupleTrue.data)&&
      res.data === "Woman") {
        sessionStorage.setItem("myDarling", manprofile);
      }
    } catch (error) {
      console.error(
        "An error occurred while fetching user sex or saving profile URL:",
        error
      );
    }
  };
  return (
    <Contain clothes={clothes}>
      <ProfileDiv clothes={clothes}>
        <ProfileImgDiv clothes={clothes}>
          <Profile imageurl={imgUrl}>
            {isMyHome && (
              <ProfileCover clothes={clothes}>
                <Label htmlFor="fileInput">Choose File</Label>
                <Input
                  id="fileInput"
                  type="file"
                  clothes={clothes}
                  onChange={AddImgBtnOnChangeHandler}
                />
              </ProfileCover>
            )}
          </Profile>
        </ProfileImgDiv>
        <TextDiv>
          <Text clothes={clothes}>{coupleNickName[0] || "알콩"}</Text>
        </TextDiv>
      </ProfileDiv>
      <HeartDiv>
        <Heart />
      </HeartDiv>
      <ProfileDiv clothes={clothes} direction={true}>
        <ProfileImgDiv clothes={clothes}>
          <Profile imageurl={myDarling} />
        </ProfileImgDiv>
        <TextDiv>
          <Text clothes={clothes}>{coupleNickName[1] || "달콩"}</Text>
        </TextDiv>
      </ProfileDiv>
    </Contain>
  );
};

export default CoupleImg;
