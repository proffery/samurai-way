import styled from "styled-components"
import { Logo } from "../../components/logo/Logo"
import { theme } from "../../styles/Theme.styled"
import { FlexWrapper } from "../../components/FlexWrapper"
import { Menu } from "../navbar/menu/Menu"
import { Link } from "../../components/link/Link.styled"
import { Icon } from "../../components/icon/Icon"
import { SocialMedeaLinks } from "./socialMedeaLinks/SocialMedeaLinks"

export const Footer = () => {
    return (
        <StyledFooter>
            <TopWrapper align="start" direction="row" wrap="wrap" justify="space-between">
                <ContactsHalf>
                    <Logo type="primary"/>
                </ContactsHalf>
                <ContactsHalf direction="column">
                    <IconWrapper align="center">
                        <Icon iconId="location"/>
                        <span>Belarus, Gomel</span>
                    </IconWrapper>
                    <FlexWrapper wrap="wrap" justify="space-between" gap="22px">
                        <IconWrapper align="center">
                            <Icon iconId="phone"/>
                            <span>+375 25 6979075</span>
                        </IconWrapper>
                        <IconWrapper align="center">
                            <Icon iconId="fax"/>
                            <span>proffery@gmail.com</span>
                        </IconWrapper>
                    </FlexWrapper>
                    <FlexWrapper>
                        <SocialMedeaLinks />
                    </FlexWrapper>
                </ContactsHalf>
            </TopWrapper>
            <BottomWrapper align="start" direction="row" wrap="wrap" justify="space-between">
                <Menu type="primary" direction="row" icons={false}/>
                <Copyright><span>Copyright © 2023&nbsp;</span><Link type="primary">Dmitry Shamko</Link></Copyright>
            </BottomWrapper>
        </StyledFooter>
    )
}

const StyledFooter = styled.footer`
    display: flex;
    flex-direction: column;
    grid-area: 3 / 1 / 4 / 6 ;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 50px;
    gap: 20px;
    background-color: ${theme.color.background.primary};
    @media ${theme.media.mobile} {
        padding: 25px;
    }
`

const ContactsHalf = styled(FlexWrapper)`
    width: 50%;
    height: 100%;
    padding: 50px 20px;
    gap: 22px
`
const TopWrapper = styled(FlexWrapper)`
    position: relative;
    height: 100%;
    width: 100%;
    &::before {
        position: absolute;
        content: '';
        width: 100%;
        height: 2px;
        top: 0;
        background-color: ${theme.color.background.second};
    }
    &::after {
        position: absolute;
        content: '';
        width: 100%;
        height: 1px;
        bottom: 0;
        background-color: ${theme.color.text.placeholder};
    }
`

const BottomWrapper = styled(FlexWrapper)`
    width: 100%;
    gap: 32px;
    @media ${theme.media.mobile} {
        gap: 25px;
    }
`

const IconWrapper = styled(FlexWrapper)`
    color: ${theme.color.text.placeholder};
    svg {
        color: ${theme.color.text.primary};
    }
    span {
        white-space: nowrap;
    }
    gap: 10px;
    @media ${theme.media.mobile} {
        svg {
            min-width: 18px;
            width: 18px;
        }
    }

`

const Copyright = styled.div`
    display: flex;
    flex-wrap: wrap;
    span {
        white-space: nowrap;
    }
`