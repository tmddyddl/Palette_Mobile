import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 800px;
  width: 100%;
  display: flex;
  justify-content: flex-end;

`;

const CloseButton = styled.button`
  position: absolute;
  
  
  background: none;
  border: none;
  font-size: 1.5rem;
  z-index: 5;
`;

const MapModal = ({ isOpen, onClose, mapContainerRef, map, selectedPlaces, setNumMarker }) => {
  useEffect(() => {
    if (isOpen && mapContainerRef.current) {
      const { kakao } = window;
      const kakaoMap = new kakao.maps.Map(mapContainerRef.current, {
        center: new kakao.maps.LatLng(37.498085, 127.027978), // 초기 위치 설정
        level: 6, // 확대 레벨 설정
      });

      // 선택된 장소들에 대한 새 마커를 생성합니다.
      const newMarkers = selectedPlaces.map((place,index) => {
        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:10px;">${place.place_name}</div>`
        });
        const imageIndex = index + 1; // 인덱스 + 1을 이미지 이름으로 사용
      const markerSrc = `${process.env.PUBLIC_URL}/mapmarker/nummarkers/0${imageIndex}.png`;
      console.log(imageIndex);
      const markerSize = new window.kakao.maps.Size(40, 40);
      const markerImg = new window.kakao.maps.MarkerImage(
        markerSrc,
        markerSize
      );
        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(place.y, place.x),
          image:markerImg,
        });
        marker.setMap(kakaoMap); // 생성된 마커를 지도에 추가합니다.

        // 마커를 클릭했을 때 이벤트 리스너 추가
        kakao.maps.event.addListener(marker, 'mouseover', function() {
          
          infowindow.open(kakaoMap, marker);
        });

        kakao.maps.event.addListener(marker, 'mouseout', function() {
          // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
          infowindow.close();
      });

        return marker;
      });

      // 생성된 마커들을 상태로 업데이트합니다.
      setNumMarker(newMarkers);
       // 폴리라인을 그리기 위한 경로 배열 생성
       const linePath = selectedPlaces.map(place => new kakao.maps.LatLng(place.y, place.x));

       // 폴리라인 객체 생성
       const polyline = new kakao.maps.Polyline({
        endArrow: true, // 경로의 끝에 화살표를 추가합니다.
        path: linePath, // 경로를 linePath 배열로 설정합니다.
        strokeWeight: 5, // 경로의 선 두께를 설정합니다.
       });
 
       // 폴리라인을 지도에 표시
       polyline.setMap(kakaoMap);

      // 컴포넌트 언마운트 시 마커들을 정리합니다.
      return () => {
        newMarkers.forEach(marker => marker.setMap(null)); // 마커 제거
        polyline.setMap(null); // 폴리라인 제거
      };
    }
  }, [isOpen, mapContainerRef, selectedPlaces, setNumMarker]);

  if (!isOpen) return null;

  return (
    <ModalWrapper>
        
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }}></div>
      </ModalContent>
    
    </ModalWrapper>
  );
};

export default MapModal;
