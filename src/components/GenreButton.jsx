import styled from "styled-components";
import { text2Bold } from "../styles/typography";

export default function GenreButton({ name, selected, onClick }) {
  return (
    <Button type="button" $selected={selected} onClick={onClick}>
      {name}
    </Button>
  );
}

const Button = styled.button`
  ${text2Bold};
  display: flex;
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  aspect-ratio: 1;
  border-radius: 50%;
  border: ${({ $selected }) =>
  $selected
    ? '2px solid var(--Slate-Blue, #48535c)'
    : '2px solid var(--Gray, #bdbdbd)'};
  background: ${({ $selected }) =>
  $selected ? 'var(--Slate-Blue, #48535c)' : 'transparent'};
  color: ${({ $selected }) =>
  $selected ? 'var(--White, #fafafa)' : 'var(--Gray, #bdbdbd)'};
  cursor: pointer;
`;