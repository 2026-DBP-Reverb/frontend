import styled from "styled-components";
import Input from "../../components/Input";
import {labelText, text1} from "../../styles/typography";

export const Form = styled.form`
  display: flex;
  padding-top: 24px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
`;

export const ImageUploadSection = styled.button`
  position: relative;
  background: transparent;
  overflow: hidden;
  padding: 0;
  border: 0;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid var(--DWU-Burgundy, #782c43);
    outline-offset: 2px;
  }
`;
export const ProfileImage = styled.img`
  display: block;
  width: 120px;
  height: 120px;
  aspect-ratio: 1/1;
  border-radius: 65536px;
`;

export const UploadIcon = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 0;
  bottom: 0;

  appearance: none;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: var(--Black, #17171B);
`;

export const InputList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  align-self: stretch;
`;

export const InputItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  align-self: stretch;
`;

styled(Input)`
  &::placeholder {
    color: var(--Gray, #BDBDBD);
    opacity: 1;
  }
`;

export const InputLabel = styled.label`
  display: flex;
  padding: 0 5px;
  justify-content: left;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  flex: 1 0 0;
  color: var(--Slate-Blue, #48535C);
  ${text1};
`;

export const ErrorMessage = styled.p`
  ${labelText};
  padding-left: 5px;
  padding-right: 5px;
  margin: 0;
  color: var(--DWU-Burgundy);
`;
