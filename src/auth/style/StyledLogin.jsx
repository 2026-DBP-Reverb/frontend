import styled from 'styled-components';
import { labelText, text2Bold } from '../../styles/typography';

export const Logo = styled.img`
  width: 100px;
  height: 114px;
  margin-top: 90px;
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

export const ErrorMessage = styled.p`
  ${labelText}
  width: 100%;
  margin: 8px 0 0;
  color: #782c43;
  text-align: left;
`;
