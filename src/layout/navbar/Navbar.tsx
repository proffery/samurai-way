import styled from "styled-components"
import { Menu } from "../../components/menu/Menu"
import { theme } from "../../styles/Theme.styled"
import { Logo } from "../../components/logo/Logo"
import { MenuStateType } from "../../redux/state"
import { Button } from "../../components/button/Button"
import { useEffect, useState } from "react"
import React from "react"
import { Icon } from "../../components/icon/Icon"

type NavbarPropsType = {
    menuData: MenuStateType
    navcollapsed: boolean
    setNavCollapsed: (value: boolean) => void
}

export const Navbar: React.FC<NavbarPropsType> = (props) => {

    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 576;
    
    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);
    
        return () => window.removeEventListener("resize", handleWindowResize);
    }, [])

    const navbarCollapseHandler = () => {
        props.setNavCollapsed(!props.navcollapsed)
    }

    useEffect(() => {
        width < breakpoint ? props.setNavCollapsed(false) : props.setNavCollapsed(true)
    },[width])

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
            <CollapseButton button_style="primary" 
                callback={navbarCollapseHandler} 
                name={props.navcollapsed ? <Icon iconId="leftArrow" viewBox="-1 9 18 18"/> : <Icon iconId="rightArrow" viewBox="19 9 18 18"/>}
                title={props.navcollapsed ? 'Close' : 'Open'}
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
    @media ${theme.media.mobile} {
        gap: 27px;
        padding: 27px 20px;
    }
`

const CollapseButton = styled(Button)`
    position: absolute;
    box-shadow: ${theme.shadow.text};
    height: 30px;
    width: 30px;
    top: 50%;
    left: 100%;
    padding: 5px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
`
