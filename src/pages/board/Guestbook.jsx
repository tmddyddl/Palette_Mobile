import styled from "styled-components";
import { useState, useEffect } from "react";
import manprofile from "../../img/commonImg/남자프사.jpg";
import GuestbookAxios from "../../axiosapi/GuestbookAxios";
import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";

const GuestbookSide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const GuestbookTitle = styled.div`
  margin-top: 2.5vh;
  width: 100%;
  height: 5vh;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1200px) {
    height: 3vh;
    font-size: 16px;
  }
  @media screen and (max-width: 768px) {
    height: 1vh;
    font-size: 12px;
  }
`;
const GuestbookGrayBar = styled.div`
  margin-top: 1.5vh;
  width: 90%;
  height: 0.5%;
  background-color: #b0b0b0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const GuestbookWriteArea = styled.div`
  margin-top: 2vh;
  width: 400px;
  height: 10vh;
  border: 1px solid black;
  background-color: #eccdb0;
  @media screen and (max-width: 1200px) {
    width: 350px;
    height: 9vh;
  }
  @media screen and (max-width: 768px) {
    width: 230px;
    height: 6vh;
  }
`;
const GuestbookWriteMain = styled.div`
  margin-left: 1vw;
  width: 75%;
  height: 100%;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  justify-content: right;
  align-items: center;
`;
const GuestbookInput = styled.textarea`
  width: 100%;
  height: 95%;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 13px;
  resize: none;
  overflow-y: aute;
  @media screen and (max-width: 1200px) {
    font-size: 12px;
  }
  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;
