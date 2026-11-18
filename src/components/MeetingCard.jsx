import styled from "styled-components";
// import { Link } from "react-router-dom";
import { text1 } from "../styles/typography";

// 상세 페이지 연결 확정 후 styled(Link)로 다시 변경합니다.
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

  display: flex;
  flex-direction: column;
  align-items: center;
  color: inherit;
  text-decoration: none;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  border-radius: 8px;
  user-select: none;
  pointer-events: none;
`;

const CardInfo = styled.div`
  ${text1};
  position: absolute;
  right: 0;
  bottom: 15px;
  left: 0;

  display: flex;
  box-sizing: border-box;
  padding: 0 15px;
  justify-content: space-between;
  align-items: flex-end;

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
  line-height: 1.3;
`;

export default function MeetingCard({
                                      title,
                                      image,
                                      currentMembers,
                                      maxMembers,
                                    }) {
  return (
    // 상세 페이지 연결 논의 후: <Card to={`/meetings/${id}`}> 형태로 연결합니다.
    <Card>
      <CardImage src={image} alt="" draggable="false"/>
      <CardInfo>
        <Title>{title}</Title>
        <MemberCount>
          ({currentMembers}명 / {maxMembers}명)
        </MemberCount>
      </CardInfo>
    </Card>
  );
}
