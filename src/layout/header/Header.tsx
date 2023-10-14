import styled from "styled-components"
import { theme } from "../../styles/Theme.styled"

export const Header = () => {
    return (
        <StyledHeader>Header</StyledHeader>
    )
}

const StyledHeader = styled.header`
    display: flex;
    grid-area: 1 / 2 / 2 / 6 ;
    background-color: ${theme.color.background.primary};
`