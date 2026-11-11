import styled from 'styled-components';
import { text1, text1Bold, title2 } from '../../styles/typography';

export const Container = styled.div`
  display: flex;
  width: 100%;
  margin-top: 70px;
  flex-direction: column;
  gap: 25px;
`;

export const Title = styled.h1`
  ${title2}
  margin: 0;
  padding-inline: 16px;
  color: var(--Black, #17171b);
  line-height: normal;
`;

export const MeetingList = styled.ul`
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0;
  flex-direction: column;
  gap: 22px;
  list-style: none;
`;

export const MeetingItem = styled.li`
  display: flex;
  width: 100%;
  height: 84px;
  padding-inline: 8px;
  align-items: flex-start;
  gap: 12px;
`;

export const MeetingImage = styled.img`
  display: block;
  width: 84px;
  height: 84px;
  flex: 0 0 84px;
  border-radius: 8px;
  object-fit: cover;
`;

export const MeetingContent = styled.div`
  display: flex;
  min-width: 0;
  padding-block: 2px;
  flex: 1;
  align-self: stretch;
  flex-direction: column;
  justify-content: space-between;
`;

export const MeetingInfo = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 4px;
  color: var(--Black, #17171b);
`;

export const MeetingTitle = styled.strong`
  ${text1Bold}
  display: block;
  overflow: hidden;
  line-height: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MeetingMeta = styled.div`
  ${text1}
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 4px;
  line-height: normal;
  white-space: nowrap;
`;

export const ActionRow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const PrimaryActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const ActionButton = styled.button`
  ${text1}
  display: flex;
  width: 80px;
  min-height: 26px;
  padding: 4px 8px;
  align-items: center;
  justify-content: center;
  border: 0.8px solid var(--Slate-Blue, #48535c);
  border-radius: 4px;
  background: var(--White, #fafafa);
  color: var(--Slate-Blue, #48535c);
  line-height: normal;
  cursor: pointer;
`;

export const DeleteButton = styled(ActionButton)`
  border-color: var(--DWU-Burgundy, #782c43);
  color: var(--DWU-Burgundy, #782c43);
`;
