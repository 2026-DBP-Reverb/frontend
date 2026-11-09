import styled from "styled-components";
import { title2, text1, text2Bold } from "../../styles/typography";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
  margin-top: 70px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

// 사진 + 이름/인스타/버튼
export const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 12px 8px;
`;

export const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  border-radius: 50%;
  object-fit: cover;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: stretch;
  flex: 1;
  padding: 8px 0;
  box-sizing: border-box;
`;

export const Nickname = styled.span`
  ${title2};
  color: var(--Black, #17171b);
`;

export const Instagram = styled.span`
  ${text1};
  color: var(--Black, #17171b);
`;

// 메이트 신청 / 수락 대기 중 / 매칭 완료 버튼
export const ActionButton = styled.button`
  ${text1};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 32px;
  padding: 0 16px;
  border: 1px solid var(--DWU-Burgundy, #782c43);
  border-radius: 6px;
  background: var(--White, #fafafa);
  color: var(--DWU-Burgundy, #782c43);
  cursor: pointer;

  &:disabled {
    border-color: var(--Gray, #bdbdbd);
    color: var(--Gray, #bdbdbd);
    cursor: default;
  }
`;

// 탭: 선택된 탭은 버건디, 나머지는 회색
export const TabBar = styled.div`
  display: flex;
  width: 100%;
`;

export const Tab = styled.button`
  ${text1};
  flex: 1;
  height: 28px;
  padding: 0;
  border: 0;
  border-bottom: 1px solid
    ${({ $active }) => ($active ? "var(--DWU-Burgundy, #782c43)" : "var(--Gray, #bdbdbd)")};
  background: none;
  color: ${({ $active }) => ($active ? "var(--DWU-Burgundy, #782c43)" : "var(--Gray, #bdbdbd)")};
  cursor: pointer;
`;

export const TabPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 8px;
`;

// 장르 동그라미 (시안은 흩어져 있지만, 개수가 달라져도 깨지지 않게 줄 맞춤)
export const GenreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  padding-top: 40px;
`;

export const GenreCircle = styled.div`
  ${text2Bold};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  border: 2px solid var(--Slate-Blue, #48535c);
  border-radius: 50%;
  color: var(--Slate-Blue, #48535c);
`;

export const EmptyText = styled.p`
  ${text1};
  padding-top: 40px;
  text-align: center;
  color: var(--Gray, #bdbdbd);
`;