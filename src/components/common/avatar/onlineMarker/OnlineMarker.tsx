import styled, { css } from 'styled-components'
import { theme } from 'styles/Theme.styled'

type Props = {
    className?: string
    lastUserActivityDate: string
}
type OnlineStatus = 'online' | 'busy' | 'offline'

const ONLINE = 10 //in min
const BUSY = 30 //in min

export const OnlineMarker: React.FC<Props> = ({ lastUserActivityDate, className }) => {
    const status = (date: string): OnlineStatus => {
        const nowDate = new Date()
        const newDate = new Date(date)
        if (Math.abs(nowDate.getUTCMinutes() - newDate.getUTCMinutes()) <= ONLINE) return 'online'
        else if (Math.abs(nowDate.getUTCMinutes() - newDate.getUTCMinutes()) <= BUSY) return 'busy'
        else return 'offline'
    }
    const activity = (date: string): number => {
        const nowDate = new Date()
        const newDate = new Date(date)
        return Math.abs(nowDate.getUTCMinutes() - newDate.getUTCMinutes())
    }
    return <Marker
        className={className}
        title={`Last activity: ${activity(lastUserActivityDate)} min ago`}
        status={status(lastUserActivityDate)}
    />
}


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