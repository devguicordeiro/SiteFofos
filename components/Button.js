import { css, styled } from "styled-components"

const StyledButton = styled.button`
    border: 0;
    padding: 5px 15px;
    border-radius: 5px;
    cursor: pointer;
    ${props => props.primary && css`
        background-color: #581c87;
        color: #fff;
        border: 1px solid #581c87;
    `}
    ${props => props.white && !props.outline && css`
        background-color: #fff;
        color: #000;
    `}
    ${props => props.white && props.outline && css`
        background-color: transparent;
        color: #fff;
        border: 1px solid #fff;
`}
    ${props => props.size === "l" && css`
        font-size: 1.2rem;
        padding: 10px 20px
    `}
`;

export default function Button({children, ...rest}) {
    return(
        <StyledButton {...rest}>{children}</StyledButton>
    )
}