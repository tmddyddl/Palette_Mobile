import React from "react";
import styled from "styled-components";

const SavedCoursesContainer = styled.div`
    display: flex;
    width: 95%;
    flex-direction: column;
    /* max-width: 100%; */
    overflow-x: hidden;
    overflow-y: auto;
    height: 43%;

  h3 {
    margin: 10px;
    text-align: center;
  }
`;

const CourseList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const CourseItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
  border: 1px solid #ddd;
  gap: 6px;
`;

const CourseTitle = styled.div`
  width: auto;
  cursor: pointer;
  font-size: 16px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
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

const SavedCoursesList = ({
  openModal,
  savedCourses,
  setSelectedCourse,
  handleEditCourse,
  handleDeleteCourse,
}) => {
  return (
    <SavedCoursesContainer>
      <h3>저장된 코스</h3>
      <CourseList>
        {savedCourses.map((course, index) => (
          <CourseItem key={index}>
            <CourseTitle onClick={() => openModal(index)}>
              {course.title}
            </CourseTitle>
            <ActionButtons>
              <Button onClick={() => handleEditCourse(index)}>수정</Button>
              <Button onClick={() => handleDeleteCourse(index)}>삭제</Button>
              <Button onClick={() => openModal(index)}>지도 보기</Button>
            </ActionButtons>
          </CourseItem>
        ))}
      </CourseList>
    </SavedCoursesContainer>
  );
};

export default SavedCoursesList;
