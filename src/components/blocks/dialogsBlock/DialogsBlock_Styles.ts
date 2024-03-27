import { Avatar } from 'components/common/avatar/Avatar'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { font } from 'styles/Font'
import { theme } from 'styles/Theme.styled'

const Dialog = styled(NavLink)`
    position: relative;
    display: flex;
    height: 60%;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    flex-direction: column;
    aspect-ratio: 1 / 1;
    padding: min(15px, 2vw);
    &.active {
        outline: 1px solid ${theme.color.background.primary};
        background-color: ${theme.color.background.primary};
        border-radius: 10px;
    }
    &:hover {
        outline: 1px solid ${theme.color.background.primary};
        background-color: ${theme.color.background.primary};
        border-radius: 10px;
    }
    ${font({ weight: 400, Fmin: 10, Fmax: 14 })}
    word-break: break-all;
`
const Wrapper = styled.div`
    display: flex;
    overflow-x: auto;
    min-height: 100%;
    width: 100%;
`
const Photo = styled(Avatar)`
    width: 70%;
`
const Name = styled.span`
    color: ${theme.color.text.primary_dark}
`

export const S = {
    Dialog,
    Wrapper,
    Photo,
    Name
}