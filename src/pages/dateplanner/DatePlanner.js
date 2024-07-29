import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import MapContainer from "./MapContainer";
import PlannerForm from "./PlannerForm";
import SavedCoursesList from "./SavedCourseList";
import PlaceCardList from "./PlaceCardList";
import theme6 from "../../img/background/theme/6.jpg";
import DisplaceInfo from "./DisplaceInfo";
import MapModal from "./MapModal";
import DatePlannerAxios from "../../axiosapi/DatePlannerAxios";
import useAddress from "../../hooks/useLocation";
// import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";
import { useParams } from "react-router-dom";
import ReactDOMServer from "react-dom/server";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const StyledSlider = styled(Slider)`
  .slick-list {
    overflow: hidden;
  }

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slick-dots {
    bottom: 10px;

    li {
      margin: 0 5px;
    }

    button:before {
      font-size: 12px;
      color: gray;
    }

    .slick-active button:before {
      color: black;
    }
  }
`;

const BookWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LBookContainer = styled.div`
  width: 92vw;
  height: 75vh;
  border: 1px solid #696969;
  background-color: #fff9f2;
  /* background-image: url(${theme6});
  background-size: cover; */
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
`;

const BookTheme2 = styled.div`
  width: 92vw;
  height: 75vh;
  background-color: #fff9f2;
  border: 1px solid #696969;
  /* background-image: url(${theme6});
  background-size: cover; */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const BookSign = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  flex-direction: column;
`;

