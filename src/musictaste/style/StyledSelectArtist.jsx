import styled from "styled-components";
import { text1, title2, title3 } from "../../styles/typography";

export const Content = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  min-height: 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
`;

export const SearchHeader = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 25px;
  align-self: stretch;
`;

export const Title = styled.div`
  display: flex;
  width: 100%;
  padding: 0 5px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
  align-self: stretch;
`;

export const TitleAccent = styled.div`
  color: var(--DWU-Burgundy);
  ${title2}
`;


export const TitleNormal = styled.div`
  color: var(--Black);
  ${title3}
`;

export const Selected = styled.section`
  display: flex;
  width: 100%;
  flex: 1;
  min-height: 0;
  padding: 0 8px;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto;
`;

export const SearchResult = styled.section`
  display: flex;
  width: 100%;
  height: 200px;
  padding: 0 8px;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
`;

export const SearchResultList = styled.div`
  width: 100%;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto;
`;

export const InfoText = styled.div`
  display: flex;
  height: 50px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: var(--Slate-Blue, #48535C);
  ${text1};
`;
