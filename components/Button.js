import { css, styled } from "styled-components"

export const ButtonStyle = css`
border: 0;
padding: 5px 15px;
border-radius: 5px;
text-decoration: none;
cursor: pointer;
display: inline-flex;
align-items: center;
svg{
    height: 16px;
    margin-right: 5px;
}
${props => props.primary && !props.outline && css`
    background-color: #581c87;
    color: #fff;
    border: 1px solid #581c87;
`}
${props => props.primary && props.outline && css`
    background-color: transparent;
    color: #581c87;
    border: 1px solid #581c87;
`}
${props => props.white && !props.outline && css`
    background-color: #fff;
    color: #000;
    border: 1px solid #000;
`}
${props => props.white && props.outline && css`
    background-color: transparent;
    color: #fff;
    border: 1px solid #fff;
`}
${props => props.black && !props.outline && css`
    background-color: #000;
    color: #fff;
    border: 1px solid #fff;
`}
${props => props.black && props.outline && css`
    background-color: transparent;
    color: #000;
    border: 1px solid #000;
`}
${props => props.block && css`
    display: block;
    width: 100%;
`}

${props => props.size === "l" && css`
    font-size: 1rem;
    padding: 10px 20px;
    svg{
        height: 20px;
    }
`}
`;

const StyledButton = styled.button`
    ${ButtonStyle}
`;

export default function Button({children, ...rest}) {
    return(
        <StyledButton {...rest}>{children}</StyledButton>
    )
}