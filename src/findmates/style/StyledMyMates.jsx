import styled from "styled-components";
import { title3, text2, labelText } from "../../styles/typography";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  margin-top: 70px;
`;

export const Title = styled.h2`
  ${title3};
  margin: 0 0 24px;
  padding: 0 5px;
  color: var(--Black, #17171b);
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 72px;
  padding: 0 8px;
  border-bottom: 0.5px solid var(--Gray, #bdbdbd);
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 50%;
  object-fit: cover;
`;

export const Name = styled.span`
  ${text2};
  flex: 1;
  color: var(--Black, #17171b);
`;

export const PendingText = styled.span`
  ${labelText};
  color: var(--Slate-Blue, #48535c);
`;

export const IconButton = styled.button`
  display: flex;
  flex-shrink: 0;          /* ← 추가: 옆 글자에 밀려서 줄어들지 않게 */
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;

  img {                    /* ← 추가: 아이콘은 항상 원래 크기로 */
    width: 24px;
    height: auto;
  }
`;

export const EmptyText = styled.p`
  ${text2};
  padding-top: 40px;
  text-align: center;
  color: var(--Gray, #bdbdbd);
`;