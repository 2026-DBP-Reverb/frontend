import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../../components/ProfileCard";
import NavigationBar from "../../components/NavigationBar";
import MenuList from "../../components/MenuList";
import { getMyProfile, logout } from "../../auth/api/memberApi";
import { useMusicTaste } from "../../musictaste/context/MusicTasteContext";
import { MyPageMenu } from "../style/StyledMyPage";

const myInfoMenus = [
  {
    icon: "/images/EditIcon.svg",
    label: "음악 취향 수정하기",
    to: "/music-taste/artists",
  },
  {
    icon: "/images/MatesIcon.svg",
    label: "나의 메이트",
    to: "/mypage/mates",
  },
  {
    icon: "/images/MeetingIconSmall.svg",
    label: "모임 관리하기",
    to: "/mypage/meetings",
  },
];

export default function MyPage() {
  const navigate = useNavigate();
  const {resetTaste} = useMusicTaste();
  const [member, setMember] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadMyProfile() {
      try {
        const data = await getMyProfile();
        setMember(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }

    loadMyProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      resetTaste();
      navigate('/', {replace: true});
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const accountMenus = [
    {
      icon: "/images/LogoutIcon.svg",
      label: "로그아웃",
      onClick: handleLogout,
    },
    {
      icon: "/images/DeleteAccIcon.svg",
      label: "회원 탈퇴",
      onClick: null,
    },
  ];

  return (
    <main className="page-layout page-layout--with-navigation">
      <div className="page-content">
        <div style={{paddingTop: "60px"}}/>

        {member && (
          <ProfileCard
            name={member.nickname}
            profileImage={member.profileImageUrl}
            instagramId={member.instagramId}
            buttonText="프로필 편집"
          />
        )}

        {errorMessage && <p role="alert">{errorMessage}</p>}

        <MyPageMenu>
          <MenuList
            title="내 정보"
            items={myInfoMenus}
          />
          <MenuList
            title="계정"
            items={accountMenus}
          />
        </MyPageMenu>

        <NavigationBar/>
      </div>
    </main>
  );
}
