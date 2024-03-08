import { connect } from "react-redux"
import { AppRootStateType } from "../../../redux/redux-store"
import { IconLinksStateType } from "../../../redux/app/appReducer"
import { Footer } from "./Footer"
import { compose } from "redux"
import { selectFooterLinks, selectMenuItems } from 'redux/app/appSelectors'
import { selectIsloggedIn } from 'redux/auth/authSelectors'

type FooterAPIPropsTtype = {
    menuItems: IconLinksStateType[]
    footerLinks: IconLinksStateType[]
    isLoggedIn: boolean
}

export const FooterAPI: React.FC<FooterAPIPropsTtype> = (props) => {
    return (
        <Footer
            menuItems={props.isLoggedIn ? props.menuItems : []}
            footerLinks={props.footerLinks}
        />
    )
}

type MapStatePropsType = {
    menuItems: IconLinksStateType[]
    footerLinks: IconLinksStateType[]
    isLoggedIn: boolean
}
const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        menuItems: selectMenuItems(state),
        footerLinks: selectFooterLinks(state),
        isLoggedIn: selectIsloggedIn(state),
    }
}

export const FooterContainer = compose(
    connect(mapStateToProps)
)(FooterAPI)