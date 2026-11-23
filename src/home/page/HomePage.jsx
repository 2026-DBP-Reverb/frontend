import { useEffect, useState } from 'react';
import NavigationBar from '../../components/NavigationBar';
import MeetingBanner from '../../components/MeetingBanner';
import UserCard from '../../components/UserCard';
import MeetingCard from '../../components/MeetingCard';
import { getMyArtists } from '../../musictaste/api/musicTasteApi';
import { resolveMeetupImageUrl } from '../../meeting/api/meetupApi';
import {
  getRecentHomeMeetups,
  getRecentHomeMembers,
} from '../api/homeApi';
import useDragScroll from '../hooks/useDragScroll';
import * as H from '../style/StyledHome';

export default function HomePage() {
  const meetingDragHandlers = useDragScroll();
  const [hasMusicPreference, setHasMusicPreference] = useState(true);
  const [mates, setMates] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [isHomeLoading, setIsHomeLoading] = useState(true);
  const [membersError, setMembersError] = useState('');
  const [meetupsError, setMeetupsError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadMusicPreference() {
      try {
        const artists = await getMyArtists();

        if (isMounted) {
          setHasMusicPreference(artists.length > 0);
        }
      } catch (error) {
        console.error('음악 취향 아티스트 정보를 불러오지 못했습니다.', error);
      }
    }

    loadMusicPreference();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadHomeData() {
      setIsHomeLoading(true);
      setMembersError('');
      setMeetupsError('');

      const [membersResult, meetupsResult] = await Promise.allSettled([
        getRecentHomeMembers(),
        getRecentHomeMeetups(),
      ]);

      if (!isMounted) {
        return;
      }

      if (membersResult.status === 'fulfilled') {
        setMates(
          membersResult.value.map((member) => ({
            id: member.memberId,
            name: member.nickname,
            profileImage: member.profileImageUrl,
            favoriteArtists: Array.isArray(member.hashtags)
              ? member.hashtags
              : [],
            matchRate: member.matchRate,
          }))
        );
      } else {
        setMembersError(membersResult.reason.message);
      }

      if (meetupsResult.status === 'fulfilled') {
        setMeetings(
          meetupsResult.value.map((meeting) => ({
            id: meeting.meetupId,
            title: meeting.title,
            image: resolveMeetupImageUrl(meeting.imageUrl),
            currentMembers: meeting.participantCount,
            maxMembers: meeting.capacity,
          }))
        );
      } else {
        setMeetupsError(meetupsResult.reason.message);
      }

      setIsHomeLoading(false);
    }

    loadHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="page-layout page-layout--with-navigation">
      <div className="page-content">
        <H.Header>
          <H.AccentText>나와 음악 취향이</H.AccentText>
          <H.HeaderText>딱 맞는 메이트 찾기</H.HeaderText>
        </H.Header>
        <MeetingBanner hasMusicPreference={hasMusicPreference} />
        <H.MateList>
          {isHomeLoading && <H.StateMessage>회원 정보를 불러오는 중...</H.StateMessage>}
          {!isHomeLoading && membersError && (
            <H.StateMessage role="alert">{membersError}</H.StateMessage>
          )}
          {!isHomeLoading && !membersError && mates.length === 0 && (
            <H.StateMessage>최근 가입한 회원이 없어요.</H.StateMessage>
          )}
          {!isHomeLoading && !membersError && mates.map((mate) => (
            <UserCard key={mate.id} {...mate} />
          ))}
        </H.MateList>
        <H.FindTitle>
          <H.FindAccent>음악 모임</H.FindAccent>을 둘러봐요
        </H.FindTitle>
        <H.MeetingList {...meetingDragHandlers}>
          {isHomeLoading && <H.StateMessage>모임을 불러오는 중...</H.StateMessage>}
          {!isHomeLoading && meetupsError && (
            <H.StateMessage role="alert">{meetupsError}</H.StateMessage>
          )}
          {!isHomeLoading && !meetupsError && meetings.length === 0 && (
            <H.StateMessage>최근 등록된 모임이 없어요.</H.StateMessage>
          )}
          {!isHomeLoading && !meetupsError && meetings.map((meeting) => (
            <MeetingCard key={meeting.id} {...meeting} />
          ))}
        </H.MeetingList>
        <NavigationBar />
      </div>
    </main>
  );
}
