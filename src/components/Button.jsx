import styled from 'styled-components';
import { text2Bold } from '../styles/typography';

const variants = {
  burgundy: {
    background: 'var(--DWU-Burgundy, #782C43)',
    color: '#fff',
    border: '1px solid transparent',
  },
  white: {
    background: '#fff',
    color: 'var(--DWU-Burgundy, #782C43)',
    border: '1px solid var(--DWU-Burgundy, #782C43)',
  },
};

const StyledButton = styled.button`
  ${text2Bold}
  box-sizing: border-box;
  display: flex;
  width: 340px;
  max-width: 100%;
  height: 55px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 6px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export default function Button({
  children,
  variant = 'burgundy',
  type = 'button',
  disabled = false,
  style,
  ...props
}) {
  return (
    <StyledButton
      {...props}
      type={type}
      disabled={disabled}
      style={{
        ...variants[variant],
        ...style,
      }}
    >
      {children}
    </StyledButton>
  );
}
