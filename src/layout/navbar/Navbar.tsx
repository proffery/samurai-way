import styled from "styled-components"
import { FlexWrapper } from "../../components/FlexWrapper"
import { Menu } from "./menu/Menu"
import { theme } from "../../styles/Theme.styled"
import { Logo } from "../../components/logo/Logo"

export const Navbar = () => {
    return (
        <StyledNavbar direction="column">
            <Logo type={'secondary'}/>
            <Menu type={'secondary'} icons={true} direction={'column'}/>
        </StyledNavbar>
    )
}

const StyledNavbar = styled(FlexWrapper)`
    background-color: ${theme.color.background.menu};
    min-height: 100vh;
    padding: 54px 28px;
    width: 25%;
    min-width: 218px;
    gap: 110px;
`

