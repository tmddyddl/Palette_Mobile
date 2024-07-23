import React from "react";
import styled from "styled-components";

const PlaceCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  height: 43%;
  
`;

const PlaceCard = styled.div`
  width: 120px; /* 카드의 고정 너비 */
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0px 1px 2px #888;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  
  &:hover {
    background: #f0f0f0;
    cursor: pointer;
  }

`;

const PlaceCardContent = styled.div`
  flex: 1; /* 내용이 길어져도 카드가 넘치지 않도록 설정 */
  overflow: hidden;
`;

const PlaceCardLink = styled.a`
  color: #000;
  text-decoration: none;
  
  &:hover {
    color: red;
  }
`;

const PlaceCardText = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const PlaceCardAddress = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

const PlaceCardPhone = styled.div`
  font-size: 14px;
  color: #0f7833;
  margin-bottom: 5px;
`;

const AddButton = styled.button`
  padding: 8px 12px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s;
  align-self: flex-end;

  &:hover {
    background-color: #444;
  }
`;

const PlaceCardList = ({ onClickPlaceCard, currCategory, places, onClickPlaceBtn, selectedPlaces }) => {
  const isSelected = (place) => selectedPlaces.some((selected) => selected.id === place.id);
  
  if (!currCategory || places.length === 0) {
    return null; // 현재 카테고리가 없거나 장소 배열이 비어있으면 렌더링하지 않습니다.
  }

  return (
    <PlaceCardContainer>
      {places
        .filter((place) => !isSelected(place))
        .map((place, index) => (
          <PlaceCard onClick={() => onClickPlaceCard(place)} key={index}>
            <PlaceCardLink href={place.place_url} target="_blank" title={place.place_name}>
              <PlaceCardText>{place.place_name}</PlaceCardText>
            </PlaceCardLink>
            <PlaceCardContent>
              <PlaceCardAddress>{place.road_address_name}</PlaceCardAddress>
              <PlaceCardPhone>{place.phone}</PlaceCardPhone>
            </PlaceCardContent>
            <AddButton onClick={() => onClickPlaceBtn(place)}>추가</AddButton>
          </PlaceCard>
        ))}
    </PlaceCardContainer>
  );
};

export default PlaceCardList;
