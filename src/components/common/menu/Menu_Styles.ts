import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { theme } from 'styles/Theme.styled'

type Props = {
    type: 'primary' | 'secondary'
    direction: 'row' | 'column'
}
const Menu = styled.div<Props>`
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
const Link = styled(NavLink) <Props>`
    display: flex;
    align-items: center;
    opacity: .7;
    ${props => props.type === 'primary' && css<Props>`
        color: ${theme.color.text.primary_dark};

    `}
    ${props => props.type === 'secondary' && css<Props>`
        color: ${theme.color.text.second};
    `}
    &:hover {
        opacity: 1;
    }
    &.active {
        opacity: 1;
    }
`
const Wrapper = styled.div`
    display: flex;
    height: 15%;
    width: 15%;
    min-width: 24px;
    @media ${theme.media.mobile} {
        min-width: 25px;
    }
`

export const S = {
    Link,
    Menu,
    Wrapper
}