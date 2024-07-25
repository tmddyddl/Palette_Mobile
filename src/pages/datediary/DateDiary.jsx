import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import "moment/locale/ko";
import soleModalImg from "../../img/commonImg/전구 아이콘.gif";
import AxiosApi from "../../axiosapi/DiaryAxiosApi";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import MainAxios from "../../axiosapi/MainAxios";

// 한국어 locale 설정
moment.locale("ko");

// Styled components
const StyledCalendarWrapper = styled.div`
  width: 90%;
  height: 95%;
  display: flex;
  justify-content: center;
  position: relative;

  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 0.5rem;
    padding: 2% 2%;
    background-color: #fff9f2;
    border: 1px solid #696969;
  }

  /* 전체 폰트 컬러 */
  .react-calendar__month-view {
    abbr {
      color: black;
    }
  }

  /* 네비게이션 가운데 정렬 */
  .react-calendar__navigation {
    justify-content: center;
    background-color: #feeee8;
    height: 35px;
    margin-bottom: 8px;
  }

  /* 네비게이션 폰트 설정 */
  .react-calendar__navigation button {
    font-weight: 800;
    font-size: 15px;
  }

  /* 네비게이션 버튼 컬러 */
  .react-calendar__navigation button:focus {
    background-color: #fff9f2;
  }

  /* 네비게이션 비활성화 됐을때 스타일 */
  .react-calendar__navigation button:disabled {
    background-color: #fff9f2;
    color: #444444;
  }

  /* 년/월 상단 네비게이션 칸 크기 줄이기 */
  .react-calendar__navigation__label {
    flex-grow: 0 !important;
  }

  /* 요일 밑줄 제거 */
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
  }

  /* 일요일에만 빨간 폰트 */
  .react-calendar__month-view__weekdays__weekday {
    background-color: #feeee8;
  }
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
    color: #cd0a0a;
  }
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="토요일"] {
    color: royalblue;
  }

  /* 오늘 날짜 폰트 컬러 */
  .react-calendar__tile--now {
    background-color: #feeee8;
    border-radius: 0.3rem;
    /* abbr {
      color: #ffffff;
    } */
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    border-radius: 0.3rem;
    background-color: #feeee8;
    padding: 10;
    &:hover {
      background-color: whitesmoke;
    }
  }

  /* 네비게이션 현재 월 스타일 적용 */
  .react-calendar__tile--hasActive {
    background-color: #e3e3e3;
    abbr {
      color: black;
    }
  }

  /* 일 날짜 간격 */
  .react-calendar__tile {
    top: 6px;
    padding: 11px 0vw 11px;
    position: relative;
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    flex: 0 0 calc(33.3333% - 10px) !important;
    margin-inline-start: 5px !important;
    margin-inline-end: 5px !important;

    /* background-color: #a1bae7; */
    margin-block-end: 5px;
    padding: 22px 6px;
    font-size: 0.9rem;
    font-weight: 600;
    color: black;
  }

  .react-calendar__tile:enabled:hover {
    background-color: whitesmoke;
    border-radius: 0.3rem;
  }

  /* 선택한 날짜 스타일 적용 */
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    border-radius: 0.3rem;
    background-color: #d8e3f8;
  }
`;

const StyledCalendar = styled(Calendar)``;

const StyledBorder = styled.div`
  border-radius: 0.3rem;
  border: 0.2rem solid #feeee8;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
`;

const StyledDate = styled.div`
  position: absolute;
  right: 7%;
  top: 4%;
  background-color: #fff9f2;
  color: black;
  width: 10%;
  height: 1.5rem;
  text-align: center;
  line-height: 1.6rem;
  border-radius: 10px;
  font-size: 0.6rem;
  font-weight: 800;
`;

const StyledAnniversary = styled.div`
  font-size: 0.43rem;
  color: royalblue;
  font-weight: 600;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledDot = styled.div`
  background-color: brown;
  border-radius: 50%;
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-35%);
`;

const BookContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

const BookTheme = styled.div`
  width: 100%;
  height: 37.5vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BookTheme2 = styled.div`
  width: 100%;
  height: 37.5vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BoardWrapper = styled.div`
  width: 90%;
  height: 95%;
  background-color: #fff9f2;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #696969;
