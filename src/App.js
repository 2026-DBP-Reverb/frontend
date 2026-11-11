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
import CreateMeetingPage from './meeting/page/CreateMeetingPage';
import EditMeetingPage from './meeting/page/EditMeetingPage';
import MeetingDetailPage from './meeting/page/MeetingDetailPage';
import MeetingMembersPage from './meeting/page/MeetingMembersPage';
import MyMeetingsPage from './meeting/page/MyMeetingsPage';
import FindMatesPage from "./findmates/page/FindMatesPage";
import MateProfilePage from "./findmates/page/MateProfilePage";
import MyMatesPage from "./findmates/page/MyMatesPage";
import MeetingPage from "./meeting/page/MeetingPage";


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
            <Route path="/meetings/new" element={<CreateMeetingPage />} />
            <Route path="/meetings/:meetupId" element={<MeetingDetailPage />} />
            <Route path="/meetings/:meetupId/edit" element={<EditMeetingPage />} />
            <Route path="/meetings/:meetupId/members" element={<MeetingMembersPage />} />
            <Route path="/mypage/meetings" element={<MyMeetingsPage />} />
            <Route path="/findmates" element={<FindMatesPage/>}/>
            <Route path="/findmates/:memberId" element={<MateProfilePage/>}/>
            <Route path="/mypage/mates" element={<MyMatesPage/>}/>
            <Route path="/meetings" element={<MeetingPage/>}/>
            <Route path="*" element={<Navigate to="/home" replace/>}/>
          </Route>
        </Routes>
      </MusicTasteProvider>
    </BrowserRouter>
  );
}

export default App;

