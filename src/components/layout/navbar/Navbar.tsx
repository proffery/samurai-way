import React, { MouseEvent, useEffect, useState } from "react"
import styled from "styled-components"
import { Logo } from "../../../components/micro/logo/Logo"
import { Menu } from "../../../components/micro/menu/Menu"
import { IconLinksStateType } from "../../../redux/appReducer"
import { theme } from "../../../styles/Theme.styled"

type NavbarPropsType = {
    menuItems: IconLinksStateType[]
    navbarCollapsed: boolean
    setAppNavbarCollapsed: (value: boolean) => void
}

export const Navbar: React.FC<NavbarPropsType> = (props) => {

    const [width, setWidth] = useState(window.innerWidth)
    const breakpoint = 768

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize)

        return () => window.removeEventListener("resize", handleWindowResize)
    }, [])

    const navbarCollapseHandler = (e: MouseEvent<HTMLButtonElement>) => {
        props.setAppNavbarCollapsed(!props.navbarCollapsed)
    }

    useEffect(() => {
        width < breakpoint
            ? props.setAppNavbarCollapsed(false)
            : props.setAppNavbarCollapsed(true)
    }, [width])

    return (
        <StyledNavbar onClick={navbarCollapseHandler}>
            <Logo variant={'secondary'}
                type={props.navbarCollapsed ? 'text' : 'logo'}
            />
            <Menu type={'secondary'}
                icons={true}
                name={props.navbarCollapsed}
                direction={'column'}
                menuItems={props.menuItems}
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
    transition: all ease-in-out .2s;
    &:hover {
        box-shadow: ${theme.shadow.navbar};
        background-image: ${theme.gradient.banner};
    }
    @media ${theme.media.mobile} {
        gap: 40px;
        padding: 60px 20px;
    }
`