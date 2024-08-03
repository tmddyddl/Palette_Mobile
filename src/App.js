import "./App.css";
import PaletteStyle from "./PaletteStyle";
import NotePaper from "./common/background/NotePaper";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AfterMain from "./pages/main/MainPage";
import NotLogin from "./pages/main/NotLogin";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/login/SignupPage";
import FindEmail from "./pages/login/FindEmail";
import FindPassword from "./pages/login/FindPassword";
import ChatMain from "./pages/chat/chat";
import GlobalStyle from "./global/GlobalStyle";
import DateClothes from "./pages/dateclothes/DateClothes";
import DatePlanner from "./pages/dateplanner/DatePlanner";
import DateAlbum from "./pages/datealbum/DateAlbum";
import DateDiary from "./pages/datediary/DateDiary";
import DateAlbum2 from "./pages/datealbum/DateAlbum2";
import DateAlbum3 from "./pages/datealbum/DateAlbum3";
import DateAlbum4 from "./pages/datealbum/DateAlbum4";
import DateAlbum5 from "./pages/datealbum/DateAlbum5";
import BoardDetails from "./pages/board/BoardDetails";
import BoardWrite from "./pages/board/BoardWrite";
import Modify from "./pages/setting/Modify";
import Withdrawal from "./pages/setting/Withdrawal";
import GuestBoardGuestbook from "./pages/board/GuestBoardGuestbook";
import ChatList from "./pages/chat/ChatList";
import ChatRoomCreate from "./pages/chat/ChatRoomCreate";
import BoardUpdate from "./pages/board/BoardUpdate";
import MainPage from "./pages/main/BeforeMainPage";
import LoginLetter from "./common/background/LoginLetter";

function App() {
  return (
    <>
      {/* 전역스타일적용 */}
      <GlobalStyle />
      <PaletteStyle />
      <Router>
        <Routes>
          <Route element={<NotePaper notlogin={true} />}>
            <Route path="/" element={<NotLogin />} />
          </Route>
          <Route element={<LoginLetter notLoginState={false} />}>
            <Route path="/login-page" element={<LoginPage />} />
            <Route path="/signup-page" element={<SignupPage />} />
            <Route path="/find-email" element={<FindEmail />} />
            <Route path="/find-password" element={<FindPassword />} />
          </Route>
          <Route element={<LoginLetter notLoginState={true} />}>
            <Route path="/main-page" element={<MainPage />} />
            <Route path="/:coupleName/main-page" element={<AfterMain />} />
            <Route path="/date-clothes" element={<DateClothes />} />
            <Route path="/date-album" element={<DateAlbum />} />
            <Route path="/date-album2" element={<DateAlbum2 />} />
            <Route path="/date-album3" element={<DateAlbum3 />} />
            <Route path="/date-album4" element={<DateAlbum4 />} />
            <Route path="/date-album5" element={<DateAlbum5 />} />
            <Route path="/date-diary" element={<DateDiary />} />
            <Route path="/Chat" element={<ChatList />} />
            <Route path="/Chatcreate" element={<ChatRoomCreate />} />
            <Route path="/Chat/:roomId" element={<ChatMain />} />
            <Route path="/dateplanner" element={<DatePlanner />} />
            <Route path="/board-guestbook" element={<GuestBoardGuestbook />} />
            <Route path="/board-details/:id" element={<BoardDetails />} />
            <Route path="/board-write" element={<BoardWrite />} />
            <Route path="/board-update" element={<BoardUpdate />} />
            <Route
              path="/guest-board-guestbook"
              element={<GuestBoardGuestbook />}
            />
          </Route>

          <Route element={<LoginLetter notLoginState={false} />}>
            <Route path="/modify" element={<Modify />} />
            <Route path="/withdrawal" element={<Withdrawal />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
