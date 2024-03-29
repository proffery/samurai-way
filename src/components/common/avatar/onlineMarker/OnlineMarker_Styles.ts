import { OnlineStatus } from 'components/common/avatar/OnlineMarker'
import styled, { css } from 'styled-components'
import { theme } from 'styles/Theme.styled'

type MarkerProps = {
    status?: OnlineStatus
}
const Marker = styled.div<MarkerProps>`
    position: absolute;
    top: 85%;
    left: 110%;
    transform: translate(-110%, -85%);
    &::before{
        position: absolute;
        content: '';
        min-height: 1vmax;
        min-width: 1vmax;
        border-radius: 50%;
        background-color: transparent;
        ${props => props.status === 'online' && css`
            background-color: ${theme.color.background.status_success};
            border: 2px solid ${theme.color.background.block};
        `}
        ${props => props.status === 'busy' && css`
            background-color: ${theme.color.background.status_busy};
            border: 2px solid ${theme.color.background.block};
        `}
        ${props => props.status === 'offline' && css`
            background-color: ${theme.color.background.status_error};
            border: 2px solid ${theme.color.background.block};
        `}
        cursor: pointer;
    }
`

export const S = { Marker }