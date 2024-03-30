import { FlexWrapper } from "components/common/FlexWrapper.styled"
import { Icon } from "components/common/icon/Icon"
import { memo } from "react"
import { MessagesDomain } from "store/messages/messagesReducer"
import { S } from "./Message_Styles"

type Props = {
    messageData: MessagesDomain
    opponentPhoto?: string
    authPhoto: string
    authId: number
    markMessageAsDelete: (messageId: string) => void
    markMessageAsSpam: (messageId: string) => void
}

export const Message: React.FC<Props> = memo((props) => {
    const { messageData, authId, authPhoto, opponentPhoto, markMessageAsDelete, markMessageAsSpam } = props
    const time = (date: string) => `${new Date(date).getHours()}:${new Date(date).getMinutes()}`
    const date = (date: string) => new Date(date).toLocaleDateString()

    return (
        <S.Message>
            <S.Date>{date(messageData.addedAt)}</S.Date>
            <S.MessageWrapper
                viewed={messageData.viewed ? "true" : "false"}
                isMeOwner={messageData.senderId === authId ? "true" : "false"}
            >
                <S.Time>{time(messageData.addedAt)}</S.Time>
                <FlexWrapper direction="column" align="center" justify="center">
                    <S.Photo avatarURL={messageData.senderId === authId ? authPhoto : opponentPhoto} />
                    <S.Name>
                        {messageData.senderId === authId ? messageData.senderName : messageData.senderName}&nbsp;
                    </S.Name>
                </FlexWrapper>
                <S.Text justify={messageData.senderId === authId ? "start" : "end"} align={"center"}>
                    {messageData.body}
                </S.Text>
                <S.ReadedIconWrapper viewed={messageData.viewed ? "true" : "false"}>
                    <Icon width="80%" iconId="readed" />
                </S.ReadedIconWrapper>
            </S.MessageWrapper>
            <S.ButtonsWrapper>
                <S.OptionButton
                    title="Delete message"
                    variant="link"
                    onClick={() => markMessageAsDelete(messageData.id)}
                    ariaLabel="Delete"
                >
                    <Icon iconId="trash" />
                </S.OptionButton>
                {messageData.senderId !== authId && (
                    <S.OptionButton
                        title="Mark as spam"
                        variant="link"
                        onClick={() => markMessageAsSpam(messageData.id)}
                        ariaLabel="Spam"
                    >
                        <Icon iconId="spam" />
                    </S.OptionButton>
                )}
            </S.ButtonsWrapper>
        </S.Message>
    )
})
