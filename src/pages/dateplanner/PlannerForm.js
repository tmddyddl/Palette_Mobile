import React, { useState, useEffect } from "react";
import styled from "styled-components";

const PlannerContainer = styled.div`
  padding: 10px;
  width: 95%;
  height: 56%;
  background-color: ${({ isEditing }) => (isEditing ? "#fef9e8" : "#feeee8")};
  border: 1px solid #e6e6fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const CourseTitleInput = styled.input`
  padding: 10px;
  margin-top: 2%;
  border: 1px solid #e6e6fa;
  border-radius: 4px;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 10px;
  margin: 2% 0;
`;

const SaveButton = styled.button`
  margin-left: 10px;
  padding: 10px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #444;
  }
`;

const ClearButton = styled.button`
  padding: 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff3333;
  }
`;

const RemoveButton = styled.button`
  padding: 5px 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 10px;

  &:hover {
    background-color: #ff3333;
  }
`;

const PlaceList = styled.ul`
  overflow-x: hidden;
  overflow-y: auto;
  height: 24vh;
  list-style-type: none;
  padding: 0;
`;

const PlaceItem = styled.li`
  background-color: white;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  h3 {
    margin: 0;
    color: #333;
    font-size: 16px;
  }

  p {
    margin: 5px 0;
    color: #666;
    font-size: 12px;
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PlannerForm = ({
  title,
  selectedPlaces,
  handleSaveCourse,
  setSelectedPlaces,
  isEditing,
  handleDeletePlace,
  handleClearPlaces,
}) => {
  const [courseTitle, setCourseTitle] = useState("");
  const [storedPlaces, setStoredPlaces] = useState(selectedPlaces);

  useEffect(() => {
    setStoredPlaces(selectedPlaces);
  }, [selectedPlaces]);

  const handleTitleChange = (e) => {
    setCourseTitle(e.target.value);
  };

  const handleSaveClick = () => {
    if (!courseTitle) {
      alert("코스 제목을 입력하세요!");
      return;
    }
    if (storedPlaces.length === 0) {
      alert("코스에 추가할 장소를 선택하세요!");
      return;
    }
    const newCourse = { title: courseTitle, places: storedPlaces };
    handleSaveCourse(newCourse);
    setCourseTitle("");
    setSelectedPlaces([]);
  };

  const handleRemoveClick = (placeId) => {
    const updatedPlaces = storedPlaces.filter((place) => place.id !== placeId);
    setStoredPlaces(updatedPlaces);
    handleDeletePlace(placeId);
  };

  const handleClearClick = () => {
    setStoredPlaces([]);
    handleClearPlaces();
  };

  return (
    <PlannerContainer isEditing={isEditing}>
      <h2>{isEditing ? "코스 수정" : "코스 플래너"}</h2>
      <CourseTitleInput
        type="text"
        value={courseTitle}
        onChange={handleTitleChange}
        placeholder={isEditing ? title : "코스 제목을 입력하세요"}
      />
      <BtnContainer>
        <ClearButton onClick={handleClearClick}>리스트 초기화</ClearButton>
        <SaveButton onClick={handleSaveClick}>
          {isEditing ? "코스 수정" : "코스 저장"}
        </SaveButton>
      </BtnContainer>
      <PlaceList>
        {storedPlaces.map((place) => (
          <PlaceItem key={place.id}>
            <div>
              <h3>{place.place_name}</h3>
              <p>{place.road_address_name}</p>
            </div>
            <RemoveButton onClick={() => handleRemoveClick(place.id)}>
              제거
            </RemoveButton>
          </PlaceItem>
        ))}
      </PlaceList>
    </PlannerContainer>
  );
};

export default PlannerForm;
