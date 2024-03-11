import { connect } from "react-redux"
import { AppRootStateType } from "../../store/redux-store"
import { IconLinksStateType } from "../../store/app/appReducer"
import { Footer } from "../layout/footer/Footer"
import { compose } from "redux"
import { selectFooterLinks, selectMenuItems } from 'store/app/appSelectors'
import { selectIsloggedIn } from 'redux/auth/authSelectors'
import { memo } from 'react'

type FooterAPIPropsTtype = {
    menuItems: IconLinksStateType[]
    footerLinks: IconLinksStateType[]
    isLoggedIn: boolean
}

export const FooterAPI: React.FC<FooterAPIPropsTtype> = memo((props) => {
    return (
        <Footer
            menuItems={props.isLoggedIn ? props.menuItems : []}
            footerLinks={props.footerLinks}
        />
    )
})

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