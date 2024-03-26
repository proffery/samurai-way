import { Logo } from 'components/common/logo/Logo'
import { Menu } from 'components/common/menu/Menu'
import React, { MouseEvent, memo, useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { selectMenuItems } from 'store/app/appSelectors'
import styled from "styled-components"
import { theme } from 'styles/Theme.styled'

type Props = {
    isCollapsed: boolean
    setIsCollapsed: (isCollapsed: boolean) => void
}

export const Navbar: React.FC<Props> = memo(({ setIsCollapsed, isCollapsed }) => {
    const menuItems = useSelector(selectMenuItems)
    const [width, setWidth] = useState(window.innerWidth)
    const breakpoint = 768

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize)

        return () => window.removeEventListener("resize", handleWindowResize)
    }, [])

    const navbarCollapseHandler = (e: MouseEvent<HTMLButtonElement>) => {
        setIsCollapsed(!isCollapsed)
    }

    useEffect(() => {
        width < breakpoint
            ? setIsCollapsed(false)
            : setIsCollapsed(true)
    }, [width])

    return (
        <StyledNavbar onClick={navbarCollapseHandler}>
            <Logo variant={'secondary'}
                type={isCollapsed ? 'text' : 'logo'}
            />
            <Menu type={'secondary'}
                icons={true}
                name={isCollapsed}
                direction={'column'}
                menuItems={menuItems}
            />
        </StyledNavbar>
    )
})

const StyledNavbar = styled.nav`
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: ${theme.color.background.menu};
    padding: 54px 32px;
    gap: 54px;
    z-index: 1000;
    transition: all ease-out .2s;
    &:hover {
        box-shadow: ${theme.shadow.navbar};
        background-image: ${theme.gradient.banner};
    }
    @media ${theme.media.mobile} {
        gap: 40px;
        padding: 60px 20px;
    }
`