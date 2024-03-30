import { S } from "./OnlineMarker_Styles"

type Props = {
  className?: string
  lastActivityDate: string
}
export type OnlineStatus = "online" | "busy" | "offline"
const MIN_ONLINE = 10
const MIN_BUSY = 30
const MIN_IN_HOUR = 60
const MIN_IN_DAY = MIN_IN_HOUR * 24
const MIN_IN_YEAR = MIN_IN_DAY * 365

export const OnlineMarker: React.FC<Props> = ({ lastActivityDate: lastUserActivityDate, className }) => {
  const lastActivityInMin = Math.ceil((Date.now() - Date.parse(lastUserActivityDate)) / 1000 / 60)

  const status = (): OnlineStatus => {
    if (lastActivityInMin <= MIN_ONLINE) return "online"
    else if (lastActivityInMin <= MIN_BUSY) return "busy"
    else return "offline"
  }
  const activityTime = (): string => {
    if (lastActivityInMin < MIN_IN_HOUR) {
      return lastActivityInMin + " min"
    } else if (lastActivityInMin < MIN_IN_DAY) {
      return Math.ceil(lastActivityInMin / MIN_IN_HOUR) + " hours"
    } else if (lastActivityInMin < MIN_IN_YEAR) {
      return Math.ceil(lastActivityInMin / MIN_IN_DAY) + " days"
    } else return Math.ceil(lastActivityInMin / MIN_IN_YEAR) + " years"
  }
  return <S.OnlineMarker className={className} title={`Last activity: ${activityTime()} ago`} status={status()} />
}
