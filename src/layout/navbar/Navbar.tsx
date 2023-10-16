import styled from "styled-components"
import { Menu } from "../../components/menu/Menu"
import { theme } from "../../styles/Theme.styled"
import { Logo } from "../../components/logo/Logo"
import { MenuStateType } from "../../redux/state"

type NavbarPropsType = {
    menuData: MenuStateType
}

export const Navbar: React.FC<NavbarPropsType> = (props) => {
    return (
        <StyledNavbar>
            <Logo type={'secondary'}/>
            <Menu type={'secondary'} 
                icons={true} 
                direction={'column'} 
                menuItems={props.menuData.menuItems}
            />
        </StyledNavbar>
    )
}

const StyledNavbar = styled.nav`
    display: flex;
    flex-direction: column;
    grid-area: 1 / 1 / 3 / 2 ;
    background-color: ${theme.color.background.menu};
    padding: 54px 28px;
    gap: 54px;
    @media ${theme.media.mobile} {
        gap: 27px;
        padding: 27px 18px;
    }
`

