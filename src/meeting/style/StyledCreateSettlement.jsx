import styled from "styled-components";
import PillButton from "../../components/PillButton";
import {labelText, text1} from "../../styles/typography";
import * as Meeting from "./StyledCreateMeeting";
import * as Members from "./StyledMeetingMembers";

export const Form = styled(Meeting.Form)`
  margin-top: 0;
  padding-top: 75px;
  overflow-y: auto;
`;

export const Fields = styled(Meeting.Fields)`
  flex: none;
  gap: 16px;
  padding-bottom: 2px;

  .react-datepicker-wrapper {
    display: block;
    width: 100%;
  }
`;

export const Group = styled.fieldset`
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
`;

export const Legend = styled(Meeting.Label).attrs({as: "legend"})`
  margin-bottom: 8px;
`;

export const SplitOptions = styled.div`
  display: flex;
  gap: 8px;
  padding-inline: 2px;
`;

export const SplitOption = styled(PillButton)`
  font-weight: 400;
`;

export const MemberList = styled.div`
  padding-inline: 8px;
  margin-top: 12px;
`;

export const MemberRow = styled.div`
  ${text1}
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 0 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--Gray);

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Avatar = styled.img`
  width: 24px;
  height: 24px;
  flex: 0 0 24px;
  border-radius: 50%;
  object-fit: cover;
`;

export const MemberName = styled.span`
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
`;

export const AmountInput = styled(Meeting.TextInput)`
  &[type="number"] {
    appearance: textfield;
    -moz-appearance: textfield;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const MemberAmount = styled(AmountInput)`
  width: min(120px, 45%);
  height: 40px;

  &[readonly] {
    color: var(--Slate-Blue);
  }
`;

export const RemoveMemberButton = styled.button`
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  flex: 0 0 24px;
  padding: 0;
  border: 2px solid currentColor;
  border-radius: 50%;
  background: transparent;
  color: var(--Gray);
  cursor: pointer;

  &::before,
  &::after {
    content: "";
    grid-area: 1 / 1;
    width: 14px;
    height: 2px;
    background: currentColor;
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

export const MemberPicker = styled(Form).attrs({as: "section"})`
  gap: 30px;

  ${Members.Content} {
    flex: none;
  }

  ${Members.MemberRow} {
    flex-shrink: 0;
  }
`;

export const MemberToggle = styled(Members.KickButton)`
  &[aria-pressed="true"] {
    border-color: var(--Gray);
    background: var(--Gray);
    color: var(--White);
  }
`;

export const ErrorMessage = styled.p`
  ${text1};
  margin: 0;
  color: var(--DWU-Burgundy);
`;

export const SplitErrorMessage = styled(ErrorMessage)`
  ${labelText}
  margin: 12px 5px 0;
`;

export const SubmitButton = styled(Meeting.SubmitButton)`
  left: max(31px, calc((100% - 340px) / 2));
  right: max(31px, calc((100% - 340px) / 2));
`;
