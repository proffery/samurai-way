import styled from "styled-components"
import { theme } from "../../styles/Theme.styled"

export const Header = () => {
    return (
        <StyledHeader>Header</StyledHeader>
    )
}

const StyledHeader = styled.header`
    height: 100px;
    width: 100%;
    background-color: ${theme.color.background.primary};
`