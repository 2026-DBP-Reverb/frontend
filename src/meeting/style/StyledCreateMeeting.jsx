import styled, { css } from 'styled-components';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { text1 } from '../../styles/typography';

export const Form = styled.form`
  width: 100%;
  max-width: 372px;
  min-height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-top: 70px;
`;

export const Fields = styled.div`
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
  gap: 12px;
  margin-top: 30px;
`;

export const ImageTitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

export const ImageButton = styled.button`
  position: relative;
  width: 84px;
  height: 84px;
  flex: 0 0 84px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  overflow: hidden;

  &:focus-visible {
    outline: 2px solid var(--DWU-Burgundy, #782c43);
    outline-offset: 2px;
  }
`;

export const ImageUrlInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const ImagePlaceholder = styled.img`
  display: block;
  width: 84px;
  height: 84px;
`;

export const ImagePreview = styled.img`
  display: block;
  width: 84px;
  height: 84px;
  border: 1px solid var(--Gray, #bdbdbd);
  border-radius: 8px;
  object-fit: cover;
`;

export const Field = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 5px;
`;

export const TitleField = styled(Field)`
  flex: 1;
`;

export const Label = styled.label`
  ${text1}
  min-height: 17px;
  padding-inline: 5px;
  color: var(--Slate-Blue, #48535c);
`;

const controlStyles = css`
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  height: 55px;
  padding: 12px 16px;
  border: 1px solid var(--Gray, #bdbdbd);
  border-radius: 6px;
  background-color: var(--White, #fafafa);
  color: var(--Black, #17171b);
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.14px;

  &::placeholder {
    color: var(--Gray, #bdbdbd);
    opacity: 1;
  }

  &:focus {
    outline: 2px solid rgb(120 44 67 / 20%);
    border-color: var(--DWU-Burgundy, #782c43);
  }
`;

export const TextInput = styled(Input)`
  ${controlStyles}
`;

export const DateRow = styled.div`
  position: relative;
  display: flex;
  gap: 3px;
`;

export const DateValue = styled.button`
  ${controlStyles}
  flex: 1;
  text-align: left;
  color: ${({ $hasValue }) =>
    $hasValue ? 'var(--Black, #17171b)' : 'var(--Gray, #bdbdbd)'};
  cursor: pointer;
`;

export const NativeDateInput = styled.input`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
`;

export const SelectDateButton = styled.button`
  ${text1}
  width: 80px;
  height: 55px;
  flex: 0 0 80px;
  border: 1px solid var(--DWU-Burgundy, #782c43);
  border-radius: 6px;
  background: var(--White, #fafafa);
  color: var(--DWU-Burgundy, #782c43);
  cursor: pointer;
`;

export const HalfRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 12px;
`;

export const Select = styled.select`
  ${controlStyles}
  appearance: none;
  background-image: url('/images/SelectArrow.svg');
  background-repeat: no-repeat;
  background-position: right 16px center;
  color: ${({ value }) =>
    value ? 'var(--Black, #17171b)' : 'var(--Gray, #bdbdbd)'};
  cursor: pointer;
`;

export const DescriptionField = styled(Field)`
  height: 242px;
  flex: 0 0 242px;
  padding-bottom: 8px;
`;

export const Textarea = styled.textarea`
  ${controlStyles}
  min-height: 0;
  flex: 1;
  resize: none;
  line-height: normal;
`;

export const SubmitButton = styled(Button)`
  position: absolute;
  left: 31px;
  right: 31px;
  bottom: calc(55px + env(safe-area-inset-bottom, 0px));
  width: auto;
`;

export const ErrorMessage = styled.p`
  ${text1}
  position: absolute;
  left: 31px;
  right: 31px;
  bottom: calc(120px + env(safe-area-inset-bottom, 0px));
  margin: 0;
  color: var(--Error, #9b2c43);
  text-align: center;
`;

export const StatusMessage = styled.p`
  ${text1}
  margin: 40px 0 0;
  color: var(--Slate-Blue, #48535c);
  text-align: center;
`;
