import styled from "styled-components"
import { FlexWrapper } from "../../components/FlexWrapper"
import { Menu } from "./menu/Menu"
import { theme } from "../../styles/Theme.styled"
import { Link } from "../../components/link/Link.styled"
import { font } from '../../styles/Font'

export const Navbar = () => {
    return (
        <StyledNavbar direction="column">
            <LogoLink type="secondary">
                <span>Social</span>
                <span>Network</span>
            </LogoLink>
            <Menu />
        </StyledNavbar>
    )
}

const StyledNavbar = styled(FlexWrapper)`
    background-color: ${theme.color.background.menu};
    min-height: 100vh;
    padding: 54px 28px;
    width: 20%;
    min-width: 218px;
`

const LogoLink = styled(Link)`
    flex-direction: column;
    align-items: start;
    margin-bottom: 110px;
    ${font({family: 'Orbitron', weight: 700, Fmin: 18, Fmax: 36})}
`