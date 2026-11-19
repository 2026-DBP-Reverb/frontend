import styled, {css} from "styled-components";
import {labelText, text1, text1Bold, text2, title2} from "../../styles/typography";

// 제목 + 총액
export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  margin: 24px 0 20px;
  padding: 0 5px;
`;

export const Title = styled.h1`
  ${title2}
  margin: 0;
  color: var(--Black);
`;

export const TotalAmount = styled.p`
  ${title2}
  margin: 0;
  color: var(--Black);
`;

// 정산 정보 박스
export const InfoBox = styled.dl`
  display: grid;
  grid-template-columns: 80px 1fr;
  row-gap: 8px;
  width: 100%;
  margin: 0;
  padding: 14px 12px;
  border: 1px solid var(--Gray, #bdbdbd);
  border-radius: 8px;
`;

export const InfoLabel = styled.dt`
  ${text1Bold}
  color: var(--Gray, #bdbdbd);
`;

export const InfoValue = styled.dd`
  ${text1}
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  color: var(--Black);
  word-break: break-all;
`;

export const SmallProfile = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
`;

// 정산 멤버
export const SectionTitle = styled.h2`
  ${text1Bold}
  width: 100%;
  margin: 24px 0 4px;
  color: var(--Black);
`;

export const MemberList = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
`;

// $muted: 결제자 또는 정산 완료 → 회색 처리
export const MemberRow = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 18px 0;
  border-bottom: 1px solid var(--Gray, #bdbdbd);
  color: ${({$muted}) => ($muted ? "var(--Gray, #bdbdbd)" : "var(--Black)")};
`;

export const MemberProfile = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

export const MemberNickname = styled.span`
  ${text2}
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MemberAmount = styled.strong`
  ${text2}
  flex-shrink: 0;
  font-weight: 700;

  span {
    ${text1}
    font-weight: 400;
  }
`;

// 상태 뱃지 / 버튼 공통 모양
const badgeStyle = css`
  ${labelText}
  flex-shrink: 0;
  padding: 2px 8px;
  border-radius: 4px;
  background: transparent;
  white-space: nowrap;
`;

// 회색 뱃지 (결제자, ○○ 완료)
export const MutedBadge = styled.span`
  ${badgeStyle}
  border: 1px solid var(--Gray, #bdbdbd);
  color: var(--Gray, #bdbdbd);
`;

// 진한 뱃지 (정산 완료 요청 중)
export const PendingBadge = styled.span`
  ${badgeStyle}
  border: 1px solid var(--Slate-Blue, #48535c);
  color: var(--Slate-Blue, #48535c);
`;

// 버건디 버튼 (정산 완료 요청하기)
export const ActionButton = styled.button`
  ${badgeStyle}
  border: 1px solid var(--DWU-Burgundy, #782c43);
  color: var(--DWU-Burgundy, #782c43);
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export const Message = styled.p`
  ${text1}
  width: 100%;
  margin: 24px 0;
  color: var(--Gray, #bdbdbd);
  text-align: center;
`;