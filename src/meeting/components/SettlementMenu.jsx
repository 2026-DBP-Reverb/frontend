import {Link} from "react-router-dom";
import styled from "styled-components";
import {text1} from "../../styles/typography";

const Container = styled(Link)`
  display: flex;
  width: 100%;
  padding: 8px 16px;
  align-items: center;
  gap: 16px;

  border-radius: 8px;
  border: 0.5px solid var(--DWU-Burgundy, #782C43);
  background: var(--White, #FAFAFA);

  ${text1};
  color: var(--DWU-Burgundy, #782C43);
  text-align: center;

  text-decoration: none;
  cursor: pointer;
`;

export default function SettlementMenu({label, to, ...props}) {
  return (
    <Container as={to ? Link : "button"} to={to} {...props}>
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M0 11.0837V14H2.91626L11.5173 5.39897L8.60103 2.48271L0 11.0837ZM13.7725 3.14373C14.0758 2.84044 14.0758 2.35051 13.7725 2.04722L11.9528 0.227468C11.6495 -0.0758228 11.1596 -0.0758228 10.8563 0.227468L9.43314 1.6506L12.3494 4.56687L13.7725 3.14373Z"
          fill="#782C43"/>
      </svg>
      {label}
    </Container>
  );
};