`;

const DiaryBoard = styled.div`
  width: 95%;
  height: 95%;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  background-color: #feeee8;
`;

const LineUp = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
`;

const LineDown = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  align-items: center;
  background-color: #feeee8;
  border-top: 5px solid #fff9f2;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  justify-content: center;
  flex-direction: column;
`;

const PicDate = styled.div`
  width: 50%;
  height: 90%;
  font-size: 14px;
  padding-top: 1%;
  display: flex;
  margin-left: 3%;
  align-items: flex-end;
  justify-content: flex-start;
`;

const DdayWe = styled.div`
  width: 50%;
  height: 90%;
  font-size: 12px;
  padding-top: 1%;
  display: flex;
  margin-right: 3%;
  align-items: flex-end;
  justify-content: flex-end;
`;

const BoardTitle = styled.div`
  width: 90%;
  height: 6%;
  font-size: 10px;
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: 800;
`;

const MemoInput = styled.textarea`
  width: 90%;
  height: 60%;
  margin-top: 0.5rem;
  padding: 0.5rem;
  font-size: 12px;
  border: none;
  border-radius: 0.5rem;
  background-color: #fff9f2;
  resize: none;
  outline: none; /* 외곽선 색상 설정 (선택 사항) */
  overflow: hidden;
`;
const ButtonWrap = styled.div`
  width: 90%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SaveButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 8px;
  margin-top: 2px;
  margin-bottom: 2px;
  border: none;
  border-radius: 0.5rem;
  background-color: #feeee8;
  cursor: pointer;
  &:hover {
    background-color: #fff9f2;
  }
`;
const ClearButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 8px;
  margin-top: 2px;
  margin-bottom: 2px;
  border: none;
  border-radius: 0.5rem;
  background-color: #feeee8;
  cursor: pointer;
  &:hover {
    background-color: #fff9f2;
  }
`;
const EditButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 8px;
  margin-top: 2px;
  margin-bottom: 2px;
  border: none;
  border-radius: 0.5rem;
  background-color: #feeee8;
  cursor: pointer;
  &:hover {
    background-color: #fff9f2;
  }
`;

const NewButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 20px;
  color: darkgray;
  border: 1px solid darkgray;
  border-radius: 100rem;
  background-color: #fff9f2;
  cursor: pointer;
  &:hover {
    background-color: #feeee8;
  }
`;

const CheckboxWrapper = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
`;

const EventInput = styled.input`
  width: 90%;
  height: 17px;
  margin-left: 0.5rem;
  padding: 0.2rem;
  font-size: 9px;
  border: solid #fff9f2;
  border-radius: 0.3rem;
  background-color: #fff9f2;
  outline: none;
`;

const AnniversaryInput = styled.input`
  width: 90%;
  height: 20px;
  margin-top: 0.5rem;
  padding: 0.2rem;
  font-size: 9px;
  border: solid #fff9f2;
  border-radius: 0.3rem;
  background-color: #fff9f2;
  outline: none;
`;

const AddButton = styled.button`
  padding: 0.2rem 0.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.3rem;
  background-color: #feeee8;
  cursor: pointer;
  &:hover {
    background-color: #fff9f2;
  }
`;

const CustomCheckbox = styled.input`
  /* 체크박스 커스텀 */
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #a1bae7;
  background-color: #fff9f2;
  border-radius: 4px;
  margin-right: 6px;
  cursor: pointer;

  &:checked {
    background-color: #92a9d3; /* 체크된 상태의 배경색 */
    border-color: #a1bae7;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 3px darkgray; /* 포커스 시 테두리 스타일 */
  }
`;

const RemoveButton = styled.button`
  margin-left: 0.5rem;
  padding: 0.2rem 0.6rem;
  font-size: 1vw;
  border: none;
  border-radius: 0.3rem;
  background-color: #feeee8;
  cursor: pointer;
  &:hover {
    background-color: #fff9f2;
  }
