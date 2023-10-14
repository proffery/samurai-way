import styled from "styled-components"
import { Icon } from "../../../components/icon/Icon"
import { Link } from "../../../components/link/Link.styled"
import { menuItems } from "../../../data/menuItems"
import { theme } from "../../../styles/Theme.styled"

type MenuType = {
    type: 'primary' | 'secondary'
    icons: boolean
    direction: 'row' | 'column'
}

export const Menu = (props: MenuType) => {
    return (
        <StyledMenu direction={props.direction}>
            <ul role="menu" aria-label="menu">
                {menuItems.map(item => {
                    return(
                        <li role="menuitem" key={item.id}>
                            <Link type={props.type} href={item.item_href}>
                                {props.icons && 
                                    <IconWrapper>
                                        <Icon iconId={item.item_icon} height="100%" width="100%" viewBox={item.viewBox} />
                                    </IconWrapper>
                                }
                                {item.item_name}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </StyledMenu>
    )
}


type StyledMenuType = {
    direction: 'row' | 'column'
}

const StyledMenu = styled.nav<StyledMenuType>`
    ul {
        display: flex;
        flex-wrap: wrap;
        flex-direction: ${props => props.direction};
        list-style-type: none;
        gap: 32px;
        li {
            display: flex;
            align-items: center;
            justify-content: flex-start;
        }
        @media ${theme.media.mobile} {
            gap: 16px;
        }
    }
`
const IconWrapper = styled.div`
    display: flex;
    height: 15%;
    width: 15%;
    min-width: 24px;
    @media ${theme.media.mobile} {
        min-width: 20px;
    }
`
