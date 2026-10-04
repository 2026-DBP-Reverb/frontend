import styled from "styled-components";
import { Link } from "react-router-dom";
import { text2 } from "../styles/typography";
import { text2Bold } from "../styles/typography";

const Card = styled.div`
  position: relative;
  width: min(368px, calc(100vw - 32px));
  margin-top: 25px;
  align-self: center;
`;

const CardImg = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const CardContent = styled.div`
  position: absolute;
  right: ${({ $isRegistered }) => ($isRegistered ? '20px' : '16px')};
  bottom: 24px;
  left: ${({ $isRegistered }) => ($isRegistered ? '20px' : '16px')};
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${({ $isRegistered }) => ($isRegistered ? '12px' : '4px')};
  color: var(--White, #fafafa);
`;

const Description = styled.p`
  ${text2}
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
  ${text2Bold}
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
      <CardImg
        src={`${process.env.PUBLIC_URL}/images/MeetingCard.svg`}
        alt="cardImg"
      />
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
