import styled from "styled-components";
import { text1 } from "../styles/typography";

export default function ListTitle({title}) {
  return (
    <Container>
      <Title>{title}</Title>
      <Line/>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const Title = styled.div`
  align-self: stretch;
  width: 100%;
  color: var(--Slate-Blue, #48535C);
  ${text1};
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: var(--Slate-Blue, #48535C);
`;