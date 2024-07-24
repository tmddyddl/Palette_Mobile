import "./App.css";
import PaletteStyle from "./PaletteStyle";
import OpenBook from "./common/background/OpenBook";
import CloseBook from "./common/background/CloseBook";
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
import PalettePage from "./pages/palette/PalettePage";
import GuestBoardGuestbook from "./pages/board/GuestBoardGuestbook";
import GuestBoardDetails from "./pages/board/GuestBoardDetails";
import PaletteHelp from "./pages/palette/PaletteHelp";
import PaletteNotice from "./pages/palette/PaletteNotice";
import PaletteNoticeDetails from "./pages/palette/PaletteNoticeDetails";
import PaletteInquiry from "./pages/palette/PaletteInquiry";
import PaletteAd from "./pages/palette/PaletteAd";
import PaletteCustomer from "./pages/palette/PaletteCustomer";
import ErrorPage from "./error/ErrorPage";
import KakaoRedirect from "./pages/login/redirect/KakaoRedirect";
import ChatList from "./pages/chat/ChatList";
import ChatRoomCreate from "./pages/chat/ChatRoomCreate";
import BoardUpdate from "./pages/board/BoardUpdate";
import MainPage from "./pages/main/BeforeMainPage";
import { useState } from "react";
import MobileBook from "./common/background/MobileBook";

function App() {
  const [url, setUrl] = useState("");

  const handleNavigate = (path) => {
    setUrl(path);
    console.log("Navigating to:", path);
  };
  const clearUrl = () => {
    setUrl("");
  };

  return (
    <>
      {/* 전역스타일적용 */}
      <GlobalStyle />
      <PaletteStyle />
      <Router>
        <Routes>
          <Route path="/" element={<PalettePage />} />
          <Route path="/kakaoLogin" element={<KakaoRedirect />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/customer" element={<PaletteCustomer />} />
          <Route path="/customer/help" element={<PaletteHelp />} />
          <Route path="/customer/inquiry" element={<PaletteInquiry />} />
          <Route path="/customer/ad" element={<PaletteAd />} />
          <Route path="/customer/notice" element={<PaletteNotice />} />
          <Route
            path="/customer/notice/:id"
            element={<PaletteNoticeDetails />}
          />
          <Route element={<CloseBook />}>
            <Route path="/not-login" element={<NotLogin />} />
          </Route>
          <Route element={<MobileBook />}>
            <Route path="/login-page" element={<LoginPage />} />
            <Route path="/signup-page" element={<SignupPage />} />
            <Route path="/find-email" element={<FindEmail />} />
            <Route path="/find-password" element={<FindPassword />} />
          </Route>
          <Route element={<OpenBook onNavigate={handleNavigate} />}>
            <Route path="/main-page" element={<MainPage />} />
            <Route
              path="/:coupleName/main-page"
              element={<AfterMain url={url} clearUrl={clearUrl} />}
            />
            <Route
              path="/date-clothes"
              element={<DateClothes url={url} clearUrl={clearUrl} />}
            />
            <Route
              path="/date-album"
              element={<DateAlbum url={url} clearUrl={clearUrl} />}
            />
            <Route
              path="/date-album2"
              element={<DateAlbum2 url={url} clearUrl={clearUrl} />}
            />
            <Route
              path="/date-album3"
              element={<DateAlbum3 url={url} clearUrl={clearUrl} />}
            />
            <Route
              path="/date-album4"
              element={<DateAlbum4 url={url} clearUrl={clearUrl} />}
            />
            <Route
              path="/date-album5"
              element={<DateAlbum5 url={url} clearUrl={clearUrl} />}
            />
            <Route
              path="/date-diary"
              element={<DateDiary url={url} clearUrl={clearUrl} />}
            />
            <Route
              path="/Chat"
              element={<ChatList url={url} clearUrl={clearUrl} />}
            />
            <Route path="/Chatcreate" element={<ChatRoomCreate />} />
            <Route
              path="/Chat/:roomId"
              element={<ChatMain url={url} clearUrl={clearUrl} />}
            />
            <Route
              path="/:coupleName/dateplanner"
              element={<DatePlanner url={url} clearUrl={clearUrl} />}
            />
            <Route
              path="/:coupleName/board-guestbook"
              element={<GuestBoardGuestbook url={url} clearUrl={clearUrl} />}
            />
            <Route
              path="/:coupleName/board-details/:id"
              element={<BoardDetails url={url} clearUrl={clearUrl} />}
            />
            <Route
              path="/:coupleName/board-write"
              element={<BoardWrite url={url} clearUrl={clearUrl} />}
            />
            <Route
              path="/:coupleName/board-update"
              element={<BoardUpdate url={url} clearUrl={clearUrl} />}
            />
            <Route
              path="/guest-board-guestbook"
              element={<GuestBoardGuestbook />}
            />
            <Route
              path="/guest-board-details"
              element={<GuestBoardDetails />}
            />
          </Route>

          <Route element={<CloseBook modify={true} />}>
            <Route path="/modify" element={<Modify />} />
            <Route path="/withdrawal" element={<Withdrawal />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