const GuestbookWriteButton = styled.div`
  margin-top: 0.1vh;
  margin-left: 60%;
  width: 80px;
  height: 2vh;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  justify-content: right;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: blue;
  }
  @media screen and (max-width: 1200px) {
    font-size: 11px;
  }
  @media screen and (max-width: 768px) {
    font-size: 8px;
  }
`;
const GuestbookList = styled.div`
  width: 420px;
  margin-right: 13px;
  height: 60%;
  overflow-y: auto; /* 세로 스크롤 추가 */
  overflow-x: hidden;
  @media screen and (max-width: 1200px) {
    width: 380px;
  }
  @media screen and (max-width: 768px) {
    width: 250px;
    height: 55%;
  }
`;
const GuestbookArea = styled.div`
  margin-top: 2vh;
  margin-left: 16px;
  background-color: #eccdb0;
  width: 400px;
  height: 12vh;
  border: 1px solid black;

  @media screen and (max-width: 1200px) {
    width: 355px;
    height: 10vh;
  }
  @media screen and (max-width: 768px) {
    margin-top: 1vh;
    width: 230px;
    height: 6vh;
  }
`;
const GuestbookHead = styled.div`
  height: 25%;
  background-color: #cdcfc4;
  border-bottom: 1px solid black;
  display: flex;
`;
const GuestbookNo = styled.div`
  width: 10%;
  height: 100%;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    font-size: 11px;
  }
`;
const GuestbookNickname = styled.div`
  width: 25%;
  height: 100%;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: blue;
  }
  @media screen and (max-width: 768px) {
    font-size: 11px;
  }
`;
const GuestbookDate = styled.div`
  width: 50%;
  height: 100%;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    font-size: 11px;
  }
`;
const GuestbookDelete = styled.div`
  width: 15%;
  height: 100%;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: blue;
  }
  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;
const GuestbookWriteBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
const GuestbookBody = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
`;
const GuestbookImage = styled.div`
  width: 23%;
  height: 100%;
  background-image: ${({ imageurl }) => `url(${imageurl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
const GuestWriteImg = styled.div`
  width: 23%;
  height: 99%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const GuestbookMain = styled.div`
  width: 80%;
  height: 100%;
  font-size: 12px;
  font-weight: 600;
  padding-left: 3%;
  display: flex;
  justify-content: first baseline;
  align-items: center;
  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const Guestbook = ({}) => {
  const [newEntry, setNewEntry] = useState("");
  // 방명록 관련
  const [guestbookEntries, setGuestbookEntries] = useState([]);
  const coupleName = sessionStorage.getItem("coupleName");
  const email = sessionStorage.getItem("email");
  // 내 방이면 true 아니면 false
  const [isMyHome, setIsMyHome] = useState(true);
  const [imgUrl, setImgUrl] = useState("");
  // 이메일로 프로필 이미지 가져오기
  const profileImgAxios = async () => {
    const res = await MemberAxiosApi.searchProfileUrl(email);
    console.log("방명록 글쓴이 프로필 : " + res.data);
    if ((res.data !== "") | (res.data !== null)) {
      setImgUrl(res.data);
    }
  };

  useEffect(() => {
    const fetchGuestbookEntries = async () => {
      try {
        const data = await GuestbookAxios.getGuestBookEntries(coupleName);
        console.log("커푸루이름 방명록에서 확인", coupleName);
        console.log("data", data);
        console.log("설마 이메일도?:" + data.data);

        setGuestbookEntries(data);
      } catch (error) {
        console.log("방명록 가져오기 실패", error);
      }
    };
    fetchGuestbookEntries();
    //방명록 작성 보일지 말지!
    isMyHomeAxios();
    // // 이메일로 프로필 이미지 불러오기
    profileImgAxios();
  }, []);

  const handleAddEntry = async () => {
    if (!newEntry.trim()) return; // 입력값이 없으면 처리하지 않음
    try {
      const addedEntry = await GuestbookAxios.addGuestBookEntry({
        contents: newEntry, // 실제 입력된 내용을 사용
        memberEmail: email, // sessionStorage에서 가져온 이메일 사용
        coupleName: coupleName, // sessionStorage에서 가져온 커플 이름 사용
      });
      console.log("newentry", newEntry);

      setGuestbookEntries([...guestbookEntries, addedEntry]); // 새 항목을 기존 목록에 추가
      setNewEntry(""); // 입력 필드 초기화
    } catch (error) {
      console.error("Failed to add guestbook entry:", error); // 오류 처리
    }
  };

  const handleDeleteEntry = async (entryId) => {
    try {
      await GuestbookAxios.deleteGuestBookEntry(entryId, email);
      setGuestbookEntries(
        guestbookEntries.filter((entry) => entry.id !== entryId)
      );
    } catch (error) {
      alert("작성자가 다른 게시물 입니다.");
      console.error("Failed to delete guestbook entry:", error);
    }
  };
  console.log("entry확인", guestbookEntries);
  //방문자만 방명록 쓰는 부분이 보이도록 하는 함수
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
  return (
    <GuestbookSide>
      <GuestbookTitle>방명록</GuestbookTitle>
      <GuestbookGrayBar />
      {!isMyHome && (
        <>
          <GuestbookWriteArea>
            <GuestbookWriteBody>
              <GuestbookImage
                imageurl={imgUrl ? imgUrl : manprofile}
              ></GuestbookImage>
              <GuestbookWriteMain>
                <GuestbookInput
                  value={newEntry}
                  onChange={(e) => setNewEntry(e.target.value)}
                  placeholder="내용을 입력하세요."
                />
              </GuestbookWriteMain>
            </GuestbookWriteBody>
          </GuestbookWriteArea>

          <GuestbookWriteButton onClick={handleAddEntry}>
            방명록 등록
          </GuestbookWriteButton>
        </>
      )}
      <GuestbookList>
        {guestbookEntries.map((entry, index) => (
          <GuestbookArea key={entry.id}>
            <GuestbookHead>
              <GuestbookNo>{index + 1}</GuestbookNo>
              <GuestbookNickname>{entry.memberNickName}</GuestbookNickname>
              <GuestbookDate>
                {new Date(entry.regDateTime).toLocaleDateString()}
              </GuestbookDate>
              <GuestbookDelete onClick={() => handleDeleteEntry(entry.id)}>
                삭제
              </GuestbookDelete>
            </GuestbookHead>
            <GuestbookBody>
              <GuestWriteImg
                style={{ backgroundImage: `url(${entry.imgUrl})` }}
              />
              <GuestbookMain>{entry.contents}</GuestbookMain>
            </GuestbookBody>
          </GuestbookArea>
        ))}
      </GuestbookList>
    </GuestbookSide>
  );
};

export default Guestbook;
