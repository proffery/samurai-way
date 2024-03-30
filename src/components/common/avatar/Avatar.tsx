import { memo } from "react"
import { S } from "./Avatar_Styles"
import { OnlineMarker } from "./onlineMarker/OnlineMarker"
import { MessagesMarker } from "components/common/avatar/messagesMarker/MessagesMarker"

type AvatarPropsType = {
    className?: string
    avatarURL?: string
    lastActivityDate?: string
    newMessagesCount?: number
}

export const Avatar: React.FC<AvatarPropsType> = memo(
    ({ avatarURL, newMessagesCount, lastActivityDate, className }) => {
        return (
            <S.Container className={className}>
                {avatarURL ? (
                    <S.Image src={avatarURL} alt="Avatar" />
                ) : (
                    <S.DefaultImage iconId={"avatarDefault"} viewBox="0 0 1024 1024" height={"100%"} width={"100%"} />
                )}
                {lastActivityDate && <OnlineMarker lastActivityDate={lastActivityDate} />}
                {newMessagesCount && newMessagesCount > 0 ? (
                    <MessagesMarker newMessagesCount={newMessagesCount} />
                ) : null}
            </S.Container>
        )
    },
)
