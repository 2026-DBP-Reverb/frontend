import { useMemo, useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import SearchBar from "../../components/SearchBar";
import MeetingListCard from "../components/MeetingListCard";
import * as M from "../style/StyledMeeting";

const meetings = [
  {
    id: 1,
    title: "부산락페 동행해요",
    image: "/images/meeting2.svg",
    currentMembers: 2,
    maxMembers: 4,
    date: "2026년 10월 2일",
    tags: ["부산", "페스티벌"],
    joined: false,
  },
  {
    id: 2,
    title: "긴 텍스트 가나다라 모임 마바사 아자차카 타파하",
    image: "/images/meeting1.svg",
    currentMembers: 2,
    maxMembers: 4,
    date: "2026년 10월 2일",
    tags: ["인천", "기타"],
    joined: true,
  },
  {
    id: 3,
    title: "에즈라콜렉티브 내한공연",
    image: "/images/meeting1.svg",
    currentMembers: 1,
    maxMembers: 2,
    date: "2026년 10월 2일",
    tags: ["광진구", "콘서트"],
    joined: true,
  },
  {
    id: 4,
    title: "엘피바 같이 가실 분",
    image:"/images/meeting2.svg",
    currentMembers: 1,
    maxMembers: 3,
    date: "2026년 10월 2일",
    tags: ["용산구", "리스닝"],
    joined: false,
  },
  {
    id: 5,
    title: "에즈라콜렉티브 내한공연",
    image: "/images/meeting1.svg",
    currentMembers: 1,
    maxMembers: 2,
    date: "2026년 10월 2일",
    tags: ["광진구", "콘서트"],
    joined: false,
  },
  {
    id: 6,
    title: "엘피바 같이 가실 분",
    image: "/images/meeting2.svg",
    currentMembers: 1,
    maxMembers: 3,
    date: "2026년 10월 2일",
    tags: ["용산구", "리스닝"],
    joined: false,
  },
];

export default function MeetingPage() {
  const [activeTab, setActiveTab] = useState("browse");
  const [searchText, setSearchText] = useState("");

  const visibleMeetings = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    return meetings.filter((meeting) => {
      const matchesTab = activeTab === "browse" || meeting.joined;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        meeting.title.toLowerCase().includes(normalizedSearch) ||
        meeting.tags.some((tag) =>
          tag.toLowerCase().includes(normalizedSearch)
        );

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchText]);

  return (
    <main className="page-layout page-layout--with-navigation">
      <div className="page-content">
        <M.Content>
          <M.Header>
            <M.AccentText>모임</M.AccentText>
            <span>으로 함께해요</span>
          </M.Header>

          <SearchBar
            value={searchText}
            onChange={setSearchText}
            placeholder="모임 검색..."
          />

          <M.TabList role="tablist" aria-label="모임 목록">
            <M.TabButton
              type="button"
              role="tab"
              aria-selected={activeTab === "browse"}
              $active={activeTab === "browse"}
              onClick={() => setActiveTab("browse")}
            >
              둘러보기
            </M.TabButton>
            <M.TabButton
              type="button"
              role="tab"
              aria-selected={activeTab === "joined"}
              $active={activeTab === "joined"}
              onClick={() => setActiveTab("joined")}
            >
              가입한 모임
            </M.TabButton>
          </M.TabList>

          <M.MeetingList>
            {visibleMeetings.map((meeting) => (
              <MeetingListCard key={meeting.id} {...meeting} />
            ))}

            {visibleMeetings.length === 0 && (
              <M.EmptyMessage>해당하는 모임이 없어요.</M.EmptyMessage>
            )}
          </M.MeetingList>
        </M.Content>

        <M.FloatingActionLayer>
          <M.CreateMeetingButton type="button">
            모임 만들기
          </M.CreateMeetingButton>
        </M.FloatingActionLayer>

        <NavigationBar />
      </div>
    </main>
  );
}
