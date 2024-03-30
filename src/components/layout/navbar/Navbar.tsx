import { Logo } from "components/common/logo/Logo"
import { Menu } from "components/common/menu/Menu"
import React, { MouseEvent, memo, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectMenuItems } from "store/app/appSelectors"
import { S } from "./Navbar_Styles"

type Props = {
  isCollapsed: boolean
  setIsCollapsed: (isCollapsed: boolean) => void
}

export const Navbar: React.FC<Props> = memo(({ setIsCollapsed, isCollapsed }) => {
  const menuItems = useSelector(selectMenuItems)
  const [width, setWidth] = useState(window.innerWidth)
  const COLLAPSED_WIDTH = 768

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize)

    return () => window.removeEventListener("resize", handleWindowResize)
  }, [])

  const navbarCollapseHandler = (e: MouseEvent<HTMLButtonElement>) => {
    setIsCollapsed(!isCollapsed)
  }

  useEffect(() => {
    width < COLLAPSED_WIDTH ? setIsCollapsed(false) : setIsCollapsed(true)
  }, [width])

  return (
    <S.Navbar onClick={navbarCollapseHandler} collapsed={isCollapsed.toString()}>
      <Logo variant={"secondary"} type={isCollapsed ? "text" : "logo"} />
      <Menu type={"secondary"} icons={true} name={isCollapsed} direction={"column"} menuItems={menuItems} />
    </S.Navbar>
  )
})
