import styled from "styled-components";
import { Link } from "react-router-dom";
import { text2 } from "../styles/typography";
import { text2Bold } from "../styles/typography";

const Card = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 372 / 180;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 25px;

  background-image:
    linear-gradient(
      180deg,
      rgb(23 23 27 / 15%) 0%,
      rgb(23 23 27 / 80%) 100%
    ),
    url('/images/MeetingBannerImage.jpg');
  
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.40);

  background-position: center;
  background-size: cover;
`;

const CardContent = styled.div`
  position: absolute;
  right: 15px;
  left: 15px;
  bottom: 15px;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${({ $isRegistered }) => ($isRegistered ? '12px' : '4px')};
  color: var(--White, #fafafa);
`;

const Description = styled.p`
  ${text2};
  min-width: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  line-height: 1.35;
`;

const DescriptionLine = styled.span`
  white-space: nowrap;
`;

const DescriptionStrong = styled.strong`
  ${text2Bold}
`;

const MateLink = styled(Link)`
  ${text2Bold};
  flex-shrink: 0;
  color: var(--White, #fafafa);
  text-decoration: none;
  white-space: nowrap;
`;

export default function MeetingBanner({ hasMusicPreference }) {
  const action = hasMusicPreference
    ? {
        label: '메이트 찾기',
        path: '/findmates',
      }
    : {
        label: '취향 등록하기',
        path: '/preferences',
      };

  return (
    <Card>
      <CardContent $isRegistered={hasMusicPreference}>
        <Description>
          <span>내가 좋아하는 음악을</span>
          <DescriptionLine>
            <DescriptionStrong>함께 좋아하는 친구</DescriptionStrong>
            {"를 찾아볼까요"}
          </DescriptionLine>
        </Description>
        <MateLink to={action.path}>
          {action.label} →
        </MateLink>
      </CardContent>
    </Card>
  );
}
