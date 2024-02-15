import styled from "styled-components"
import { Menu } from "../../../components/micro/menu/Menu"
import { theme } from "../../../styles/Theme.styled"
import { Logo } from "../../../components/micro/logo/Logo"
import { Button } from "../../../components/micro/button/Button"
import { useEffect, useState } from "react"
import React from "react"
import { Icon } from "../../../components/micro/icon/Icon"
import { IconLinksStateType, setAppNavbarCollapsedAC } from "../../../redux/appReducer"
import { Dispatch } from "redux"

type NavbarPropsType = {
    menuItems: IconLinksStateType[]
    navbarCollapsed: boolean
    dispatch: Dispatch
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
        props.dispatch(setAppNavbarCollapsedAC(!props.navbarCollapsed))
    }

    useEffect(() => {
        width < breakpoint
            ? props.dispatch(setAppNavbarCollapsedAC(false))
            : props.dispatch(setAppNavbarCollapsedAC(true))
    }, [width])

    return (
        <StyledNavbar>
            {props.navbarCollapsed &&
                <>
                    <Logo logo_style={'secondary'} />
                    <Menu type={'secondary'}
                        icons={true}
                        direction={'column'}
                        menuItems={props.menuItems}
                    />
                </>
            }
            <CollapseButton variant="primary"
                onClick={navbarCollapseHandler}
                name={props.navbarCollapsed ? <Icon iconId="leftArrow" viewBox="-1 9 18 18" /> : <Icon iconId="rightArrow" viewBox="19 9 18 18" />}
                title={props.navbarCollapsed ? 'Close' : 'Open'}
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
    z-index: 1000;
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
