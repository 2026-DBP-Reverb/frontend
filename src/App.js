import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./auth/page/LoginPage";
import SignupPage from "./auth/page/SignupPage";
import HomePage from "./home/page/HomePage";
import MyPage from "./mypage/page/MyPage";
import SelectArtist from "./musictaste/page/SelectArtist";
import { MusicTasteProvider } from "./musictaste/context/MusicTasteContext";
import SelectGenre from "./musictaste/page/SelectGenre";

function App() {
  return (
    <BrowserRouter>
      <MusicTasteProvider>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/mypage" element={<MyPage/>}/>
          <Route path="/music-taste/artists" element={<SelectArtist/>}/>
          <Route path="/music-taste/genres" element={<SelectGenre />} />
        </Routes>
      </MusicTasteProvider>
    </BrowserRouter>
  );
}

export default App;
