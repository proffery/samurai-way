import { connect } from "react-redux"
import { AppRootStateType } from "../../../redux/redux-store"
import { IconLinksStateType } from "../../../redux/appReducer"
import { Footer } from "./Footer"
import { compose } from "redux"

type FooterAPIPropsTtype = {
    menuData: IconLinksStateType[]
    footerData: IconLinksStateType[]
    isLoggedIn: boolean
}

export const FooterAPI: React.FC<FooterAPIPropsTtype> = (props) => {
    return (
        <Footer
            menuData={props.isLoggedIn ? props.menuData : []}
            footerData={props.footerData}
        />
    )
}

type MapStatePropsType = {
    menuData: IconLinksStateType[]
    footerData: IconLinksStateType[]
    isLoggedIn: boolean
}
const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        menuData: state.app.menuItems,
        footerData: state.app.socialLinks,
        isLoggedIn: state.auth.isLoggedIn
    }
}

export const FooterContainer = compose(
    connect(mapStateToProps)
)(FooterAPI)