import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import { getMeeting } from '../api/meetingApi';
import * as S from '../style/StyledMeetingMembers';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ?? 'http://localhost:8080';
const DEFAULT_PROFILE_IMAGE_URL = '/images/Profile1.svg';

function resolveProfileImageUrl(imageUrl) {
  if (!imageUrl) {
    return DEFAULT_PROFILE_IMAGE_URL;
  }

  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl;
  }

  return new URL(imageUrl, API_BASE_URL).toString();
}

function handleProfileImageError(event) {
  event.currentTarget.onerror = null;
  event.currentTarget.src = DEFAULT_PROFILE_IMAGE_URL;
}

export default function MeetingMembersPage() {
  const navigate = useNavigate();
  const { meetupId } = useParams();
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadMembers() {
      try {
        const meeting = await getMeeting(meetupId);

        if (!meeting) {
          throw new Error('모임 정보를 불러오지 못했습니다.');
        }

        if (!meeting.host) {
          throw new Error('모임장만 멤버를 관리할 수 있습니다.');
        }

        if (isMounted) {
          const manageableMembers = (meeting.participants ?? []).filter(
            (participant) => participant.memberId !== meeting.hostMemberId
          );

          setMembers(manageableMembers);
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

    loadMembers();

    return () => {
      isMounted = false;
    };
  }, [meetupId]);

  return (
    <main className="page-layout">
      <div className="page-content">
        <S.Container>
          <BackButton onClick={() => navigate(-1)} />

          <S.Content>
            <S.Title>모임 멤버 목록</S.Title>

            {isLoading && (
              <S.StatusMessage role="status">
                멤버 목록을 불러오는 중...
              </S.StatusMessage>
            )}

            {!isLoading && errorMessage && (
              <S.StatusMessage role="alert">{errorMessage}</S.StatusMessage>
            )}

            {!isLoading && !errorMessage && members.length === 0 && (
              <S.StatusMessage>참여 중인 멤버가 없습니다.</S.StatusMessage>
            )}

            {!isLoading && !errorMessage && members.length > 0 && (
              <S.MemberList>
                {members.map((member) => (
                  <S.MemberRow key={member.memberId}>
                    <S.ProfileImage
                      src={resolveProfileImageUrl(member.profileImageUrl)}
                      alt={`${member.nickname} 프로필`}
                      onError={handleProfileImageError}
                    />
                    <S.Nickname>{member.nickname}</S.Nickname>
                    <S.KickButton
                      type="button"
                      aria-label={`${member.nickname} 강퇴`}
                    >
                      강퇴
                    </S.KickButton>
                  </S.MemberRow>
                ))}
              </S.MemberList>
            )}
          </S.Content>
        </S.Container>
      </div>
    </main>
  );
}
