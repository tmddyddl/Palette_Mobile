import styled from "styled-components";

const PlaceInfoWrap = styled.div`
  position: absolute;
  bottom: 28px;
  left: -150px;
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const PlaceInfo = styled.div`
  position: relative;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
  background: #fff;
  &:nth-of-type(n) {
    border: 0;
    box-shadow: 0px 1px 2px #888;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
`;
const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-left: 8px;
`;

const PlaceInfoLink = styled.a`
  text-decoration: none;
`;

const PlaceInfoTitle = styled.div`
  font-weight: bold;
  font-size: 14px;
  border-radius: 6px 6px 0 0;
  margin: -1px -1px 0 -1px;
  padding: 10px;
  color: #fff;
  background: #d95050
    url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png")
    no-repeat right 14px center;
  &:hover,
  &:active {
    color: blue;
  }
`;

const PlaceInfoText = styled.span`
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  cursor: default;
  font-size: 13px;
`;

const PlaceInfoJibun = styled.span`
  display: block;
  color: #999;
  font-size: 11px;
  margin-top: 0;
`;

const PlaceInfoTel = styled.span`
  color: #0f7833;
  font-size: 11px;
`;

const PlaceInfoAfter = styled.div`
  content: "";
  position: relative;
  margin-left: -12px;
  left: 50%;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
`;
const DisplaceInfo = ({ place }) => {
  return (
    <PlaceInfoWrap>
      <PlaceInfo>
        <PlaceInfoLink
          href={place.place_url}
          target="_blank"
          title={place.place_name}
        >
          <PlaceInfoTitle>{place.place_name}</PlaceInfoTitle>
        </PlaceInfoLink>
        <TextArea>
          <PlaceInfoText title={place.road_address_name}>
            {place.road_address_name}
          </PlaceInfoText>
          <PlaceInfoJibun>(지번 : {place.address_name})</PlaceInfoJibun>
          <PlaceInfoTel>{place.phone}</PlaceInfoTel>
        </TextArea>
      </PlaceInfo>
      <PlaceInfoAfter />
    </PlaceInfoWrap>
  );
};

export default DisplaceInfo;
