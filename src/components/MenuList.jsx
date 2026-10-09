import styled from "styled-components";
import { text1Bold } from "../styles/typography";
import MenuItem from "./MenuItem";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

const Title = styled.div`
  display: flex;
  height: 28px;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;

  color: var(--DWU-Burgundy, #782C43);
  text-align: center;
  ${text1Bold};
`;

export default function MenuList({title, items}) {
  return (
    <Container>
      <Title>
        {title}
      </Title>

      {items.map((item) => (
        <MenuItem
          key={item.to ?? item.label}
          icon={item.icon}
          label={item.label}
          to={item.to}
          onClick={item.onClick}
        />
      ))}
    </Container>
  );
};
