import { memo } from 'react'
import { connect } from 'react-redux'
import { AppRootStateType } from 'store/redux-store'
import { Navbar } from 'components/layout/navbar/Navbar'
import { selectMenuItems, selectNavbarCollapsed } from 'store/app/appSelectors'
import { IconLinksStateType, setAppNavbarCollapsed } from 'store/app/appReducer'

export const NavbarAPI: React.FC<NavbarAPIPropsTtype> = memo((props) => {

    return (
        <Navbar
            menuItems={props.menuItems}
            navbarCollapsed={props.navbarCollapsed}
            setAppNavbarCollapsed={props.setAppNavbarCollapsed}
        />
    )
})

const mapStateToProps = (state: AppRootStateType) => {
    return {
        menuItems: selectMenuItems(state),
        navbarCollapsed: selectNavbarCollapsed(state)
    }
}

export const NavbarContainer = connect(mapStateToProps, { setAppNavbarCollapsed })(NavbarAPI)

//TYPES
type NavbarAPIPropsTtype = {
    navbarCollapsed: boolean
    menuItems: IconLinksStateType[]
    setAppNavbarCollapsed: (value: boolean) => void
}