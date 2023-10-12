import styled from "styled-components"
import { Container } from "../../components/Container"
import { Logo } from "../../components/logo/Logo"
import { theme } from "../../styles/Theme.styled"
import { FlexWrapper } from "../../components/FlexWrapper"
import { Menu } from "../navbar/menu/Menu"
import { Link } from "../../components/link/Link.styled"

export const Footer = () => {
    return (
        <StyledFooter>
            <FooterContainer>
                <TopWrapper align="start" direction="row" wrap="wrap" justify="space-between">
                    <ContactsHalf><Logo type="primary"/></ContactsHalf>
                    <ContactsHalf>Contacts</ContactsHalf>
                </TopWrapper>
                <FlexWrapper align="start" direction="row" justify="space-between">
                    <Menu type="primary" direction="row" icons={false}/>
                    <Copyright><span>Copyright © 2023&nbsp;</span><Link type="primary">Dmitry Shamko</Link></Copyright>
                </FlexWrapper>
            </FooterContainer>
        </StyledFooter>
    )
}

const StyledFooter = styled.footer`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    bottom: 0;
    left: 0;
    right: 0;
    color: ${theme.color.text.primary_dark};
`

const FooterContainer = styled(Container)`
    flex-direction: column;
    padding: 50px;
    gap: 20px;
`

const ContactsHalf = styled(FlexWrapper)`
    width: 50%;
    height: 100%;
    padding: 50px 20px;
`
const TopWrapper = styled(FlexWrapper)`
    position: relative;
    height: 100%;
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
        background-color: ${theme.color.background.primary};
    }
`
const Copyright = styled.div`
    display: flex;
    flex-wrap: wrap;
    span {
        white-space: nowrap;
    }
`