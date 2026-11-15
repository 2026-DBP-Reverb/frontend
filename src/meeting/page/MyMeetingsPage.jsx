import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import { deleteMeeting, getHostedMeetups } from '../api/meetingApi';
import {
  DEFAULT_MEETING_IMAGE_URL,
  resolveMeetupImageUrl,
} from '../api/meetupApi';
import * as S from '../style/StyledMyMeetings';

const meetingDateFormat = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

function formatMeetingDate(value) {
  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? value : meetingDateFormat.format(date);
}

export default function MyMeetingsPage() {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');
  const [deletingMeetingId, setDeletingMeetingId] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    getHostedMeetups({ signal: controller.signal })
      .then((data) => {
        if (!controller.signal.aborted) {
          setMeetings(data);
        }
      })
      .catch((error) => {
        if (!controller.signal.aborted) {
          setErrorMessage(error.message);
        }
      });

    return () => controller.abort();
  }, []);

  async function handleDelete(meeting) {
    if (
      deletingMeetingId !== null ||
      !window.confirm(`'${meeting.title}' 모임을 삭제하시겠어요?`)
    ) {
      return;
    }

    setDeletingMeetingId(meeting.meetupId);
    setDeleteErrorMessage('');

    try {
      await deleteMeeting(meeting.meetupId);
      setMeetings((previous) =>
        previous.filter(({ meetupId }) => meetupId !== meeting.meetupId)
      );
    } catch (error) {
      setDeleteErrorMessage(error.message);
    } finally {
      setDeletingMeetingId(null);
    }
  }

  return (
    <main className="page-layout">
      <div className="page-content">
        <S.Container>
          <BackButton onClick={() => navigate(-1)} />

          <S.Title>내가 개설한 모임</S.Title>

          {errorMessage && (
            <S.ErrorMessage role="alert">{errorMessage}</S.ErrorMessage>
          )}

          {deleteErrorMessage && (
            <S.ErrorMessage role="alert">
              {deleteErrorMessage}
            </S.ErrorMessage>
          )}

          {!errorMessage && !meetings && (
            <S.StatusMessage role="status">
              내가 개설한 모임을 불러오는 중...
            </S.StatusMessage>
          )}

          {meetings?.length === 0 && (
            <S.StatusMessage>개설한 모임이 없습니다.</S.StatusMessage>
          )}

          {meetings?.length > 0 && (
            <S.MeetingList>
              {meetings.map((meeting) => (
                <S.MeetingItem key={meeting.meetupId}>
                  <S.MeetingImage
                    src={resolveMeetupImageUrl(meeting.imageUrl)}
                    alt={`${meeting.title} 모임`}
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = DEFAULT_MEETING_IMAGE_URL;
                    }}
                  />

                  <S.MeetingContent>
                    <S.MeetingInfo>
                      <S.MeetingTitle>{meeting.title}</S.MeetingTitle>
                      <S.MeetingMeta>
                        <span>
                          {meeting.participantCount}명 / {meeting.capacity}명
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{formatMeetingDate(meeting.startsAt)}</span>
                      </S.MeetingMeta>
                    </S.MeetingInfo>

                    <S.ActionRow>
                      <S.PrimaryActions>
                        <S.ActionButton
                          type="button"
                          onClick={() =>
                            navigate(`/meetings/${meeting.meetupId}/edit`)
                          }
                        >
                          수정
                        </S.ActionButton>
                        <S.ActionButton
                          type="button"
                          onClick={() =>
                            navigate(`/meetings/${meeting.meetupId}/members`)
                          }
                        >
                          멤버 관리
                        </S.ActionButton>
                      </S.PrimaryActions>
                      <S.DeleteButton
                        type="button"
                        disabled={deletingMeetingId !== null}
                        onClick={() => handleDelete(meeting)}
                      >
                        {deletingMeetingId === meeting.meetupId
                          ? '삭제 중...'
                          : '삭제'}
                      </S.DeleteButton>
                    </S.ActionRow>
                  </S.MeetingContent>
                </S.MeetingItem>
              ))}
            </S.MeetingList>
          )}
        </S.Container>
      </div>
    </main>
  );
}
