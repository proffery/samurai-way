import styled from "styled-components"
import { Menu } from "../../components/menu/Menu"
import { theme } from "../../styles/Theme.styled"
import { Logo } from "../../components/logo/Logo"
import { MenuStateType } from "../../redux/state"
import { Button } from "../../components/button/Button"

type NavbarPropsType = {
    menuData: MenuStateType
    navcollapsed: boolean
    setNavCollapsed: (value: boolean) => void
}

export const Navbar: React.FC<NavbarPropsType> = (props) => {
    const navbarCollapseHandler = () => {
        props.setNavCollapsed(!props.navcollapsed)
    }

    return (
        <StyledNavbar>
            {props.navcollapsed && 
                <>
                    <Logo logo_style={'secondary'}/>
                    <Menu type={'secondary'} 
                        icons={true} 
                        direction={'column'} 
                        menuItems={props.menuData.menuItems}
                    />
                </>
            }
            <CollapseButton button_style="outlined" 
                callback={navbarCollapseHandler} 
                name={props.navcollapsed ? '🢦' : '🢧'}
            />
        </StyledNavbar>
    )
}

const StyledNavbar = styled.nav`
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: ${theme.color.background.menu};
    padding: 54px 32px;
    gap: 54px;
    box-shadow: ${theme.shadow.navbar};
    @media ${theme.media.mobile} {
        gap: 27px;
        padding: 27px 20px;
    }
`

const CollapseButton = styled(Button)`
    position: absolute;
    box-shadow: ${theme.shadow.text};
    top: 50%;
    left: 100%;
    padding: 5px;
    border-radius: 50% 50%;
    transform: translate(-50%, -50%);
`
