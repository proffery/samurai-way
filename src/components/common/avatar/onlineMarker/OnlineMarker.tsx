import styled, { css } from 'styled-components'
import { theme } from 'styles/Theme.styled'

type Props = {
    className?: string
    lastUserActivityDate: string
}
type OnlineStatus = 'online' | 'busy' | 'offline'

const ONLINE = 10 //in min
const BUSY = 30 //in min
const MIN_IN_HOUR = 60
const MIN_IN_DAY = MIN_IN_HOUR * 24
const MIN_IN_YEAR = MIN_IN_DAY * 365

export const OnlineMarker: React.FC<Props> = ({ lastUserActivityDate, className }) => {
    const lastActivityInMin = Math.ceil((Date.now() - Date.parse(lastUserActivityDate)) / 1000 / 60)

    const status = (): OnlineStatus => {
        if (lastActivityInMin <= ONLINE) return 'online'
        else if (lastActivityInMin <= BUSY) return 'busy'
        else return 'offline'
    }
    const activityTime = (): string => {
        if (lastActivityInMin < MIN_IN_HOUR) {
            return lastActivityInMin + ' min'
        } else if (lastActivityInMin < MIN_IN_DAY) {
            return Math.ceil(lastActivityInMin / MIN_IN_HOUR) + ' hours'
        } else if (lastActivityInMin < MIN_IN_YEAR) {
            return Math.ceil(lastActivityInMin / MIN_IN_DAY) + ' days'
        } else return Math.ceil(lastActivityInMin / MIN_IN_YEAR) + ' years'
    }
    return <Marker
        className={className}
        title={`Last activity: ${activityTime()} ago`}
        status={status()}
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