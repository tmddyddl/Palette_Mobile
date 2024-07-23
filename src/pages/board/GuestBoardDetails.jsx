// import styled from "styled-components";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import boardBg from "../../img/background/theme/9.jpg";
// import boardBg_1 from "../../img/background/theme/9-1.jpg";
// import CoupleImg from "../../common/couple/CoupleImgMini";
// import { useState } from "react";

// const BookTheme = styled.div`
//   width: 497px;
//   height: 67vh;
//   margin-top: 5vh;
//   margin-left: 0.7vw;
//   background-image: url(${boardBg});
//   background-size: cover;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   @media screen and (max-width: 1200px) {
//     width: 420px;
//     height: 56vh;
//     margin-top: 4.2vh;
//   }
//   @media screen and (max-width: 768px) {
//     width: 280px;
//     height: 35vh;
//     margin-top: 2.8vh;
//   }
// `;

// const BookTheme2 = styled.div`
//   width: 497px;
//   height: 67vh;
//   margin-top: 5vh;
//   margin-left: 0.05vw;
//   background-image: url(${boardBg_1});
//   background-size: cover;
//   display: flex;
//   justify-content: space-between;
//   @media screen and (max-width: 1200px) {
//     width: 420px;
//     height: 56vh;
//     margin-top: 4.2vh;
//   }
//   @media screen and (max-width: 768px) {
//     width: 280px;
//     height: 35vh;
//     margin-top: 2.8vh;
//   }
// `;

// const BoardSide = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   position: relative;
// `;
// // const ChangeBoardTitle = styled.div`
// //   margin-top: 1.5vh;
// //   margin-left: 17.5vw;
// //   width: 8vw;
// //   height: 1vh;
// //   font-size: 11px;
// //   font-weight: 600;
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// // `;
// const BoardTitle = styled.div`
//   margin-top: 2%;
//   width: 100%;
//   height: 6%;
//   font-size: 20px;
//   font-weight: 700;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   @media screen and (max-width: 1200px) {
//     font-size: 17px;
//   }
//   @media screen and (max-width: 768px) {
//     font-size: 12px;
//   }
// `;
// const CoupleDiv = styled.div`
//   width: 25.5vw;
//   height: 12vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
// const BoardGrayBar = styled.div`
//   margin-top: 1.5vh;
//   margin-left: 1.5vw;
//   width: 22.5vw;
//   height: 0.4vh;
//   background-color: #b0b0b0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
// const BoardPost = styled.div`
//   margin-top: 2vh;
//   margin-left: 18.5vw;
//   width: 8vw;
//   height: 1vh;
//   font-size: 11px;
//   font-weight: 600;
//   color: black;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
//   &:hover {
//     color: blue;
//   }
// `;
// const BoardTable = styled.table`
//   margin-top: 1vh;
//   margin-left: 1.5vw;
//   width: 22.5vw;
//   table-layout: fixed;
//   border-collapse: collapse;
// `;

// const BoardTh = styled.th`
//   height: 3vh;
//   background-color: gray;
//   border: 1px solid black;
//   font-size: 12px;
//   text-align: center;
//   padding: 0;
//   box-sizing: border-box;
//   // ID
//   &:nth-child(1) {
//     width: 3vw;
//   }
//   // Date
//   &:nth-child(3) {
//     width: 4vw;
//   }
// `;

// const BoardTd = styled.td`
//   height: 3.2vh;
//   border: 1px solid black;
//   font-size: 12px;
//   text-align: center;
//   padding: 0;
//   box-sizing: border-box;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
// `;
// const NameHover = styled(BoardTd)`
//   cursor: pointer;
//   &:hover {
//     color: blue;
//   }
// `;
// const BoardPaginationContainer = styled.div`
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   margin-bottom: 3vh;
//   margin-left: 1.5vw;
//   width: 22.5vw;
//   height: 3vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
// const BoardPaginationButton = styled.button`
//   margin: 0 5px;
//   padding: 5px 10px;
//   background-color: #ffffff;
//   border: 1px solid #cccccc;
//   cursor: pointer;
//   &:hover {
//     background-color: #eeeeee;
//   }
// `;

// const DetailsSide = styled.div`
//   width: 25.8vw;
//   height: 68.5vh;
// `;
// const BackToGuestbook = styled.div`
//   margin-top: 2vh;
//   margin-left: 19vw;
//   width: 8vw;
//   height: 1vh;
//   font-size: 13px;
//   font-weight: 600;
//   color: black;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
//   &:hover {
//     color: blue;
//   }
// `;
// const DetailsNumber = styled.div`
//   margin-left: 1.5vw;
//   margin-top: 3vh;
//   width: 10vw;
//   height: 3vh;
//   font-size: 24px;
// `;
// const DetailsTitle = styled.div`
//   margin-left: 1.5vw;
//   width: 22.8vw;
//   height: 3vh;
//   font-size: 24px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
// const DetailsGrayBar = styled.div`
//   margin-top: 1.5vh;
//   margin-left: 1.5vw;
//   width: 22.5vw;
//   height: 0.4vh;
//   background-color: #b0b0b0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
// const DetailsMain = styled.div`
//   margin-left: 1.5vw;
//   margin-top: 1.2vh;
//   width: 22.8vw;
//   height: 45vh;
// `;

