import styled from 'styled-components';
import { labelText, text2, title3 } from '../../styles/typography';

export const Container = styled.div`
  display: flex;
  width: 100%;
  margin-top: 70px;
  flex: 1;
  flex-direction: column;
  gap: 30px;
`;

export const Content = styled.section`
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
  gap: 24px;
`;

export const Title = styled.h1`
  ${title3}
  margin: 0;
  padding-inline: 5px;
  color: var(--Black, #17171b);
  line-height: normal;
`;

export const MemberList = styled.ul`
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0;
  flex: 1;
  flex-direction: column;
  list-style: none;
`;

export const MemberRow = styled.li`
  display: flex;
  width: 100%;
  height: 72px;
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

export const KickButton = styled.button`
  ${labelText}
  display: flex;
  padding: 4px 8px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  border: 0.8px solid var(--Slate-Blue, #48535c);
  border-radius: 4px;
  background: var(--White, #fafafa);
  color: var(--Slate-Blue, #48535c);
  line-height: normal;
  cursor: pointer;
`;

export const StatusMessage = styled.p`
  ${text2}
  margin: 0;
  padding-top: 40px;
  color: var(--Gray, #bdbdbd);
  text-align: center;
`;