`;

const DateDiary = () => {
  const today = new Date();
  //디데이 상태저장
  const [isDday, setIsDday] = useState();
  //디데이 값 저장
  const [saveDday, setSaveDday] = useState("");
  const navigator = useNavigate();
  const [date, setDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(today); // 1. 선택한 날짜 데이터
  const [anniversaryText, setAnniversaryText] = useState(); //2. 기념일 텍스트 상태
  const [events, setEvents] = useState([{ isEvent: false, eventText: "" }]); // 3. 일정 체크 여부 4. 일정 내용
  const [currentMemo, setCurrentMemo] = useState(""); // 5. 일기 작성 데이터
  const [isEditMode, setIsEditMode] = useState(false); // 읽기/쓰기 모드 상태
  const [anniversaries, setAnniversaries] = useState({}); // 기념일 상태
  const [memos, setMemos] = useState({});

  const attendDay = [""];
  const anniversaryDate = moment(today).subtract(saveDday, "days"); // 31일 전의 날짜를 anniversaryDate로 설정
  const SdaysTogether = moment(selectedDate).diff(anniversaryDate, "days") + 1;
  const memoTextAreaRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("잘못된 요청입니다.");
  const [modalType, setModalType] = useState(false);

  const userEmail = sessionStorage.getItem("email");
  const coupleName = sessionStorage.getItem("coupleName");

  const modalOkBtnHandler = () => {
    closeModal();
    navigator("/login-page");
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // 다이어리 불러오기
  useEffect(() => {
    const fetchCoupleDiaries = async () => {
      if (!userEmail) {
        setModalType(true);
        setModalOpen(true);
        setModalText("커플 등록 후 이용해주시기 바랍니다.");
        return;
      }

      try {
        const response = await AxiosApi.getCoupleDiaries(userEmail);
        const diaries = response.data;

        const memosData = {};
        const anniversariesData = {};

        diaries.forEach((diary) => {
          const formattedDate = moment(diary.anniversary).format("YYYY-MM-DD");
          memosData[formattedDate] = {
            memo: diary.contents,
            events: diary.events,
          };
          anniversariesData[formattedDate] = diary.dateContents;
        });

        setMemos(memosData);
        setAnniversaries(anniversariesData);
      } catch (error) {
        setModalOpen(true);
        setModalText("불러오기 오류가 발생하였습니다!");
      }
    };
    fetchCoupleDiaries();
  }, [userEmail]);

  // DDay 바꾸는 함수
  const dDayAxios = async () => {
    try {
      const resDday = await MainAxios.searchDday(coupleName);
      if (resDday.data !== "") {
        setIsDday(true);
        setSaveDday(resDday.data);
        console.log("if 실행");
      } else {
        setIsDday(false);
        console.log("else 실행");
      }
    } catch (error) {
      console.error("DDay 정보를 불러오는 중 에러 발생:", error);
    }
  };
  useEffect(() => {
    const memoData = memos[moment(selectedDate).format("YYYY-MM-DD")] || {};
    setCurrentMemo(memoData.memo || "");
    setEvents(memoData.events || []);
    setAnniversaryText(
      anniversaries[moment(selectedDate).format("YYYY-MM-DD")] || ""
    );
    setIsEditMode(false); // 날짜가 변경될 때마다 읽기 모드로 전환
  }, [selectedDate, memos, anniversaries]);

  useEffect(() => {
    dDayAxios();
    const memoTextArea = memoTextAreaRef.current;
    if (memoTextArea) {
      const handleWheel = (event) => {
        memoTextArea.scrollTop += event.deltaY;
      };
      memoTextArea.addEventListener("wheel", handleWheel);
      return () => {
        memoTextArea.removeEventListener("wheel", handleWheel);
      };
    }
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleTodayClick = () => {
    setActiveStartDate(today);
    setDate(today);
    setSelectedDate(today);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const memoData = memos[moment(date).format("YYYY-MM-DD")] || {};
    setCurrentMemo(memoData.memo || "");
    setEvents(memoData.events || [{ isEvent: false, eventText: "" }]);
    setAnniversaryText(anniversaries[moment(date).format("YYYY-MM-DD")] || "");
  };

  const handleMemoChange = (e) => {
    setCurrentMemo(e.target.value);
  };

  const handleEventChange = (index) => (e) => {
    const newEvents = [...events];
    newEvents[index].isEvent = e.target.checked;
    setEvents(newEvents);
  };

  const handleEventTextChange = (index) => (e) => {
    const newEvents = [...events];
    newEvents[index].eventText = e.target.value;
    setEvents(newEvents);
  };

  const handleAddEvent = () => {
    if (events.length < 5) {
      setEvents([...events, { isEvent: false, eventText: "" }]);
    }
  };

  const handleRemoveEvent = (index) => () => {
    const newEvents = [...events];
    newEvents.splice(index, 1);
    setEvents(newEvents);
  };

  const handleAnniversaryTextChange = (e) => {
    setAnniversaryText(e.target.value);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  // 다이어리 저장
  const handleMemoSave = async () => {
    const formattedSelectedDate = moment(selectedDate).format("YYYY-MM-DD");

    if (
      currentMemo.trim() === "" &&
      events.every((event) => !event.eventText.trim()) &&
      anniversaryText.trim() === ""
    ) {
      setModalOpen(true);
      setModalText("내용을 입력 해주세요 :)");
      return;
    }

    const saveData = {
      email: userEmail,
      anniversary: formattedSelectedDate,
      dateContents: anniversaryText,
      contents: currentMemo,
      events: events.map((event) => ({
        isEvent: event.isEvent,
        eventText: event.eventText,
      })),
    };

    console.log("Save Data:", saveData);

    try {
      const response = await AxiosApi.diaryReg(saveData);

      if (response.data) {
        setModalOpen(true);
        setModalText("저장이 완료되었습니다 :)");

        // 저장이 성공적으로 완료되었을 때 상태를 업데이트
        setMemos((prevMemos) => ({
          ...prevMemos,
          [formattedSelectedDate]: { memo: currentMemo, events },
        }));

        setAnniversaries((prevAnniversaries) => ({
          ...prevAnniversaries,
          [formattedSelectedDate]: anniversaryText,
        }));

        setIsEditMode(false); // 저장 후 읽기 모드로 전환
      } else {
        setModalOpen(true);
        setModalText("저장 실패 ㅠㅠ");
      }
    } catch (error) {
      console.error(error);
      setModalOpen(true);
      setModalText("저장 중 오류가 발생하였습니다!");
    }
  };

  // 다이어리 삭제
  const handleClear = async () => {
    const formattedSelectedDate = moment(selectedDate).format("YYYY-MM-DD");

    // 백엔드에 이메일과 날짜를 보내서 삭제
    try {
      const response = await AxiosApi.deleteDiary(
        userEmail,
        formattedSelectedDate
      );
      if (response.status === 200) {
        setMemos((prevMemos) => {
          const updatedMemos = { ...prevMemos };
          delete updatedMemos[formattedSelectedDate];
          return updatedMemos;
        });

        setAnniversaries((prevAnniversaries) => {
          const updatedAnniversaries = { ...prevAnniversaries };
          delete updatedAnniversaries[formattedSelectedDate];
          return updatedAnniversaries;
        });

        setModalOpen(true);
        setModalText("삭제가 완료 되었습니다 :)");
        setIsEditMode(false); // 삭제 후 읽기 모드로 전환
      } else {
        setModalOpen(true);
        setModalText("삭제 실패 ㅠㅠ");
      }
    } catch (error) {
      console.error("삭제 오류", error);
      setModalOpen(true);
      setModalText("저장 중 오류가 발생하였습니다!");
    }
  };

  return (
    <BookContainer>
      <BookTheme>
        <StyledCalendarWrapper>
          <StyledCalendar
            value={date}
            onChange={handleDateChange}
            onClickDay={handleDateClick}
            formatDay={(locale, date) => moment(date).format("D")}
            formatYear={(locale, date) => moment(date).format("YYYY")}
            formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
            calendarType="gregory"
            showNeighboringMonth={false}
            next2Label={null}
            prev2Label={null}
            minDetail="year"
            activeStartDate={
              activeStartDate === null ? undefined : activeStartDate
            }
            onActiveStartDateChange={({ activeStartDate }) =>
              setActiveStartDate(activeStartDate)
            }
            tileContent={({ date, view }) => {
              let html = [];
              const formattedDate = moment(date).format("YYYY-MM-DD");
              // if (
              //   view === "month" &&
              //   date.getMonth() === today.getMonth() &&
              //   date.getDate() === today.getDate()
              // ) {
              //   html.push(<StyledToday key={"today"}>오늘</StyledToday>);
              // }
              if (attendDay.includes(formattedDate)) {
                html.push(<StyledDot key={formattedDate} />);
              }
              if (memos[formattedDate]) {
                html.push(<StyledDot key={`memo-${formattedDate}`} />);
              }
              if (anniversaries[formattedDate]) {
                const displayText =
                  anniversaries[formattedDate].length > 5
                    ? anniversaries[formattedDate].substring(0, 5) + "..."
                    : anniversaries[formattedDate];
                html.push(
                  <StyledAnniversary key={`anniversary-${formattedDate}`}>
                    {displayText}
                  </StyledAnniversary>
                );
                html.push(
                  <StyledBorder key={`anniversary-${formattedDate}`} />
                );
              }
              return <div>{html.length > 0 ? html : null}</div>;
            }}
          />
          <StyledDate onClick={handleTodayClick}>오늘</StyledDate>
        </StyledCalendarWrapper>
      </BookTheme>
      <BookTheme2>
        <BoardWrapper>
          <DiaryBoard>
            <LineUp>
              <PicDate>
                {selectedDate ? moment(selectedDate).format("YYYY.MM.DD") : ""}
              </PicDate>
              {moment(selectedDate).isSame(anniversaryDate, "day") ? (
                <DdayWe>우리 처음 만난 날</DdayWe>
              ) : moment(selectedDate).isBefore(anniversaryDate) ? (
                <DdayWe>우리 만나기 전</DdayWe>
              ) : (
                <DdayWe>우리 만난 지 {SdaysTogether}일 째</DdayWe>
              )}
            </LineUp>
            <LineDown>
              {memos[moment(selectedDate).format("YYYY-MM-DD")] ||
              isEditMode ? (
                <>
                  <BoardTitle>[기념일]</BoardTitle>
                  <AnniversaryInput
                    value={anniversaryText}
                    onChange={handleAnniversaryTextChange}
                    placeholder="어떤 기념일인가요 ?"
                    readOnly={!isEditMode}
                  />
                  <BoardTitle>[오늘의 일정]</BoardTitle>
                  {events.map((event, index) => (
                    <CheckboxWrapper key={index}>
                      <CustomCheckbox
                        type="checkbox"
                        checked={event.isEvent}
                        onChange={handleEventChange(index)}
                      />
                      <EventInput
                        value={event.eventText}
                        onChange={handleEventTextChange(index)}
                        placeholder="일정을 입력하세요"
                        readOnly={!isEditMode}
                      />
                      {isEditMode && (
                        <RemoveButton onClick={handleRemoveEvent(index)}>
                          -
                        </RemoveButton>
                      )}
                    </CheckboxWrapper>
                  ))}
                  {isEditMode && events.length < 5 && (
                    <AddButton onClick={handleAddEvent}>+</AddButton>
                  )}
                  <BoardTitle>[오늘의 일기]</BoardTitle>
                  <MemoInput
                    ref={memoTextAreaRef}
                    value={currentMemo}
                    onChange={handleMemoChange}
                    placeholder="오늘의 일기를 작성해주세요 ~ `-`"
                    readOnly={!isEditMode}
                  />
                </>
              ) : null}
              <ButtonWrap>
                {memos[moment(selectedDate).format("YYYY-MM-DD")] ? (
                  isEditMode ? (
                    <>
                      <SaveButton onClick={handleMemoSave}>저장</SaveButton>
                      <ClearButton onClick={handleClear}>삭제</ClearButton>
                    </>
                  ) : (
                    <>
                      <EditButton onClick={handleEdit}>수정</EditButton>
                      <ClearButton onClick={handleClear}>삭제</ClearButton>
                    </>
                  )
                ) : isEditMode ? (
                  <>
                    <SaveButton onClick={handleMemoSave}>저장</SaveButton>
                  </>
                ) : (
                  <NewButton onClick={() => setIsEditMode(true)}>+</NewButton>
                )}
              </ButtonWrap>
              <Modal
                open={modalOpen}
                header="안내"
                close={closeModal}
                type={modalType}
                confirm={modalOkBtnHandler}
                img={soleModalImg}
              >
                {modalText}
              </Modal>
            </LineDown>
          </DiaryBoard>
        </BoardWrapper>
      </BookTheme2>
    </BookContainer>
  );
};

export default DateDiary;
