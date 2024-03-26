import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { font } from 'styles/Font'
import { theme } from 'styles/Theme.styled'

const User = styled(NavLink)`
    display: flex;
    position: relative;
    width: 100%;
    justify-content: space-between;
    ${font({ weight: 300, Fmin: 10, Fmax: 16 })}
    gap: 20px;
    padding: 20px 0;
    &::after {
        position: absolute;
        content: '';
        width: 100%;
        height: 1px;
        background-color: ${theme.color.background.primary};
        bottom: 0;
    }
    &:hover {
        outline: 1px solid ${theme.color.background.primary};
        background-color: ${theme.color.background.primary};
        border-radius: 10px;
    }
`
const Info = styled.div`
    width: 65%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${theme.color.text.primary_dark};
    gap: 15px;
`
const Photo = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 50% 50%;
    object-fit: cover;
    aspect-ratio: 1/1;
    width: 54px;
    justify-self: center;
`
const Name = styled.p`
    text-align: center;
    overflow-wrap: anywhere;
    ${font({ weight: 400, Fmin: 10, Fmax: 14 })}
    color: ${theme.color.text.primary_dark};
`
const Status = styled.p`
    text-align: start;
    white-space: normal;
    width: 80%;
    ${font({ weight: 400, Fmin: 12, Fmax: 16 })}
    color: ${theme.color.text.primary_dark};
`
const Container = styled.div`
    display: flex;
    width: 30%;
    align-items: center;
    justify-content: center;
`

export const S = {
    User,
    Info,
    Photo,
    Name,
    Status,
    Container
}