// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { Link, useNavigate } from "react-router-dom";
// import BoardAxios from "../../axiosapi/BoardAxios";
// import boardBg from "../../img/background/theme/9.jpg";
// import CoupleImg from "../../common/couple/CoupleImgMini";
// import CandyImg from "../../img/mainImg/커플2.jpg";

// const BookTheme = styled.div`
//   width: 53vw;
//   height: 68.5vh;
//   margin-top: 4vh;
//   margin-left: 0.8vw;
//   background-image: url(${boardBg});
//   background-size: cover;
//   opacity: 0.8;
//   display: flex;
// `;

// const BoardSide = styled.div`
//   width: 25.5vw;
//   height: 68.5vh;
//   position: relative;
// `;

// const BoardTitle = styled.div`
//   margin-top: 2.5vh;
//   width: 25.5vw;
//   height: 5vh;
//   font-size: 20px;
//   font-weight: 700;
//   display: flex;
//   justify-content: center;
//   align-items: center;
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
//   font-weight: 600;
//   text-align: center;
//   padding: 0;
//   box-sizing: border-box;
//   vertical-align: middle;
//   &:nth-child(1) {
//     width: 3vw;
//   }
//   &:nth-child(3) {
//     width: 4vw;
//   }
// `;

// const BoardTd = styled.td`
//   height: 3.2vh;
//   border: 1px solid black;
//   font-size: 12px;
//   font-weight: 600;
//   text-align: center;
//   padding: 0;
//   box-sizing: border-box;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
//   vertical-align: middle;
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

// const CenterArea = styled.div`
//   width: 1.5vw;
//   height: 68.5vh;
// `;

// const GuestbookSide = styled.div`
//   width: 25.8vw;
//   height: 68.5vh;
// `;

// const GuestbookTitle = styled.div`
//   margin-top: 2.5vh;
//   width: 25.5vw;
//   height: 5vh;
//   font-size: 20px;
//   font-weight: 700;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const GuestbookGrayBar = styled.div`
//   margin-left: 1.5vw;
//   width: 22.5vw;
//   height: 0.4vh;
//   background-color: #b0b0b0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const GuestbookArea = styled.div`
//   margin-left: 1vw;
//   margin-top: 2vh;
//   width: 23.5vw;
//   height: 12vh;
//   border: 1px solid black;
// `;

// const GuestbookHead = styled.div`
//   height: 2.375vh;
//   background-color: #cdcfc4;
//   border-bottom: 1px solid black;
//   display: flex;
// `;

// const GuestbookNo = styled.div`
//   width: 3vw;
//   height: 2.375vh;
//   font-size: 14px;
//   font-weight: 500;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const GuestbookNickname = styled.div`
//   width: 6vw;
//   height: 2.375vh;
//   font-size: 16px;
//   font-weight: 600;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
//   &:hover {
//     color: blue;
//   }
// `;

// const GuestbookDate = styled.div`
//   width: 7vw;
//   height: 2.375vh;
//   font-size: 16px;
//   font-weight: 600;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const GuestbookDelete = styled.div`
//   margin-left: 4vw;
//   width: 3vw;
//   height: 2.375vh;
//   font-size: 12px;
//   font-weight: 500;
//   display: flex;
//   justify-content: right;
//   align-items: center;
//   cursor: pointer;
//   &:hover {
//     color: blue;
//   }
// `;

// const GuestbookBody = styled.div`
//   height: 9.6vh;
//   background-color: #eccdb0;
//   border-bottom: 1px solid black;
//   display: flex;
// `;

// const GuestbookImage = styled.div`
//   width: 4.8vw;
//   height: 9.6vh;
//   background-image: url(${CandyImg});
//   background-size: contain;
//   background-repeat: no-repeat;
// `;

// const GuestbookMain = styled.div`
//   margin-left: 1vw;
//   margin-right: 1vw;
//   width: 14.5vw;
//   height: 10vh - 1px;
//   font-size: 12px;
//   font-weight: 600;
//   display: flex;
//   justify-content: right;
//   align-items: center;
// `;

// const itemsPerPage = 10;

// const BoardGuestbook = () => {
//   const [currentPage, setCurrentPage] = useState(0);
//   const [boardData, setBoardData] = useState([]);
//   const [totalPages, setTotalPages] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchBoardData(currentPage);
//   }, [currentPage]);

//   const fetchBoardData = async (page) => {
//     try {
//       const { data } = await BoardAxios.fetchBoardData(page, itemsPerPage);
//       setBoardData(data.content);
//       setTotalPages(data.totalPages);
//     } catch (error) {
//       console.error("Failed to fetch board data", error);
//     }
//   };

