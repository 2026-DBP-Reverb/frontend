import styled from 'styled-components';
import { text2Bold } from '../../styles/typography';

export const Logo = styled.img`
  width: 100px;
  height: 114px;
  margin-top: 130px;
  object-fit: contain;
  align-self: center;
`;

export const LogoText = styled.p`
  ${text2Bold}
  margin-top: 24px;
  color: #782C43;
  align-self: center;

`;

export const SchoolText = styled.span`
  color: rgba(120, 44, 67, 0.7);
`;