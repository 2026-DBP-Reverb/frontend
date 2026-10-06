import NavigationBar from '../../components/NavigationBar';
import MeetingBanner from '../../components/MeetingBanner';
import UserCard from '../../components/UserCard';
import MeetingCard from '../../components/MeetingCard';
import useDragScroll from '../hooks/useDragScroll';
import * as H from '../style/StyledHome';

export default function HomePage() {
  const meetingDragHandlers = useDragScroll();

  const mates = [
    {
      id: 1,
      name: "박솜솜",
      profileImage: `${process.env.PUBLIC_URL}/images/Profile1.svg`,
      favoriteArtists: ["YOASOBI", "TWS", "RIIZE"],
      matchRate: 95,
    },
    {
      id: 2,
      name: "박솜솜",
      profileImage: `${process.env.PUBLIC_URL}/images/Profile2.svg`,
      favoriteArtists: ["YOASOBI", "TWS", "RIIZE"],
      matchRate: 95,
    },
    {
      id: 3,
      name: "박솜솜",
      profileImage: `${process.env.PUBLIC_URL}/images/Profile2.svg`,
      favoriteArtists: ["YOASOBI", "TWS", "RIIZE"],
      matchRate: 95,
    },
  ];
  const meetings = [
    {
      id: 1,
      title: "부산락페 동행",
      image: `${process.env.PUBLIC_URL}/images/Meeting1.svg`,
      currentMembers: 2,
      maxMembers: 4,
    },
    {
      id: 2,
      title: "LP바 동행 긴테스트 가나다라마",
      image: `${process.env.PUBLIC_URL}/images/Meeting2.svg`,
      currentMembers: 12,
      maxMembers: 123,
    },
  ];
  return (
    <main className="page-layout page-layout--with-navigation">
      <div className="page-content">
        <H.Header>
          <H.AccentText>나와 음악 취향이</H.AccentText>
          <H.HeaderText>딱 맞는 메이트 찾기</H.HeaderText>
        </H.Header>
        <MeetingBanner hasMusicPreference={true}></MeetingBanner>
        <H.MateList>
          {mates.map((mate) => (
            <UserCard key={mate.id} {...mate} />
          ))}
        </H.MateList>
        <H.FindTitle>
          <H.FindAccent>음악 모임</H.FindAccent>을 둘러봐요
        </H.FindTitle>
        <H.MeetingList {...meetingDragHandlers}>
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} {...meeting} />
          ))}
        </H.MeetingList>
        <NavigationBar />
      </div>
    </main>
  );
}
