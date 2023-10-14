import styled, { css } from "styled-components"
import { Icon } from "../../../components/icon/Icon"
import { menuItems } from "../../../data/menuItems"
import { theme } from "../../../styles/Theme.styled"
import { NavLink } from "react-router-dom"

type MenuType = {
    type: 'primary' | 'secondary'
    direction: 'row' | 'column'
    icons?: boolean
}

export const Menu = (props: MenuType) => {
    return (
        <StyledMenu direction={props.direction} type={props.type}>
            <ul role="menu" aria-label="menu">
                {menuItems.map((item) => {
                    return(
                        <li role="menuitem" key={item.id}>
                            <StyledNavLink to={item.href} type={props.type} tabIndex={0}>
                                {props.icons && 
                                    <IconWrapper>
                                        <Icon iconId={item.icon_id} height="100%" width="100%" viewBox={item.viewBox} />
                                    </IconWrapper>
                                }
                                {item.name}
                            </StyledNavLink>
                        </li>
                    )
                })}
            </ul>
        </StyledMenu>
    )
}



const StyledMenu = styled.div<MenuType>`
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

const StyledNavLink = styled(NavLink)<MenuType>`
    display: flex;
    align-items: center;
    opacity: .7;
    ${props => props.type === 'primary' && css<MenuType>`
        color: ${theme.color.text.primary_dark};

    `}
    
    ${props => props.type === 'secondary' && css<MenuType>`
        color: ${theme.color.text.second};
    `}
    
    &:hover {
        opacity: 1;
    }
    
    &.active {
        opacity: 1;
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
