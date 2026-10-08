import styled from "styled-components";
import { title2, title3 } from "../../styles/typography";

export const Header = styled.div`
  ${title2}
  display: flex;
  flex-direction: column;
  align-self: stretch;
  margin-top: 70px;
  margin-bottom: 25px;
`;

export const AccentText = styled.span`
  color: var(--DWU-Burgundy, #782c43);
`;

export const HeaderText = styled.span`
  color: var(--Black, #17171b);
`;

export const MateList = styled.div`
  width: 100%;
  display: grid;
  margin-bottom: 25px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 5px;
`;

export const FindTitle = styled.div`
  ${title3};
  width: 100%;
`;

export const FindAccent = styled.span`
  color: var(--DWU-Burgundy, #782C43);
`;

export const MeetingList = styled.div`
  width: 100%;
  margin-top: 16px;

  display: flex;
  gap: 5px;
  overflow-x: auto;

  padding-right: 15px;

  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
`;
