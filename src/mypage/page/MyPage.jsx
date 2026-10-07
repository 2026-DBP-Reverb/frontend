import ProfileCard from "../../components/ProfileCard";
import NavigationBar from "../../components/NavigationBar";
import MenuList from "../../components/MenuList";
import { MyPageMenu } from "../style/StyledMyPage";

const myInfoMenus = [
  {
    icon: "/images/EditIcon.svg",
    label: "음악 취향 수정하기",
    to: "/mypage/edit-music-taste",
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

const accountMenus = [
  {
    icon: "/images/LogoutIcon.svg",
    label: "로그아웃",
    onClick: null,
  },
  {
    icon: "/images/DeleteAccIcon.svg",
    label: "회원 탈퇴",
    onClick: null,
  },
];

export default function MyPage() {
  return (
    <main className="page-layout page-layout--with-navigation">
      <div className="page-content">
        <div style={{paddingTop: "60px"}}/>

        <ProfileCard
          name="박솜솜"
          profileImage="/images/Profile2.svg"
          buttonText="프로필 편집"
        />

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