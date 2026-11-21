import styled, {css} from "styled-components";
import {labelText, text1, text1Bold, text2, title2} from "../../styles/typography";

// 제목 + 총액 (피그마: 돌아가기 아래 30px, 제목-총액 간격 5px, 좌측 5px)
export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  margin: 30px 0 24px;
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

// 정산 정보 박스 (피그마: 패딩 14px 12px, 줄 간격 6px, 줄 높이 20px)
export const InfoBox = styled.dl`
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-auto-rows: 20px;
  row-gap: 6px;
  width: 100%;
  margin: 0;
  padding: 14px 12px;
  border: 1px solid var(--Gray, #bdbdbd);
  border-radius: 8px;
`;

export const InfoLabel = styled.dt`
  ${text1Bold}
  display: flex;
  align-items: center;
  color: var(--Gray, #bdbdbd);
`;

export const InfoValue = styled.dd`
  ${text1}
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  margin: 0;
  color: var(--Black);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const SmallProfile = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 50%;
  object-fit: cover;
`;

// 정산 멤버 (피그마: 정보 박스 아래 24px, 제목 아래 20px)
export const SectionTitle = styled.h2`
  ${text1Bold}
  width: 100%;
  margin: 24px 0 20px;
  color: var(--Black);
`;

// 멤버 줄 사이 간격 20px
export const MemberList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
`;

// 한 줄: 내용 30px + 아래 여백 20px + 구분선 / 요소 사이 10px
// $muted: 결제자 또는 정산 완료 → 회색 처리
export const MemberRow = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--Gray, #bdbdbd);
  color: ${({$muted}) => ($muted ? "var(--Gray, #bdbdbd)" : "var(--Black)")};
`;

// 프사 + 닉네임 묶음 (남는 공간 차지, 프사-닉네임 8px)
export const MemberInfo = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  gap: 8px;
  min-width: 0;
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

// 뱃지 공통 (피그마: 패딩 4px 8px, 테두리 0.8px, 모서리 4px, 12px 글씨)
const badgeStyle = css`
  ${labelText}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 4px 8px;
  border-radius: 4px;
  background: transparent;
  white-space: nowrap;
`;

// 회색 뱃지 (결제자, ○○ 완료)
export const MutedBadge = styled.span`
  ${badgeStyle}
  border: 0.8px solid var(--Gray, #bdbdbd);
  color: var(--Gray, #bdbdbd);
`;

// 진한 뱃지 (정산 완료 요청 중)
export const PendingBadge = styled.span`
  ${badgeStyle}
  border: 0.8px solid var(--Slate-Blue, #48535c);
  color: var(--Slate-Blue, #48535c);
`;

// 버건디 버튼 (정산 완료 요청하기)
export const ActionButton = styled.button`
  ${badgeStyle}
  border: 0.8px solid var(--DWU-Burgundy, #782c43);
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