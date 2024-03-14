import React, { memo } from 'react'
import { MouseEvent } from 'react'
import { NavLink } from 'react-router-dom'
import { theme } from 'styles/Theme.styled'
import styled, { css } from 'styled-components'
import { Icon } from 'components/common/icon/Icon'
import { IconLinksStateType } from 'store/app/appReducer'

type MenuPropsType = {
    type: 'primary' | 'secondary'
    direction: 'row' | 'column'
    icons?: boolean
    name: boolean
    menuItems: IconLinksStateType[]
}

export const Menu: React.FC<MenuPropsType> = memo((props) => {
    const onClickHandler = (e: MouseEvent) => {
        e.stopPropagation()
    }
    return (
        <StyledMenu direction={props.direction} type={props.type}>
            <ul role="menu" aria-label="menu">
                {props.menuItems.map((item) => {
                    return (
                        <li key={item.id}>
                            <StyledNavLink
                                to={item.href}
                                type={props.type}
                                tabIndex={0}
                                onClick={onClickHandler}
                                role="menuitem"
                            >
                                {props.icons &&
                                    <IconWrapper>
                                        <Icon
                                            iconId={item.icon_id}
                                            height="100%"
                                            width="100%"
                                            viewBox={item.viewBox}
                                        />
                                    </IconWrapper>
                                }
                                {props.name && item.name}
                            </StyledNavLink>
                        </li>
                    )
                })}
            </ul>
        </StyledMenu>
    )
})

type StyledMenuType = {
    type: 'primary' | 'secondary'
    direction: 'row' | 'column'
}

const StyledMenu = styled.div<StyledMenuType>`
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
        
    }
`

const StyledNavLink = styled(NavLink) <StyledMenuType>`
    display: flex;
    align-items: center;
    opacity: .7;
    ${props => props.type === 'primary' && css<StyledMenuType>`
        color: ${theme.color.text.primary_dark};

    `}
    
    ${props => props.type === 'secondary' && css<StyledMenuType>`
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
        min-width: 25px;
    }
`
