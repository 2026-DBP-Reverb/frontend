import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import * as S from '../style/StyledMyMeetings';

const meetings = [
  {
    id: 1,
    title: '부산락페 동행해요',
    imageUrl: '/images/ManagedMeetingCover.png',
    currentMembers: 2,
    capacity: 4,
    startsAt: '2026년 10월 2일',
  },
  {
    id: 2,
    title: '부산락페 동행해요',
    imageUrl: '/images/ManagedMeetingCover.png',
    currentMembers: 2,
    capacity: 4,
    startsAt: '2026년 10월 2일',
  },
  {
    id: 3,
    title: '부산락페 동행해요',
    imageUrl: '/images/ManagedMeetingCover.png',
    currentMembers: 2,
    capacity: 4,
    startsAt: '2026년 10월 2일',
  },
];

export default function MyMeetingsPage() {
  const navigate = useNavigate();

  return (
    <main className="page-layout">
      <div className="page-content">
        <S.Container>
          <BackButton onClick={() => navigate(-1)} />

          <S.Title>내가 개설한 모임</S.Title>

          <S.MeetingList>
            {meetings.map((meeting) => (
              <S.MeetingItem key={meeting.id}>
                <S.MeetingImage
                  src={meeting.imageUrl}
                  alt={`${meeting.title} 모임`}
                />

                <S.MeetingContent>
                  <S.MeetingInfo>
                    <S.MeetingTitle>{meeting.title}</S.MeetingTitle>
                    <S.MeetingMeta>
                      <span>
                        {meeting.currentMembers}명 / {meeting.capacity}명
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{meeting.startsAt}</span>
                    </S.MeetingMeta>
                  </S.MeetingInfo>

                  <S.ActionRow>
                    <S.PrimaryActions>
                      <S.ActionButton
                        type="button"
                        onClick={() => navigate(`/meetings/${meeting.id}/edit`)}
                      >
                        수정
                      </S.ActionButton>
                      <S.ActionButton
                        type="button"
                        onClick={() =>
                          navigate(`/meetings/${meeting.id}/members`)
                        }
                      >
                        멤버 관리
                      </S.ActionButton>
                    </S.PrimaryActions>
                    <S.DeleteButton type="button">삭제</S.DeleteButton>
                  </S.ActionRow>
                </S.MeetingContent>
              </S.MeetingItem>
            ))}
          </S.MeetingList>
        </S.Container>
      </div>
    </main>
  );
}