// const BoardData = [
//   { id: 14, name: "13알콩이의 생일파티~", date: "2024-06-20" },
//   { id: 13, name: "13알콩이의 생일파티~", date: "2024-06-20" },
//   { id: 12, name: "12알콩이의 생일파티~", date: "2024-06-20" },
//   { id: 11, name: "11알콩이의 생일파티~", date: "2024-06-20" },
//   { id: 10, name: "알콩이의 생일파티~", date: "2024-06-20" },
//   { id: 9, name: "한강 데이트!!", date: "2024-06-11" },
//   { id: 8, name: "2박 3일 부산여행 기록", date: "2024-06-03" },
//   { id: 7, name: "달콩이의 친구들과의 모임~", date: "2024-06-01" },
//   { id: 6, name: "100일 기념일 데이트 기록", date: "2024-05-25" },
//   { id: 5, name: "어버이날 기념으로 서로의 부모님 챙기기", date: "2024-05-08" },
//   { id: 4, name: "벚꽃이 흩날리는 석촌호수~~", date: "2024-04-03" },
//   { id: 3, name: "알콩이와 달콩이의 호캉스", date: "2024-03-25" },
//   { id: 2, name: "달콩이와 홍대 데이트", date: "2024-03-02" },
//   { id: 1, name: "첫 데이트 기념~", date: "2024-02-05" },
// ];
// const itemsPerPage = 10; // 페이지 당 보여줄 항목 수

// const GuestBoardDetails = () => {
//   const [currentPage, setCurrentPage] = useState(1);

//   const navigate = useNavigate();

//   const handleNameClick = (id) => {
//     navigate(`/board-details`);
//     //백엔드 작업 완료 후 사용 - id번호로 이동
//     // navigate(`/board-details/${id}`);
//   };

//   // 페이지 번호 클릭 시 이벤트 처리 함수
//   const handleClick = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };
//   // 현재 페이지에 맞는 데이터 슬라이스
//   const currentData = BoardData.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );
//   return (
//     <>
//       <BookTheme>
//         <BoardSide>
//           <BoardTitle>알콩 달콩 커플게시판</BoardTitle>
//           <CoupleDiv>
//             <CoupleImg />
//           </CoupleDiv>
//           <BoardGrayBar />
//           <Link to="/board-write" style={{ textDecoration: "none" }}>
//             <BoardPost>새 게시물</BoardPost>
//           </Link>
//           <BoardTable>
//             <thead>
//               <tr>
//                 <BoardTh>ID</BoardTh>
//                 <BoardTh>Name</BoardTh>
//                 <BoardTh>Date</BoardTh>
//               </tr>
//             </thead>
//             <tbody>
//               {currentData.map((item) => (
//                 <tr key={item.id}>
//                   <BoardTd>{item.id}</BoardTd>
//                   <NameHover onClick={() => handleNameClick(item.id)}>
//                     {item.name}
//                   </NameHover>
//                   <BoardTd>{item.date}</BoardTd>
//                 </tr>
//               ))}
//             </tbody>
//           </BoardTable>
//           <BoardPaginationContainer>
//             {[...Array(Math.ceil(BoardData.length / itemsPerPage))].map(
//               (_, index) => (
//                 <BoardPaginationButton
//                   key={index + 1}
//                   onClick={() => handleClick(index + 1)}
//                   style={{
//                     fontWeight: currentPage === index + 1 ? "bold" : "normal",
//                   }}
//                 >
//                   {index + 1}
//                 </BoardPaginationButton>
//               )
//             )}
//           </BoardPaginationContainer>
//         </BoardSide>
//       </BookTheme>
//       <BookTheme2>
//         <DetailsSide>
//           <Link to="/guest-board-guestbook" style={{ textDecoration: "none" }}>
//             <BackToGuestbook>돌아가기</BackToGuestbook>
//           </Link>
//           <DetailsNumber>No.9</DetailsNumber>
//           <DetailsTitle>한강 데이트!!</DetailsTitle>
//           <DetailsGrayBar />
//           <DetailsMain>
//             가나다라마바사 123456789 아자차카타파하 아자차카타파하
//             아자차카타파하
//           </DetailsMain>
//         </DetailsSide>
//       </BookTheme2>
//     </>
//   );
// };
// export default GuestBoardDetails;
