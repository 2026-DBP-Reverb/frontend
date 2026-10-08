import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./auth/page/LoginPage";
import SignupPage from "./auth/page/SignupPage";
import RequireAuth from "./auth/guards/RequireAuth";
import RedirectIfAuthenticated from "./auth/guards/RedirectIfAuthenticated";
import HomePage from "./home/page/HomePage";
import MyPage from "./mypage/page/MyPage";
import SelectArtist from "./musictaste/page/SelectArtist";
import { MusicTasteProvider } from "./musictaste/context/MusicTasteContext";
import SelectGenre from "./musictaste/page/SelectGenre";
import SelectPlaylist from "./musictaste/page/SelectPlaylist";

function App() {
  return (
    <BrowserRouter>
      <MusicTasteProvider>
        <Routes>
          <Route element={<RedirectIfAuthenticated/>}>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
          </Route>
          <Route element={<RequireAuth/>}>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/mypage" element={<MyPage/>}/>
            <Route path="/music-taste/artists" element={<SelectArtist/>}/>
            <Route path="/music-taste/genres" element={<SelectGenre/>}/>
            <Route path="/music-taste/playlists" element={<SelectPlaylist/>}/>
            <Route path="*" element={<Navigate to="/home" replace/>}/>
          </Route>
        </Routes>
      </MusicTasteProvider>
    </BrowserRouter>
  );
}

export default App;
