import styled from "styled-components";
import { text2 } from "../styles/typography";

export default function BackButton({
                                     onClick,
                                     text = "돌아가기",
                                     iconSrc = "/images/Previous.svg",
                                   }) {
  return (
    <Button
      type="button"
      onClick={onClick}
    >
      <Icon src={iconSrc} alt="" aria-hidden="true"/>
      <Text>{text}</Text>
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  width: 100%;
  padding: 5px;
  align-items: center;
  gap: 10px;

  border: 0;
  background: transparent;
  cursor: pointer;
`;

const Icon = styled.img`
  display: block;
  width: 10px;
  height: 16px;
  flex: 0 0 auto;
`;

const Text = styled.span`
  color: var(--Gray);
  ${text2};
`;