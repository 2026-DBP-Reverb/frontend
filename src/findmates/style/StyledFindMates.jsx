import styled from "styled-components";
import { title2, title3, text2Bold, text1Bold } from "../../styles/typography";

export const Title = styled.h1`
  ${title2};
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  margin: 70px 0 25px;
  color: var(--Black, #17171b);
`;

export const TitleAccent = styled.span`
  color: var(--DWU-Burgundy, #782c43);
`;

export const Section = styled.div`
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  gap: 24px; 
  width: 100%; 
  padding: 0 12px; 
  box-sizing: border-box;
`;

export const Card = styled.div`
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  gap: 16px; 
  width: 100%;
  padding: 18px 16px 8px;
  border: 1px solid var(--Gray, #bdbdbd);
  border-radius: 24px;
  box-sizing: border-box;
`;

export const ProfileRow = styled.div`
  display: flex; 
  align-items: center;
  justify-content: center;
  gap: 48px;
`;

export const ArrowButton = styled.button`
  display: flex; 
  padding: 0;
  border: 0;
  background: none; 
  cursor: pointer;
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const ProfileImage = styled.img`
  width: 80px; 
  height: 80px; 
  border-radius: 50%; 
  object-fit: cover;
`;

export const Nickname = styled.span`
  ${title3};
  color: var(--Black, #17171b);
`;

export const MatchRate = styled.span`
  ${text2Bold};
  color: var(--DWU-Burgundy, #782c43);
`;

export const Playlist = styled.div`
  display: flex;
  flex-direction: column; 
  width: 100%;
`;

export const ButtonBar = styled.div`
  display: flex;
  gap: 8px;
`;
