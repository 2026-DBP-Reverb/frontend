import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import { getMeeting, joinMeeting, leaveMeeting } from '../api/meetingApi';
import * as S from '../style/StyledMeetingDetail';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ?? 'http://localhost:8080';
const DEFAULT_MEETING_IMAGE_URL = '/images/Meeting1.svg';
const DEFAULT_PROFILE_IMAGE_URL = '/images/Profile1.svg';
const CATEGORY_LABELS = {
  CONCERT: '콘서트',
  FESTIVAL: '페스티벌',
  LISTENING: '리스닝',
  OTHER: '기타',
};

function resolveMeetingImageUrl(imageUrl) {
  if (!imageUrl) {
    return DEFAULT_MEETING_IMAGE_URL;
  }

  return imageUrl;
}

function resolveProfileImageUrl(imageUrl) {
  if (!imageUrl) {
    return DEFAULT_PROFILE_IMAGE_URL;
  }

  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl;
  }

  return new URL(imageUrl, API_BASE_URL).toString();
}

function formatMeetingDate(value) {
  if (!value) {
    return '';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

function getRecruitmentState(meeting) {
  if (['COMPLETED', 'CANCELLED'].includes(meeting.status)) {
    return { label: '모임 완료', variant: 'completed' };
  }

  if (
    meeting.status === 'CLOSED' ||
    meeting.participantCount >= meeting.capacity
  ) {
    return { label: '모집 마감', variant: 'closed' };
  }

  return { label: '모집 중', variant: 'open' };
}

export default function MeetingDetailPage() {
  const navigate = useNavigate();
  const { meetupId } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [actionErrorMessage, setActionErrorMessage] = useState('');
  const [isUpdatingParticipation, setIsUpdatingParticipation] =
    useState(false);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    setErrorMessage('');
    setActionErrorMessage('');
    setIsUpdatingParticipation(false);
    setMeeting(null);

    async function loadMeeting() {
      try {
        const data = await getMeeting(meetupId);

        if (!data) {
          throw new Error('모임 정보를 불러오지 못했습니다.');
        }

        if (isMounted) {
          setMeeting(data);
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

    loadMeeting();

    return () => {
      isMounted = false;
    };
  }, [meetupId]);

  if (isLoading || errorMessage || !meeting) {
    return (
      <main className="page-layout">
        <div className="page-content">
          <S.Container>
            <BackButton onClick={() => navigate(-1)} />
            <S.StatusMessage role={errorMessage ? 'alert' : 'status'}>
              {errorMessage || '모임 정보를 불러오는 중...'}
            </S.StatusMessage>
          </S.Container>
        </div>
      </main>
    );
  }

  const recruitment = getRecruitmentState(meeting);
  const isFull = meeting.participantCount >= meeting.capacity;
  const canJoin =
    !meeting.joined &&
    !meeting.host &&
    meeting.status === 'OPEN' &&
    !isFull;
  const showUnavailableAction =
    !meeting.joined && !meeting.host && !canJoin;
  const showLeaveAction = meeting.joined && !meeting.host;

  const refreshMeeting = async () => {
    const data = await getMeeting(meetupId);

    if (!data) {
      throw new Error('모임 정보를 불러오지 못했습니다.');
    }

    setMeeting(data);
  };

  const handleJoin = async () => {
    if (isUpdatingParticipation) {
      return;
    }

    try {
      setIsUpdatingParticipation(true);
      setActionErrorMessage('');
      await joinMeeting(meetupId);
      await refreshMeeting();
    } catch (error) {
      setActionErrorMessage(error.message);
    } finally {
      setIsUpdatingParticipation(false);
    }
  };

  const handleLeave = async () => {
    if (
      isUpdatingParticipation ||
      !window.confirm('모임에서 탈퇴하시겠어요?')
    ) {
      return;
    }

    try {
      setIsUpdatingParticipation(true);
      setActionErrorMessage('');
      await leaveMeeting(meetupId);
      await refreshMeeting();
    } catch (error) {
      setActionErrorMessage(error.message);
    } finally {
      setIsUpdatingParticipation(false);
    }
  };

  return (
    <main className="page-layout">
      <div className="page-content">
        <S.Container>
          <BackButton onClick={() => navigate(-1)} />

          <S.Header>
            <S.MeetingImage
              src={resolveMeetingImageUrl(meeting.imageUrl)}
              alt={`${meeting.title} 모임`}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = DEFAULT_MEETING_IMAGE_URL;
              }}
            />
            <S.Title>{meeting.title}</S.Title>

            <S.TagGroup>
              <S.CategoryTag>
                {CATEGORY_LABELS[meeting.category] ?? meeting.category}
              </S.CategoryTag>
              <S.RecruitmentTag $variant={recruitment.variant}>
                {recruitment.label}
              </S.RecruitmentTag>
            </S.TagGroup>

            <S.MetaList>
              <S.MetaRow>
                <S.MetaLabel>
                  <S.MetaIcon src="/images/LocationGray.svg" alt="" />
                  <span>장소</span>
                </S.MetaLabel>
                <S.MetaValue>{meeting.place}</S.MetaValue>
              </S.MetaRow>
              <S.MetaRow>
                <S.MetaLabel>
                  <S.MetaIcon src="/images/CalendarGray.svg" alt="" />
                  <span>일시</span>
                </S.MetaLabel>
                <S.MetaValue>{formatMeetingDate(meeting.startsAt)}</S.MetaValue>
              </S.MetaRow>
            </S.MetaList>
          </S.Header>

          <S.TabList aria-label="모임 상세 메뉴">
            <S.Tab type="button" $active>
              홈
            </S.Tab>
            <S.Tab type="button" disabled>
              정산
            </S.Tab>
          </S.TabList>

          <S.DescriptionSection>
            <S.SectionTitle>모임 설명</S.SectionTitle>
            <S.Description>{meeting.description}</S.Description>
          </S.DescriptionSection>

          <S.MemberSection>
            <S.SectionTitle>
              멤버 정보 ({meeting.participantCount} / {meeting.capacity})
            </S.SectionTitle>
            <S.MemberList>
              {(meeting.participants ?? []).map((member) => (
                <S.MemberRow key={member.memberId}>
                  <S.ProfileImage
                    src={resolveProfileImageUrl(member.profileImageUrl)}
                    alt={`${member.nickname} 프로필`}
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = DEFAULT_PROFILE_IMAGE_URL;
                    }}
                  />
                  <S.Nickname>{member.nickname}</S.Nickname>
                  {member.memberId === meeting.hostMemberId && (
                    <S.HostTag>모임장</S.HostTag>
                  )}
                </S.MemberRow>
              ))}
            </S.MemberList>

            {showLeaveAction && (
              <S.LeaveButton
                type="button"
                disabled={isUpdatingParticipation}
                onClick={handleLeave}
              >
                {isUpdatingParticipation ? '탈퇴 중...' : '모임 탈퇴하기'}
              </S.LeaveButton>
            )}
          </S.MemberSection>

          {actionErrorMessage && (
            <S.ActionErrorMessage role="alert">
              {actionErrorMessage}
            </S.ActionErrorMessage>
          )}

          {canJoin && (
            <S.FloatingAction
              type="button"
              variant="filled"
              disabled={isUpdatingParticipation}
              onClick={handleJoin}
            >
              {isUpdatingParticipation ? '가입 중...' : '가입하기'}
            </S.FloatingAction>
          )}

          {showUnavailableAction && (
            <S.UnavailableAction type="button" variant="disabled" disabled>
              가입이 불가능해요
            </S.UnavailableAction>
          )}
        </S.Container>
      </div>
    </main>
  );
}
