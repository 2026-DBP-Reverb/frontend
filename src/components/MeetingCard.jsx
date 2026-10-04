import styled from "styled-components";
import { text1 } from "../styles/typography";

const Card = styled.div`
  position: relative;
  flex: 0 0 200px;
  width: 200px;
  height: 160px;
  overflow: hidden;
  border-radius: 8px;
  background: linear-gradient(
    180deg,
    rgba(23, 23, 27, 0.15) 0%,
    rgba(23, 23, 27, 0.8) 100%
  );
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  border-radius: 8px;
`;

const CardInfo = styled.div`
  ${text1}
  position: absolute;
  right: 10px;
  bottom: 10px;
  left: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 8px;
  color: var(--White, #fafafa);
`;

const Title = styled.span`
  min-width: 0;
  overflow: hidden;
  line-height: 1.3;
`;

const MemberCount = styled.span`
  flex-shrink: 0;
  white-space: nowrap;
`;

export default function MeetingCard({
  title,
  image,
  currentMembers,
  maxMembers,
}) {
  return (
    <Card>
      <CardImage src={image} />
      <CardInfo>
        <Title>{title}</Title>
        <MemberCount>
          ({currentMembers}명 / {maxMembers}명)
        </MemberCount>
      </CardInfo>
    </Card>
  );
}