const BookSign2 = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const RBookContainer = styled.div`
  width: 100%;
  height: 95%;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
`;
const NextBtn = styled.div`
  width: 80px;
  height: 30px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const DatePlanner = ({ url, clearUrl }) => {
  const { location } = useAddress();
  const [currCategory, setCurrCategory] = useState("");
  const [places, setPlaces] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [savedCourses, setSavedCourses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourseIndex, setCurrentCourseIndex] = useState(null);
  const [map, setMap] = useState(null);
  const placeOverlay = useRef(
    new window.kakao.maps.CustomOverlay({ zIndex: 1 })
  );
  // const contentNode = useRef(<EmptyDiv />);
  const mapContainer = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSelectedPlaces, setModalSelectedPlaces] = useState([]);
  // const modalMapContainerRef = useRef(null);
  const [numMarker, setNumMarker] = useState([]);
  const [title, setTitle] = useState("");
  // const email = sessionStorage.getItem("email");
  const { coupleName } = useParams(); // useParams를 통해 coupleName 파라미터 추출
  const currentOverlayRef = useRef(null); // CustomOverlay 상태를 useRef로 관리
  console.log("coupleName : ", coupleName);
  // 버튼 상태 변수
  const [nextBtn, setNextBtn] = useState(false);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
  };

  // 모든 코스 조회 및 저장된 코스 목록 업데이트
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // const resCoupleName = await MemberAxiosApi.coupleNameSearch(email);
        console.log("데이트 플레너의 coupleName", coupleName);
        const courses = await DatePlannerAxios.getCoursesByCoupleName(
          // resCoupleName.data
          coupleName
        );
        console.log("도메인커플들어오나??", coupleName);
        setSavedCourses(courses);
      } catch (error) {
        console.error("❌ Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [coupleName]);

  const addNumMark = () => {
    // 선택된 장소를 numMarker에 추가
    setNumMarker([...numMarker, ...selectedPlaces]);
  };

  // 코스 저장 또는 수정
  const handleSaveCourse = async (newCourse) => {
    try {
      let savedCourse;
      //이메일로 커플이름 불러오는 부분
      // const resCoupleName = await MemberAxiosApi.coupleNameSearch(email);
      // newCourse.coupleName = resCoupleName.data;
      newCourse.coupleName = coupleName;
      if (isEditing) {
        console.log(
          `🔄 Updating course with ID ${savedCourses[currentCourseIndex].id}`
        );
        savedCourse = await DatePlannerAxios.updateCourse(
          savedCourses[currentCourseIndex].id,
          newCourse
        );
        console.log("✔️테스트 확인용", savedCourses[currentCourseIndex]);
        setSavedCourses((prevCourses) =>
          prevCourses.map((course, index) =>
            index === currentCourseIndex ? savedCourse : course
          )
        );
        setIsEditing(false);
        setCurrentCourseIndex(null);
      } else {
        console.log("🔄 Creating new course:", newCourse);
        savedCourse = await DatePlannerAxios.createCourse(newCourse);
        console.log("✔️ Course created:", savedCourse);
        setSavedCourses((prevCourses) => [...prevCourses, savedCourse]);
      }
      setSelectedPlaces([]);
      console.log("Course saved successfully:", savedCourse);
      console.log(newCourse);
    } catch (error) {
      console.error("❌ Error saving course:", error);
    }
  };

  // 선택한 코스 수정 모드로 전환
  const handleEditCourse = async (index) => {
    try {
      const courseId = savedCourses[index].id;
      console.log(`🔄 Fetching course with ID ${courseId}`);
      const course = await DatePlannerAxios.getCourseById(courseId);
      console.log(`✔️ Fetched course with ID ${courseId}:`, course);
      setSelectedPlaces(course.places);
      setTitle(course.title);
      setIsEditing(true);
      setCurrentCourseIndex(index);
    } catch (error) {
      console.error(
        `❌ Error fetching course with ID ${savedCourses[index].id}:`,
        error
      );
    }
  };

  // 코스 삭제
  const handleDeleteCourse = async (index) => {
    try {
      console.log(`🔄 Deleting course with ID ${savedCourses[index].id}`);
      await DatePlannerAxios.deleteCourse(savedCourses[index].id);
      console.log(`✔️ Course with ID ${savedCourses[index].id} deleted`);
      setSavedCourses((prevCourses) =>
        prevCourses.filter((_, i) => i !== index)
      );
      setSelectedPlaces([]);
      setTitle("");
      setIsEditing(false);
      setCurrentCourseIndex(null);
    } catch (error) {
      console.error("❌ Error deleting course:", error);
    }
  };

  // 장소 삭제
  const handleDeletePlace = (placeId) => {
    setSelectedPlaces((prevSelected) =>
      prevSelected.filter((place) => place.id !== placeId)
    );
  };

  // 장소 카드 클릭 시 처리
  const handlePlaceCardClick = (place) => {
    if (selectedPlaces.length >= 10) {
      alert("장소는 최대 10개까지 선택할 수 있습니다.");
      return;
    }

    const position = new window.kakao.maps.LatLng(place.y, place.x);
    map.panTo(position);
    setSelectedPlaces((prevSelected) => [...prevSelected, place]);
    addNumMark(); // 장소를 클릭할 때마다 numMarker에 추가
  };

  // 선택된 장소 초기화
  const handleClearPlaces = () => {
    setSelectedPlaces([]);
  };
  // 장소 카드 클릭 시 지도 이동 및 장소 정보 표시
  const onClickPlaceCard = (place) => {
    const position = new window.kakao.maps.LatLng(place.y, place.x);
    console.log("장소", position);
    map.panTo(position);
    // displayPlaceInfo(place);
  };

  // 모달 열기
  const openModal = async (index) => {
    try {
      const courseId = savedCourses[index].id;
      const course = await DatePlannerAxios.getCourseById(courseId);
      setModalSelectedPlaces(course.places);
      console.log("모달확인", course.places);
      setIsModalOpen(true);
    } catch (error) {
      console.error("❌", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // 선택된 장소들에 대한 새 마커를 생성합니다.
    const newMarkers = selectedPlaces.map((place, index) => {
      // 각 장소에 대해 새 마커를 생성합니다.
      const imageIndex = index + 1; // 인덱스 + 1을 이미지 이름으로 사용
      const markerSrc = `${process.env.PUBLIC_URL}/mapmarker/nummarkers/0${imageIndex}.png`;
      console.log(imageIndex);
      const markerSize = new window.kakao.maps.Size(40, 40);
      const markerImg = new window.kakao.maps.MarkerImage(
        markerSrc,
        markerSize
      );
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(place.y, place.x),
        // 마커의 위치를 장소의 좌표로 설정합니다.
        image: markerImg,
      });
      marker.setMap(map);
      // 생성된 마커를 지도에 추가합니다.
      return marker;
    });

    // 생성된 마커들을 상태로 업데이트합니다.
    setNumMarker(newMarkers);

    // 컴포넌트 언마운트 시 마커들을 정리합니다.
    return () => {
      newMarkers.forEach((marker) => {
        marker.setMap(null); // 지도에서 마커를 제거합니다.
      });
    };
  }, [selectedPlaces, map]);
  // 이 useEffect는 selectedPlaces와 map 상태가 변경될 때마다 실행됩니다.

  // 마커 간 화살표 렌더링
  useEffect(() => {
    if (selectedPlaces.length > 1) {
      // 선택된 장소가 2개 이상인 경우에만 실행됩니다.
      const linePath = selectedPlaces.map(
        (place) => new window.kakao.maps.LatLng(place.y, place.x)
        // 각 장소의 좌표를 LatLng 객체로 변환하여 linePath 배열에 저장합니다.
      );

      const polyline = new window.kakao.maps.Polyline({
        endArrow: true, // 경로의 끝에 화살표를 추가합니다.
        path: linePath, // 경로를 linePath 배열로 설정합니다.
        strokeWeight: 5, // 경로의 선 두께를 설정합니다.
      });

      polyline.setMap(map);
      // 생성된 폴리라인을 지도에 추가합니다.

      return () => {
        polyline.setMap(null); // 컴포넌트 언마운트 시 폴리라인을 지도에서 제거합니다.
      };
    }
  }, [selectedPlaces, map]);
  // 이 useEffect는 selectedPlaces와 map 상태가 변경될 때마다 실행됩니다.

  // 초기화 함수
  const clearOverlay = () => {
    if (currentOverlayRef.current) {
      currentOverlayRef.current.setMap(null); // 맵에서 제거
      currentOverlayRef.current = null; // Ref에서 제거
    }
  };
  // 장소 정보 표시 함수
  const displayPlaceInfo = (place) => {
    console.log("장소정보실행");

    // 이전 CustomOverlay 제거
    clearOverlay();

    // CustomOverlay에 표시될 콘텐츠 HTML 생성
    const content = ReactDOMServer.renderToString(
      <DisplaceInfo place={place} />
    );

    // 새로운 CustomOverlay 생성 및 설정
    const newOverlay = new window.kakao.maps.CustomOverlay({
      content: content,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });

    // 맵에 추가
    newOverlay.setMap(map);

    // 상태 업데이트
    currentOverlayRef.current = newOverlay; // Ref를 사용하여 업데이트
    console.log("setCurrentOverlay", newOverlay);
  };
  return (
    <BookWrapper>
      {!nextBtn && (
        <BookTheme2>
          <BookSign2>
            <RBookContainer>
              <MapContainer
                clearOverlay={clearOverlay}
                mapContainer={mapContainer}
                displayPlaceInfo={displayPlaceInfo}
                placeOverlay={placeOverlay}
                map={map}
                setMap={setMap}
                currCategory={currCategory}
                setCurrCategory={setCurrCategory}
                places={places}
                setPlaces={setPlaces}
                location={location}
              />
              <PlaceCardList
                places={places}
                onClickPlaceBtn={handlePlaceCardClick}
                onClickPlaceCard={onClickPlaceCard}
                selectedPlaces={selectedPlaces}
                currCategory={currCategory}
              />
            </RBookContainer>
            <NextBtn
              onClick={() => {
                setNextBtn(true);
              }}
            >
              다음
            </NextBtn>
          </BookSign2>
        </BookTheme2>
      )}
      {nextBtn && (
        <LBookContainer>
          <BookSign>
            <PlannerForm
              title={title}
              selectedPlaces={selectedPlaces}
              handleSaveCourse={handleSaveCourse}
              setSelectedPlaces={setSelectedPlaces}
              isEditing={isEditing}
              handleDeletePlace={handleDeletePlace}
              handleClearPlaces={handleClearPlaces}
            />

            <SavedCoursesList
              savedCourses={savedCourses}
              setSelectedCourse={(course) => setSelectedPlaces(course.places)}
              handleEditCourse={handleEditCourse}
              handleDeleteCourse={handleDeleteCourse}
              openModal={(index) => openModal(index)}
            />
            <NextBtn
              onClick={() => {
                setNextBtn(false);
              }}
            >
              이전
            </NextBtn>
          </BookSign>
        </LBookContainer>
      )}

      <MapModal
        isOpen={isModalOpen}
        onClose={closeModal}
        mapContainerRef={mapContainer}
        map={map}
        selectedPlaces={modalSelectedPlaces}
        setNumMarker={setNumMarker}
      />
    </BookWrapper>
  );
};

export default DatePlanner;
