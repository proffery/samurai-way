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
    grid-area: 1 / 1 / 3 / 2 ;
    background-color: ${theme.color.background.menu};
    padding: 54px 28px;
    gap: 110px;
    @media ${theme.media.mobile} {
        gap: 55px;
    }
`

