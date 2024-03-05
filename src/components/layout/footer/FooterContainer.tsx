import { connect } from "react-redux"
import { AppRootStateType } from "../../../redux/redux-store"
import { IconLinksStateType } from "../../../redux/appReducer"
import { Footer } from "./Footer"
import { compose } from "redux"

type FooterAPIPropsTtype = {
    menuData: IconLinksStateType[]
    footerLinks: IconLinksStateType[]
    isLoggedIn: boolean
}

export const FooterAPI: React.FC<FooterAPIPropsTtype> = (props) => {
    return (
        <Footer
            menuData={props.isLoggedIn ? props.menuData : []}
            footerLinks={props.footerLinks}
        />
    )
}

type MapStatePropsType = {
    menuData: IconLinksStateType[]
    footerLinks: IconLinksStateType[]
    isLoggedIn: boolean
}
const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        menuData: state.app.menuItems,
        footerLinks: state.app.footerLinks,
        isLoggedIn: state.auth.isLoggedIn
    }
}

export const FooterContainer = compose(
    connect(mapStateToProps)
)(FooterAPI)