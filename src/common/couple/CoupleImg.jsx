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
  height: ${({ clothes }) => (clothes ? "100%" : "23vh")};
  display: ${({ clothes }) => (clothes ? "flex" : "block")};
  flex-direction: ${({ direction }) => (direction ? "row-reverse" : "row")};
  justify-content: space-evenly;
`;
const ProfileImgDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  /* background-color: ${({ clothes }) => (clothes ? "lightblue" : "none")}; */
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

const Text = styled.div`
  width: ${({ clothes }) => (clothes ? "20%" : "8vw")};
  height: ${({ clothes }) => (clothes ? "7vh" : "7.345vh")};
  background-color: ${({ clothes }) => (clothes ? "white" : "none")};
  border-radius: ${({ clothes }) => (clothes ? "8px" : "none")};
  border: ${({ clothes }) => (clothes ? "1px solid gray" : "none")};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: ${({ clothes }) => (clothes ? "#000" : "#fff")};
  @media screen and (max-width: 1200px) {
    height: ${({ clothes }) => (clothes ? "2.5vh" : "7.345vh")};
    font-size: 14px;
  }
  @media screen and (max-width: 768px) {
    height: ${({ clothes }) => (clothes ? "2vh" : "7.345vh")};
    font-size: 12px;
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

const CoupleImg = ({ clothes = false, isMyHome }) => {
  const [coupleNickName, setCoupleNickName] = useState(["", ""]);
  const [imgUrl, setImgUrl] = useState();
  const [myDarling, setMyDarling] = useState();
  const email = sessionStorage.getItem("email");
  const coupleName = sessionStorage.getItem("coupleName");
  const [IsExistImg, setIsExistImg] = useState([false, false]);
  const [saveFirstEmail, setSaveFirstEmail] = useState("");

  //카카오 로그인시 프로필 자동 변경
  const kakaoProfileUrl = sessionStorage.getItem("kakaoImgUrl");
  //카카오 프로필 사진저장 비동기 함수
  const kakaoProfileImgAxios = async (emailvalue, kakaoProfile) => {
    const res = await MemberAxiosApi.profileUrlSave(emailvalue, kakaoProfile);
    if (kakaoProfileUrl && res.data) {
      setImgUrl(kakaoProfile);
    }
  };
  useEffect(() => {
    if (kakaoProfileUrl !== null) {
      kakaoProfileImgAxios(email, kakaoProfileUrl);
    }
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
        console.log("커플이름 :" + coupleNameData);
        // 커플이름에 해당하는 첫 번째 이메일을 검색하고 저장합니다.
        const firstEmailResponse = await MemberAxiosApi.firstEmailGet(
          coupleNameData
        );
        const firstEmail = firstEmailResponse.data; // 예시에서는 firstEmailResponse에서 실제 데이터를 얻어오는 방법으로 수정해야 합니다.
        setSaveFirstEmail(firstEmail);
        // 첫 번째 이메일을 사용하여 다른 비동기 작업을 진행합니다.
        await Promise.all([
          coupleNickNameAxios(firstEmail),
          coupleProfileAxios(coupleNameData, email),
        ]);
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
      if (imgUrl) {
        try {
          const oldFileRef = ref(profileStorage, imgUrl);
          await deleteObject(oldFileRef);
          console.log("Previous file deleted successfully!");
        } catch (error) {
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
    sessionStorage.setItem("imgUrl", manprofile);
    sessionStorage.setItem("myDarling", womanprofile);

    console.log(res.data);

    if (res.data[0]) {
      setImgUrl(res.data[0]);
      setIsExistImg((prevState) => [true, prevState[1]]); // 첫 번째 요소를 true로 업데이트
      sessionStorage.setItem("imgUrl", res.data[0]);
    }
    if (res.data[1]) {
      setMyDarling(res.data[1]);
      setIsExistImg((prevState) => [prevState[0], true]); // 두 번째 요소를 true로 업데이트
      sessionStorage.setItem("myDarling", res.data[1]);
    }
  };

  return (
    <Contain clothes={clothes}>
      <ProfileDiv clothes={clothes}>
        <ProfileImgDiv clothes={clothes}>
          <Profile imageurl={IsExistImg[0] ? imgUrl : manprofile}>
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
        <Text clothes={clothes}>{coupleNickName[0] || "알콩"}</Text>
      </ProfileDiv>
      <HeartDiv>
        <Heart />
      </HeartDiv>
      <ProfileDiv clothes={clothes} direction={true}>
        <ProfileImgDiv clothes={clothes}>
          <Profile imageurl={IsExistImg[1] ? myDarling : womanprofile} />
        </ProfileImgDiv>
        <Text clothes={clothes}>{coupleNickName[1] || "달콩"}</Text>
      </ProfileDiv>
    </Contain>
  );
};

export default CoupleImg;
