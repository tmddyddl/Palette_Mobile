import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDrag } from "@use-gesture/react";
import axios from "axios";

// 스타일드 컴포넌트 정의
const MenuContainer = styled.div.attrs(({ shoes, clothNum, OnePiece }) => ({
  style: {
    width: clothNum === 7 ? "100%" : shoes ? "100%" : "100%",
    height: clothNum === 7 ? "42vh" : shoes ? "7vh" : "21vh",
    display:
      (!OnePiece && clothNum === 7) ||
      ((clothNum === 4 || clothNum === 5) && OnePiece)
        ? "none"
        : "block",
  },
}))`
  overflow: hidden;
  background-color: #fff;
  border-radius: 10px;
  position: relative;
`;

const MenuWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  transition: transform 0.5s ease-in-out;
`;

const MenuItem = styled.div`
  flex: 0 0 100%;
  background-image: url(${(props) => props.item});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`;

const Swiper = ({ shoes, clothNum, OnePiece }) => {
  // 기본 경로 설정
  const basePath = process.env.PUBLIC_URL + "/clothes/";

  // 이미지 경로를 생성하는 함수
  const generatePaths = (category, type, count) => {
    return Array.from(
      { length: count },
      (_, i) => `${basePath}${category}/${type}/${i + 1}.jpg`
    );
  };

  // 남성 의류 경로 배열 생성
  const manTops = generatePaths("man", "top", 16);
  const manPants = generatePaths("man", "pants", 7);
  const manShoes = generatePaths("man", "shoes", 12);

  // 여성 의류 경로 배열 생성
  const womanTops = generatePaths("woman", "top", 17);
  const womanPants = generatePaths("woman", "pants", 18);
  const womanShoes = generatePaths("woman", "shoes", 13);
  const womanOnepiece = generatePaths("woman", "onepiece", 12);
  const [clothesData, setClothesData] = useState({
    manTopClothes: manTops,
    manPantsClothes: manPants,
    manShoes: manShoes,
    womanTopClothes: womanTops,
    womanButtomClothes: womanPants,
    womanShoes: womanShoes,
    womanOnepiece: womanOnepiece,
  });

  const clothGroups = {
    1: clothesData.manTopClothes,
    2: clothesData.manPantsClothes,
    3: clothesData.manShoes,
    4: clothesData.womanTopClothes,
    5: clothesData.womanButtomClothes,
    6: clothesData.womanShoes,
    7: clothesData.womanOnepiece,
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragging, setDragging] = useState(false);

  //옷 데이터 저장
  useEffect(() => {
    // fetchData();
  }, []);

  // 파이썬에서 데이터를 가져오는 비동기 함수
  const fetchData = async () => {
    try {
      const responses = await axios.get(
        "http://localhost:5000/date-clothes/totalClothes"
      );
      console.log(responses.data);
      setClothesData({
        manTopClothes: responses.data.manTopClothes.map((data) => data.img_src),
        manPantsClothes: responses.data.manPantsClothes.map(
          (data) => data.img_src
        ),
        manShoes: responses.data.manShoes.map((data) => data.img_src),
        womanTopClothes: responses.data.womanTopClothes.map(
          (data) => data.img_src
        ),
        womanButtomClothes: responses.data.womanButtomClothes.map(
          (data) => data.img_src
        ),
        womanShoes: responses.data.womanShoes.map((data) => data.img_src),
        womanOnepiece: responses.data.womanOnepiece.map((data) => data.img_src),
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleSwipe = (direction) => {
    const items = clothGroups[clothNum];
    const itemsLength = items.length;

    if (direction === "left") {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? itemsLength : prevIndex - 1
      );
    } else {
      setCurrentIndex((prevIndex) =>
        prevIndex === itemsLength ? 0 : prevIndex + 1
      );
    }
  };
  const bind = useDrag(
    ({ down, movement: [mx], direction: [dx], cancel, last }) => {
      setDragging(down);
      if (last) {
        if (Math.abs(mx) > 16) {
          // threshold 값을 적절히 조정
          handleSwipe(dx > 0 ? "left" : "right"); // 방향을 반대로 처리
        }
        cancel();
      }
    },
    { threshold: 20 } // 드래그 민감도를 적절히 조정
  );
  const items = clothGroups[clothNum];
  const handleTouchMove = (event) => {
    event.stopPropagation();
  };
  // 무한 루프를 위해 아이템 길이가 1보다 큰 경우에만 마지막 아이템을 맨 앞에 추가하여 순환
  const infiniteItems = items.length > 1 ? [...items, items[0]] : items;

  return (
    <MenuContainer shoes={shoes} clothNum={clothNum} OnePiece={OnePiece}>
      <MenuWrapper
        {...bind()}
        onTouchMove={handleTouchMove}
        style={{
          transform: `translateX(${-50 * currentIndex}%)`,
          transition: dragging ? "none" : "transform 0.5s ease-in-out",
          cursor: dragging ? "grabbing" : "grab",
        }}
      >
        {infiniteItems.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </MenuWrapper>
    </MenuContainer>
  );
};

export default Swiper;
