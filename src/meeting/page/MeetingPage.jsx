import { useEffect, useMemo, useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import SearchBar from "../../components/SearchBar";
import { getMeetups, resolveMeetupImageUrl } from "../api/meetupApi";
import MeetingListCard from "../components/MeetingListCard";
import * as M from "../style/StyledMeeting";

const CATEGORY_LABELS = {
  FESTIVAL: "페스티벌",
  CONCERT: "콘서트",
  LISTENING: "리스닝",
  OTHER: "기타",
};

function formatDate(startsAt) {
  if (!startsAt) {
    return "날짜 미정";
  }

  const date = new Date(startsAt);

  if (Number.isNaN(date.getTime())) {
    return "날짜 미정";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function formatPlace(place) {
  if (!place?.trim()) {
    return "장소 미정";
  }

  const firstRegion = place.trim().split(/\s+/)[0];

  return firstRegion.replace(
    /(특별자치도|특별자치시|광역시|특별시)$/,
    ""
  );
}

function toMeetingCard(meetup) {
  return {
    id: meetup.meetupId,
    title: meetup.title,
    image: resolveMeetupImageUrl(meetup.imageUrl),
    currentMembers: meetup.participantCount,
    maxMembers: meetup.capacity,
    date: formatDate(meetup.startsAt),
    tags: [
      formatPlace(meetup.place),
      CATEGORY_LABELS[meetup.category] ?? meetup.category ?? "기타",
    ],
    joined: meetup.joined,
  };
}

export default function MeetingPage() {
  const [meetings, setMeetings] = useState([]);
  const [activeTab, setActiveTab] = useState("browse");
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadMeetups() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const meetupData = await getMeetups();

        if (isMounted) {
          setMeetings(meetupData.map(toMeetingCard));
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadMeetups();

    return () => {
      isMounted = false;
    };
  }, []);

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
  }, [activeTab, meetings, searchText]);

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

          <M.MeetingList aria-live="polite">
            {isLoading && (
              <M.StateMessage>모임을 불러오는 중...</M.StateMessage>
            )}

            {!isLoading && errorMessage && (
              <M.ErrorMessage role="alert">{errorMessage}</M.ErrorMessage>
            )}

            {!isLoading &&
              !errorMessage &&
              visibleMeetings.map((meeting) => (
                <MeetingListCard key={meeting.id} {...meeting} />
              ))}

            {!isLoading &&
              !errorMessage &&
              visibleMeetings.length === 0 && (
                <M.StateMessage>해당하는 모임이 없어요.</M.StateMessage>
              )}
          </M.MeetingList>
        </M.Content>

        <M.FloatingActionLayer>
          <M.CreateMeetingButton to="/meetings/new">
            모임 만들기
          </M.CreateMeetingButton>
        </M.FloatingActionLayer>

        <NavigationBar />
      </div>
    </main>
  );
}
