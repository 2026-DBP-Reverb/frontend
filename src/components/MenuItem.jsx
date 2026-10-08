import styled from "styled-components";
import { Link } from "react-router-dom";
import { text2 } from "../styles/typography";

const MenuItemLink = styled(Link)`
  display: flex;
  width: 100%;
  height: 56px;
  padding: 24px 12px;
  align-items: center;
  gap: 16px;
  text-decoration: none;

  background: var(--White, #FAFAFA);
  color: var(--Black, #17171B);
  text-align: center;
  ${text2};
`;

const MenuItemButton = styled.button`
  display: flex;
  width: 100%;
  height: 56px;
  padding: 24px 12px;
  align-items: center;
  gap: 16px;
  text-decoration: none;

  background: var(--White, #FAFAFA);
  color: var(--Black, #17171B);
  text-align: center;
  ${text2};
`;

const MenuIcon = styled.img`
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`;

export default function MenuItem({icon, label, to, onClick}) {
  if (onClick) {
    return (
      <MenuItemButton type="button" onClick={onClick}>
        <MenuIcon src={icon} alt=""/>
        <span>{label}</span>
      </MenuItemButton>
    );
  }
  return (
    <MenuItemLink to={to}>
      <MenuIcon src={icon} alt=""/>
      <span>{label}</span>
    </MenuItemLink>
  );
}