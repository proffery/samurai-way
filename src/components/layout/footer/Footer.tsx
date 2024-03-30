import { memo } from "react"
import { S } from "./Footer_Styles"
import { useSelector } from "react-redux"
import { Icon } from "components/common/icon/Icon"
import { Logo } from "components/common/logo/Logo"
import { Menu } from "components/common/menu/Menu"
import { Link } from "components/common/link/Link.styled"
import { selectIsloggedIn } from "store/auth/authSelectors"
import { FlexWrapper } from "components/common/FlexWrapper.styled"
import { selectFooterLinks, selectMenuItems } from "store/app/appSelectors"
import { SocialMedeaLinksList } from "./SocialMedeaLinksList/SocialMedeaLinksList"

export const Footer: React.FC = memo(() => {
    const menuItems = useSelector(selectMenuItems)
    const isLoggedIn = useSelector(selectIsloggedIn)
    const footerLinks = useSelector(selectFooterLinks)

    return (
        <S.Footer>
            <S.TopWrapper align="start" direction="row" wrap="wrap" justify="space-between">
                <S.Contacts>
                    <Logo variant="primary" type="text" />
                </S.Contacts>
                <S.Contacts direction="column">
                    <S.IconWrapper>
                        <Icon iconId="location" />
                        <span>Belarus, Gomel</span>
                    </S.IconWrapper>
                    <FlexWrapper wrap="wrap" justify="space-between" gap="22px">
                        <S.IconWrapper>
                            <Icon iconId="phone" />
                            <span>+375 25 6979075</span>
                        </S.IconWrapper>
                        <S.IconWrapper>
                            <Icon iconId="fax" />
                            <span>proffery@gmail.com</span>
                        </S.IconWrapper>
                    </FlexWrapper>
                    <FlexWrapper>
                        <SocialMedeaLinksList footerLinks={footerLinks} />
                    </FlexWrapper>
                </S.Contacts>
            </S.TopWrapper>
            <S.BottomWrapper align="start" direction="row" wrap="wrap" justify="space-between">
                <Menu
                    type="primary"
                    direction="row"
                    icons={false}
                    name={true}
                    menuItems={isLoggedIn ? menuItems : []}
                />
                <S.Copyright>
                    <span>Copyright © {new Date().getFullYear()}&nbsp;</span>
                    <Link variant="primary">Dmitry Shamko</Link>
                </S.Copyright>
            </S.BottomWrapper>
        </S.Footer>
    )
})
