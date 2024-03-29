import { S } from './MessagesMarker_Styles'

type Props = {
    newMessagesCount: number
    className?: string
}

export const MessagesMarker: React.FC<Props> = ({ newMessagesCount, className }) => {
    const countFormatter = () => newMessagesCount > 99 ? 99 : newMessagesCount
    
    return <S.MessagesMarker
        className={className}
        messages={countFormatter()}
        title={`${newMessagesCount} unread messages`}
    />
}