//   const handleNameClick = (id) => {
//     navigate(`/board-details/${id}`);
//   };

//   const handleClick = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <BookTheme>
//       <BoardSide>
//         <BoardTitle>알콩 달콩 커플게시판</BoardTitle>
//         <CoupleDiv>
//           <CoupleImg />
//         </CoupleDiv>
//         <BoardGrayBar />
//         <Link to="/board-write" style={{ textDecoration: "none" }}>
//           <BoardPost>새 게시물</BoardPost>
//         </Link>
//         <BoardTable>
//           <thead>
//             <tr>
//               <BoardTh>ID</BoardTh>
//               <BoardTh>Name</BoardTh>
//               <BoardTh>Date</BoardTh>
//             </tr>
//           </thead>
//           <tbody>
//             {boardData.map((item) => (
//               <tr key={item.id}>
//                 <BoardTd>{item.id}</BoardTd>
//                 <NameHover onClick={() => handleNameClick(item.id)}>
//                   {item.title}
//                 </NameHover>
//                 <BoardTd>{item.regDate}</BoardTd>
//               </tr>
//             ))}
//           </tbody>
//         </BoardTable>
//         <BoardPaginationContainer>
//           {[...Array(totalPages)].map((_, index) => (
//             <BoardPaginationButton
//               key={index}
//               onClick={() => handleClick(index)}
//               style={{
//                 fontWeight: currentPage === index ? "bold" : "normal",
//               }}
//             >
//               {index + 1}
//             </BoardPaginationButton>
//           ))}
//         </BoardPaginationContainer>
//       </BoardSide>
//       <CenterArea />
//       <GuestbookSide>
//         <GuestbookTitle>방명록</GuestbookTitle>
//         <GuestbookGrayBar />
//         <GuestbookArea>
//           <GuestbookHead>
//             <GuestbookNo>No.1</GuestbookNo>
//             <GuestbookNickname>캔디</GuestbookNickname>
//             <GuestbookDate>(2024.02.15)</GuestbookDate>
//             <GuestbookDelete>삭제</GuestbookDelete>
//           </GuestbookHead>
//           <GuestbookBody>
//             <GuestbookImage />
//             <GuestbookMain>
//               데이트 게시물 잘 보고 있어요! 저희 커플도 참고해서 데이트 계획
//               세우고 있어요.
//             </GuestbookMain>
//           </GuestbookBody>
//         </GuestbookArea>
//         <GuestbookArea>
//           <GuestbookHead>
//             <GuestbookNo>No.1</GuestbookNo>
//             <GuestbookNickname>캔디</GuestbookNickname>
//             <GuestbookDate>(2024.02.15)</GuestbookDate>
//             <GuestbookDelete>삭제</GuestbookDelete>
//           </GuestbookHead>
//           <GuestbookBody>
//             <GuestbookImage />
//             <GuestbookMain>
//               데이트 게시물 잘 보고 있어요! 저희 커플도 참고해서 데이트 계획
//               세우고 있어요.
//             </GuestbookMain>
//           </GuestbookBody>
//         </GuestbookArea>
//         <GuestbookArea>
//           <GuestbookHead>
//             <GuestbookNo>No.1</GuestbookNo>
//             <GuestbookNickname>캔디</GuestbookNickname>
//             <GuestbookDate>(2024.02.15)</GuestbookDate>
//             <GuestbookDelete>삭제</GuestbookDelete>
//           </GuestbookHead>
//           <GuestbookBody>
//             <GuestbookImage />
//             <GuestbookMain>
//               데이트 게시물 잘 보고 있어요! 저희 커플도 참고해서 데이트 계획
//               세우고 있어요.
//             </GuestbookMain>
//           </GuestbookBody>
//         </GuestbookArea>
//         <GuestbookArea>
//           <GuestbookHead>
//             <GuestbookNo>No.1</GuestbookNo>
//             <GuestbookNickname>캔디</GuestbookNickname>
//             <GuestbookDate>(2024.02.15)</GuestbookDate>
//             <GuestbookDelete>삭제</GuestbookDelete>
//           </GuestbookHead>
//           <GuestbookBody>
//             <GuestbookImage />
//             <GuestbookMain>
//               데이트 게시물 잘 보고 있어요! 저희 커플도 참고해서 데이트 계획
//               세우고 있어요.
//             </GuestbookMain>
//           </GuestbookBody>
//         </GuestbookArea>
//       </GuestbookSide>
//     </BookTheme>
//   );
// };

// export default BoardGuestbook;
