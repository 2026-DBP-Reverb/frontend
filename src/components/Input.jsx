import styled from 'styled-components';
import { text1 } from '../styles/typography';

const StyledInput = styled.input`
  box-sizing: border-box;
  width: 340px;
  max-width: 100%;
  height: 55px;
  padding: 12px 16px;
  border: 1px solid var(--Gray, #b8c0c0);
  border-radius: 6px;
  background-color: #fff;
  font: inherit;

  &::placeholder {
    ${text1}
  }
`;

export default function Input(props) {
  return <StyledInput {...props} />;
}
