import styled from "styled-components";
import MainAxios from "../../axiosapi/MainAxios";
import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";
import { useEffect, useState } from "react";

const Dday = styled.div`
  width: 80%;
  height: 10vh;
  font-size: ${({ isDday }) => (isDday ? "40px" : "30px")};
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1200px) {
    font-size: ${({ isDday }) => (isDday ? "30px" : "20px")};
  }
  @media screen and (max-width: 768px) {
    font-size: ${({ isDday }) => (isDday ? "20px" : "15px")};
  }
`;

const DdayWhen = styled.div`
  width: 30%;
  font-size: 15px;
  display: flex;
  justify-content: end;
  margin-right: 2px;
`;

const DdayInputForm = styled.input`
  width: 50%;
  height: 25px;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
`;

const DdayInputDiv = styled.div`
  width: 90%;
  height: auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  & > label {
    color: #fff;
  }
  & > .day {
    color: #fff;
  }
  @media screen and (max-width: 1200px) {
    font-size: 15px;
  }
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const DDayInputBtn = styled.div`
  width: 80%;
  height: 3vh;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #000;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const ButtonDiv = styled.div`
  width: 20%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoupleDday = ({ isMyHome }) => {
  const coupleName = sessionStorage.getItem("coupleName");
  const [isDday, setIsDday] = useState();
  const [saveCoupleName, setSaveCoupleName] = useState("");
  const [saveDday, setSaveDday] = useState("");
  const [isCoupleName, setIsCoupleName] = useState(false);
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    dDayAxois();
  }, [saveDday, coupleName, isMyHome]);

  // 디데이 값을 가져오는 비동기 함수
  const dDayAxois = async () => {
    // 이메일로 커플 이름 search
    const loginCoupleName = await MemberAxiosApi.renderCoupleNameSearch(email);
    console.log("5. 이메일로 커플 이름 서치", loginCoupleName.data);
    setSaveCoupleName(loginCoupleName.data);
    console.log("6. 커플 이름 저장", loginCoupleName.data);
    // Dday 값 가져오기
    console.log("이거이거" + coupleName);
    const resDday = await MainAxios.searchDday(coupleName);
    console.log("7. 디데이 가져오기", resDday.data);
    if (resDday.data !== "") {
      setIsDday(true);
      setSaveDday(resDday.data);
      console.log("if 실행");
    } else {
      setIsDday(false);
      console.log("else 실행");
    }
  };
  // 디데이 입력
  const dDayInputOnchangeHandler = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    const timeDifference = today - selectedDate;
    const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    setSaveDday(dayDifference);
    console.log("1 디데이 입력", dayDifference);
  };

  // 디데이 값을 저장하는 함수
  const dDaySaveOnclickHandler = () => {
    dDaySaveAxios();
    console.log("2. 디데이 저장", dDaySaveAxios);
  };

  // 디데이 값을 저장하는 Axios 함수
  const dDaySaveAxios = async () => {
    const res = await MainAxios.saveDday(saveCoupleName, saveDday);
    setIsDday(!res.data);
    console.log("3. 디데이 테스트", !res.data);
    dDayAxois();
    console.log("4. 디데이 엑시오스 확인", dDayAxois);
  };

  console.log("isMyHome : " + isMyHome);
  console.log("isDday :" + isDday);

  return (
    <DdayInputDiv>
      {isMyHome ? (
        isDday ? (
          <Dday isDday={isDday}>사귄지 {saveDday}일째!</Dday>
        ) : (
          <Dday isDday={isDday} isMyHome={isMyHome}>
            <DdayWhen>사귄날짜 : </DdayWhen>
            <DdayInputForm
              type="date"
              onChange={dDayInputOnchangeHandler}
            ></DdayInputForm>
            <ButtonDiv>
              <DDayInputBtn onClick={dDaySaveOnclickHandler}>입력</DDayInputBtn>
            </ButtonDiv>
          </Dday>
        )
      ) : (
        isDday && <Dday isDday={isDday}>사귄지 {saveDday}일째!</Dday>
      )}
    </DdayInputDiv>
  );
};

export default CoupleDday;
