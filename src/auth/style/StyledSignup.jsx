import styled from 'styled-components';
import { title1 } from '../../styles/typography';
import { text1 } from '../../styles/typography';

export const Title = styled.h1`
  ${title1};
  margin-top:120px;
  margin-bottom:50px;
`;

export const InputField = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom:20px;
`;

export const Label = styled.label`
  ${text1}
  color: var(--Black, #17171b);
`;


export const VerificationRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const AgreementButton = styled.button`
  width: 100%;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 8px;

  border: 0;
  background: transparent;
  text-align: left;
  cursor: pointer;
`;

export const Check = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

export const AgreementText = styled.span`
  ${text1}
  color: var(--Black, #17171b);
`;