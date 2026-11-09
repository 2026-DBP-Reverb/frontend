import styled from "styled-components";
import {
  labelText,
  text1,
  text1Bold,
  title2,
} from "../../styles/typography";

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const Header = styled.h1`
  ${title2};
  width: 100%;
  margin: 75px 0 0;
  padding: 0 16px 4px;
  color: var(--Black, #17171b);
`;

export const AccentText = styled.span`
  color: var(--DWU-Burgundy, #782c43);
`;

export const TabList = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  border-bottom: 1px solid var(--Gray, #bdbdbd);
`;

export const TabButton = styled.button`
  ${text1};
  flex: 1;
  height: 29px;
  padding: 0 0 8px;
  border: 0;
  border-bottom: 1px solid
    ${({ $active }) =>
      $active ? "var(--DWU-Burgundy, #782c43)" : "transparent"};
  margin-bottom: -1px;
  background: transparent;
  color: ${({ $active }) =>
    $active
      ? "var(--DWU-Burgundy, #782c43)"
      : "var(--Gray, #bdbdbd)"};
  cursor: pointer;
`;

export const MeetingList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

export const MeetingCard = styled.article`
  width: 100%;
  min-width: 0;
  min-height: 84px;
  display: flex;
  align-items: stretch;
  gap: 12px;
  padding: 0 8px;
`;

export const MeetingImageFrame = styled.div`
  width: 84px;
  height: 84px;
  flex: 0 0 84px;
  overflow: hidden;
  border-radius: 8px;
`;

export const MeetingImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

export const MeetingInfo = styled.div`
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2px 0;
`;

export const MeetingSummary = styled.div`
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: var(--Black, #17171b);
`;

export const MeetingTitle = styled.h2`
  ${text1Bold};
  width: 100%;
  margin: 0;
  overflow: hidden;
  color: var(--Black, #17171b);
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const MeetingMeta = styled.div`
  ${text1};
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--Black, #17171b);
  white-space: nowrap;
`;

export const MetaSeparator = styled.span`
  ${labelText};
`;

export const TagList = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Tag = styled.span`
  ${labelText};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border: 0.8px solid var(--Slate-Blue, #48535c);
  border-radius: 4px;
  color: var(--Slate-Blue, #48535c);
  white-space: nowrap;
`;

export const EmptyMessage = styled.p`
  ${text1};
  width: 100%;
  margin: 24px 0;
  color: var(--Gray, #bdbdbd);
  text-align: center;
`;

export const FloatingActionLayer = styled.div`
  position: fixed;
  left: 50%;
  bottom: 139px;
  z-index: 9;
  width: 100%;
  max-width: 402px;
  padding: 0 15px;
  display: flex;
  justify-content: flex-end;
  transform: translateX(-50%);
  pointer-events: none;
`;

export const CreateMeetingButton = styled.button`
  ${text1Bold};
  min-height: 42px;
  padding: 12px 20px;
  border: 0;
  border-radius: 20px;
  background: var(--DWU-Burgundy, #782c43);
  color: var(--White, #fafafa);
  cursor: pointer;
  pointer-events: auto;
`;

