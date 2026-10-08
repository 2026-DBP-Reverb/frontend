import styled, { keyframes } from "styled-components";
import { title2, title3 } from "../../styles/typography";

export const Content = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  min-height: 0;
  flex-direction: column;
  gap: 24px;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0 5px;
`;

export const TitleAccent = styled.div`
  color: var(--DWU-Burgundy);
  ${title2}
`;

export const TitleNormal = styled.div`
  color: var(--Black);
  ${title3}
`;

const float = keyframes`
  0%, 100% {
    transform: translate(0, 0);
  }

  25% {
    transform: translate(6px, -8px);
  }

  50% {
    transform: translate(-5px, -14px);
  }

  75% {
    transform: translate(-8px, -4px);
  }
`;

export const GenreFrame = styled.section`
  position: relative;
  display: block;
  flex: 1 0 0;
  min-height: 520px;
  align-self: stretch;
  overflow: hidden;
`;

export const GenrePosition = styled.div`
  position: absolute;
  left: ${({$x}) => $x}%;
  top: ${({$y}) => $y}%;
  transform: translate(-50%, -50%);
`;

export const GenreMotion = styled.div`
  animation: ${float} ${({$duration}) => $duration}s ease-in-out infinite;
  animation-delay: ${({$delay}) => $delay}s;
  animation-direction: alternate;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const GenreSlot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  &:nth-child(1) {
    grid-column: 1;
  }

  &:nth-child(2) {
    grid-column: 3;
  }

  &:nth-child(3) {
    grid-column: 2;
  }

  &:nth-child(4) {
    grid-column: 1;
  }

  &:nth-child(5) {
    grid-column: 3;
  }
`;
