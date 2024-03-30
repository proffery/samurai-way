import { FlexWrapper } from 'components/common/FlexWrapper.styled'
import { Icon } from 'components/common/icon/Icon'
import { memo } from 'react'
import { MessagesDomain } from 'store/messages/messagesReducer'
import { theme } from 'styles/Theme.styled'
import { S } from './Message_Styles'

type Props = {
    messageData: MessagesDomain
    opponentPhoto?: string
    authPhoto: string
    authId: number
    restoreMessage: (messageId: string) => void
}

export const DeletedMessage: React.FC<Props> = memo((props) => {
    const { messageData, authId, authPhoto, opponentPhoto, restoreMessage } = props
    const time = (date: string) => `${new Date(date).getHours()}:${new Date(date).getMinutes()}`
    const date = (date: string) => new Date(date).toLocaleDateString()

    return <S.Message>
        <S.Date>{date(messageData.addedAt)}</S.Date>
        <S.MessageWrapper viewed={messageData.viewed ? 'true' : 'false'}
            isMeOwner={messageData.senderId === authId ? 'true' : 'false'}
        >
            <S.Time>{time(messageData.addedAt)}</S.Time>
            <FlexWrapper direction="column" align="center" justify='center'>
                <S.Photo avatarURL={messageData.senderId === authId
                    ? authPhoto
                    : opponentPhoto
                } />
                <S.Name>{messageData.senderId === authId
                    ? messageData.senderName
                    : messageData.senderName}&nbsp;
                </S.Name>
            </FlexWrapper>
            <FlexWrapper direction='column' style={{ width: '100%' }}>
                <S.Text justify={messageData.senderId === authId ? 'start' : 'end'}
                    align={'center'}
                >{messageData.body}
                </S.Text>
                <S.Text style={{ opacity: .3, color: `${theme.color.background.status_error}` }}
                    justify={'center'}
                    align={'center'}
                >This messge mark {messageData.isSpam ? ' as "SPAM" ' : ' for delete '} and will be removed!
                </S.Text>
            </FlexWrapper>
            <S.ReadedIconWrapper viewed={messageData.viewed ? 'true' : 'false'}
            ><Icon width='80%' iconId='readed' />
            </S.ReadedIconWrapper>
        </S.MessageWrapper>
        <S.ButtonsWrapper>
            <S.OptionButton title='Undo'
                variant='link'
                onClick={() => restoreMessage(messageData.id)}
                ariaLabel='Undo'
            ><Icon iconId='restore' />
            </S.OptionButton>
        </S.ButtonsWrapper>
    </S.Message>
})

