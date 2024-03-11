import { connect } from "react-redux"
import { AppRootStateType } from "../../redux/redux-store"
import { IconLinksStateType, setAppNavbarCollapsed } from "../../redux/app/appReducer"
import { Navbar } from "../layout/navbar/Navbar"
import { selectMenuItems, selectNavbarCollapsed } from 'redux/app/appSelectors'
import { memo } from 'react'


type NavbarAPIPropsTtype = {
    menuItems: IconLinksStateType[]
    navbarCollapsed: boolean
    setAppNavbarCollapsed: (value: boolean) => void
}

export const NavbarAPI: React.FC<NavbarAPIPropsTtype> = memo((props) => {

    return (
        <Navbar
            menuItems={props.menuItems}
            navbarCollapsed={props.navbarCollapsed}
            setAppNavbarCollapsed={props.setAppNavbarCollapsed}
        />
    )
})

type MapStatePropsType = {
    menuItems: IconLinksStateType[]
    navbarCollapsed: boolean
}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        menuItems: selectMenuItems(state),
        navbarCollapsed: selectNavbarCollapsed(state)
    }
}

export const NavbarContainer = connect(mapStateToProps, { setAppNavbarCollapsed })(NavbarAPI)