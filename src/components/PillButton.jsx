import styled from "styled-components";
import { text1Bold } from "../styles/typography";

export default function PillButton({ variant = "filled", children, ...props }) {
    return (
        <StyledPillButton type="button" $variant={variant} {...props}>
            {children}
        </StyledPillButton>
    );
}

const variants = {
    outlined: `background: var(--White, #fafafa); color: var(--DWU-Burgundy, #782c43); border-color: var(--DWU-Burgundy, #782c43);`,
    filled:   `background: var(--DWU-Burgundy, #782c43); color: var(--White, #fafafa); border-color: var(--DWU-Burgundy, #782c43);`,
    disabled: `background: var(--White, #fafafa); color: var(--Gray, #BDBDBD); border-color: var(--Gray, #BDBDBD); cursor: default;`,
};

const StyledPillButton = styled.button`
    ${text1Bold};
    padding: 12px 20px;
    border: 1px solid;
    border-radius: 20px;
    cursor: pointer;
    ${({ $variant }) => variants[$variant]}
`;