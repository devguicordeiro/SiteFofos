import { styled } from "styled-components"

const StyledTabs = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 10px;
`;

const StyledTab = styled.span`
    font-size: 1.5rem;
    ${props => props.active 
        ? `
            color: fuchsia;
            font-weight: 500;
            border-bottom: 2px solid fuchsia;
        `
        : `
            color: gray;
            border-bottom: 2px solid #bbb;
        `}

`;

export default function Tabs ({tabs, active}) {
    return (
        <StyledTabs>
            {tabs.map(tabName => (
                <StyledTab active={tabName === active}>
                    {tabName}
                </StyledTab>
            ))}
        </StyledTabs>
    )
}