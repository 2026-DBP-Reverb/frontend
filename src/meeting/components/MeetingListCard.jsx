import * as M from "../style/StyledMeeting";

const FALLBACK_IMAGE = "/images/Meeting1.svg";

export default function MeetingListCard({
  title,
  image,
  currentMembers,
  maxMembers,
  date,
  tags,
}) {
  const handleImageError = (event) => {
    if (event.currentTarget.src.endsWith(FALLBACK_IMAGE)) {
      return;
    }

    event.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <M.MeetingCard>
      <M.MeetingImageFrame>
        <M.MeetingImage
          src={image}
          alt=""
          onError={handleImageError}
        />
      </M.MeetingImageFrame>

      <M.MeetingInfo>
        <M.MeetingSummary>
          <M.MeetingTitle>{title}</M.MeetingTitle>
          <M.MeetingMeta>
            <span>{currentMembers}명 / {maxMembers}명</span>
            <M.MetaSeparator aria-hidden="true">·</M.MetaSeparator>
            <span>{date}</span>
          </M.MeetingMeta>
        </M.MeetingSummary>

        <M.TagList aria-label="모임 태그">
          {tags.map((tag) => (
            <M.Tag key={tag}>{tag}</M.Tag>
          ))}
        </M.TagList>
      </M.MeetingInfo>
    </M.MeetingCard>
  );
}
