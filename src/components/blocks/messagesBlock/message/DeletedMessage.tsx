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
        <FlexWrapper
            style={{
                backgroundColor: messageData.viewed ? 'none' : theme.color.background.primary,
                borderRadius: '10px',
                padding: 'min(15px, 1vw)'
            }}
            direction={messageData.senderId === authId ? 'row' : 'row-reverse'}
            gap='min(15px, 1vw)'>
            <S.Time>{time(messageData.addedAt)}</S.Time>
            {messageData.senderId === authId ?
                <FlexWrapper direction="column" align="center" justify='center'>
                    <S.Photo avatarURL={authPhoto} />
                    <S.Name>{messageData.senderName}&nbsp;</S.Name>
                </FlexWrapper> :
                <FlexWrapper direction="column" align="center" justify='center'>
                    <S.Photo avatarURL={opponentPhoto} />
                    <S.Name>{messageData.senderName}&nbsp;</S.Name>
                </FlexWrapper>
            }
            <FlexWrapper direction='column' style={{ width: '100%' }}>
                <S.Text
                    justify={messageData.senderId === authId ? 'start' : 'end'}
                    align={'center'}
                >{messageData.body}
                </S.Text>
                <S.Text
                    style={{ opacity: .5 }}
                    justify={messageData.senderId === authId ? 'start' : 'end'}
                    align={'center'}
                >This messge mark {messageData.isSpam ? ' as "SPAM" ' : ' for delete and will be removed!'}
                </S.Text>
            </FlexWrapper>
            <FlexWrapper
                style={messageData.viewed ? { opacity: 1 } : { opacity: .3 }}
                align={'center'}
                justify={'center'}
            ><Icon width='80%' iconId='readed' />
            </FlexWrapper>
        </FlexWrapper>
        <FlexWrapper gap='min(15px, 1vw)' align='center' justify='center'>
            <S.OptionButton
                title='Undo'
                variant='link'
                onClick={() => restoreMessage(messageData.id)}
                ariaLabel='Undo'
            >
                <Icon iconId='restore' />
            </S.OptionButton>
        </FlexWrapper>
    </S.Message>
})

