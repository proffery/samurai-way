import { connect } from "react-redux"
import { AppRootStateType } from "../../../redux/redux-store"
import { IconLinksStateType, setAppNavbarCollapsed } from "../../../redux/appReducer"
import { Navbar } from "./Navbar"


type NavbarAPIPropsTtype = {
    menuItems: IconLinksStateType[]
    navbarCollapsed: boolean
    setAppNavbarCollapsed: (value: boolean) => void
}

export const NavbarAPI: React.FC<NavbarAPIPropsTtype> = (props) => {

    return (
        <Navbar
            menuItems={props.menuItems}
            navbarCollapsed={props.navbarCollapsed}
            setAppNavbarCollapsed={props.setAppNavbarCollapsed}
        />
    )
}

type MapStatePropsType = {
    menuItems: IconLinksStateType[]
    navbarCollapsed: boolean
}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        menuItems: state.app.menuItems,
        navbarCollapsed: state.app.navbarCollapsed
    }
}

export const NavbarContainer = connect(mapStateToProps, { setAppNavbarCollapsed })(NavbarAPI)