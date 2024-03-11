import { Footer } from 'components/layout/footer/Footer'
import { memo } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { IconLinksStateType } from 'store/app/appReducer'
import { selectMenuItems, selectFooterLinks } from 'store/app/appSelectors'
import { selectIsloggedIn } from 'store/auth/authSelectors'
import { AppRootStateType } from 'store/redux-store'

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

//TYPES
type FooterAPIPropsTtype = {
    menuItems: IconLinksStateType[]
    footerLinks: IconLinksStateType[]
    isLoggedIn: boolean
}