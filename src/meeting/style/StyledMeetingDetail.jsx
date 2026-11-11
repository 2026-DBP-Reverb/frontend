import styled from 'styled-components';
import PillButton from '../../components/PillButton';
import {
  labelText,
  text1,
  text1Bold,
  text2,
  title3,
} from '../../styles/typography';

export const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  min-height: calc(100dvh - 105px);
  margin-top: 70px;
  padding-bottom: 55px;
  flex: 1;
  flex-direction: column;
  gap: 25px;
`;

export const Header = styled.header`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
`;

export const MeetingImage = styled.img`
  display: block;
  width: 84px;
  height: 84px;
  border-radius: 8px;
  object-fit: cover;
`;

export const Title = styled.h1`
  ${title3}
  max-width: 100%;
  margin: 0;
  overflow: hidden;
  color: var(--Black, #17171b);
  line-height: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TagGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

const Tag = styled.span`
  ${labelText}
  display: flex;
  padding: 4px 8px;
  align-items: center;
  justify-content: center;
  border: 0.8px solid;
  border-radius: 4px;
  line-height: normal;
  white-space: nowrap;
`;

export const CategoryTag = styled(Tag)`
  border-color: var(--Slate-Blue, #48535c);
  color: var(--Slate-Blue, #48535c);
`;

export const RecruitmentTag = styled(Tag)`
  border-color: ${({ $variant }) =>
    $variant === 'open'
      ? 'var(--DWU-Burgundy, #782c43)'
      : $variant === 'completed'
      ? 'var(--Gray, #bdbdbd)'
      : 'var(--Slate-Blue, #48535c)'};
  background: ${({ $variant }) =>
    $variant === 'completed' ? 'var(--Gray, #bdbdbd)' : 'transparent'};
  color: ${({ $variant }) =>
    $variant === 'open'
      ? 'var(--DWU-Burgundy, #782c43)'
      : $variant === 'completed'
      ? 'var(--White, #fafafa)'
      : 'var(--Slate-Blue, #48535c)'};
`;

export const MetaList = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;

export const MetaRow = styled.div`
  ${text1}
  display: flex;
  width: 100%;
  align-items: center;
  gap: 8px;
  line-height: normal;
`;

export const MetaLabel = styled.div`
  ${text1Bold}
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 6px;
  color: var(--Gray, #bdbdbd);
  line-height: normal;
`;

export const MetaIcon = styled.img`
  display: block;
  flex: 0 0 auto;
`;

export const MetaValue = styled.span`
  min-width: 0;
  overflow: hidden;
  color: var(--Black, #17171b);
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TabList = styled.div`
  display: flex;
  width: 100%;
`;

export const Tab = styled.button`
  ${text1}
  display: flex;
  height: 28px;
  padding: 0;
  flex: 1;
  align-items: center;
  justify-content: center;
  border: 0;
  border-bottom: 1px solid
    ${({ $active }) =>
      $active ? 'var(--DWU-Burgundy, #782c43)' : 'var(--Gray, #bdbdbd)'};
  background: transparent;
  color: ${({ $active }) =>
    $active ? 'var(--DWU-Burgundy, #782c43)' : 'var(--Gray, #bdbdbd)'};
  line-height: normal;
`;

export const DescriptionSection = styled.section`
  ${text1}
  display: flex;
  width: 100%;
  min-height: 97px;
  flex-direction: column;
  gap: 12px;
  color: var(--Black, #17171b);
`;

export const SectionTitle = styled.h2`
  ${text1Bold}
  width: 100%;
  margin: 0;
  color: var(--Black, #17171b);
  line-height: normal;
`;

export const Description = styled.p`
  min-height: 68px;
  margin: 0;
  line-height: normal;
  white-space: pre-wrap;
`;

export const MemberSection = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 4px;
`;

export const MemberList = styled.ul`
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0;
  flex-direction: column;
  list-style: none;
`;

export const MemberRow = styled.li`
  display: flex;
  width: 100%;
  height: 60px;
  padding-inline: 8px;
  align-items: center;
  gap: 10px;
  border-bottom: 0.5px solid var(--Gray, #bdbdbd);
`;

export const ProfileImage = styled.img`
  display: block;
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Nickname = styled.span`
  ${text2}
  min-width: 0;
  flex: 1;
  overflow: hidden;
  color: var(--Black, #17171b);
  line-height: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const HostTag = styled(Tag)`
  border-color: var(--DWU-Burgundy, #782c43);
  color: var(--DWU-Burgundy, #782c43);
`;

export const LeaveButton = styled.button`
  ${text1}
  width: fit-content;
  margin-top: 20px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--Gray, #bdbdbd);
  line-height: normal;
  cursor: pointer;
`;

export const FloatingAction = styled(PillButton)`
  position: fixed;
  right: max(15px, calc((100vw - 402px) / 2 + 15px));
  bottom: 55px;
  z-index: 2;
  width: fit-content;
`;

export const UnavailableAction = styled(FloatingAction)`
  && {
    border-color: var(--Slate-Blue, #48535c);
  }
`;

export const StatusMessage = styled.p`
  ${text2}
  margin: 0;
  padding-top: 40px;
  color: var(--Gray, #bdbdbd);
  text-align: center;
`;
