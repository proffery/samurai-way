import { Navbar } from 'components/layout/navbar/Navbar'
import { memo } from 'react'
import { connect } from 'react-redux'
import { IconLinksStateType, setAppNavbarCollapsed } from 'store/app/appReducer'
import { selectMenuItems, selectNavbarCollapsed } from 'store/app/appSelectors'
import { AppRootStateType } from 'store/redux-store'

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