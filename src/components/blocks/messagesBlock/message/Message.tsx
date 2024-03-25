
import { MessageResponse } from 'api/dialogsAPI'
import { FlexWrapper } from 'components/common/FlexWrapper.styled'
import { Icon } from 'components/common/icon/Icon'
import { memo, useEffect, useRef } from 'react'
import { theme } from 'styles/Theme.styled'
import { S } from './Message_Styles'

type Props = {
    messageData: MessageResponse
    opponentPhoto?: string
    authPhoto: string
    authId: number
}

export const Message: React.FC<Props> = memo((props) => {
    const { messageData, authId, authPhoto, opponentPhoto } = props
    const bottomRef = useRef<null | HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messageData])

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
            <S.Text
                justify={messageData.senderId === authId ? 'start' : 'end'}
                align={'center'}
            >{messageData.body}
            </S.Text>
            <FlexWrapper
                style={messageData.viewed ? { opacity: 1 } : { opacity: .3 }}
                align={'center'}
                justify={'center'}
            ><Icon width='80%' iconId='readed' />
            </FlexWrapper>
        </FlexWrapper>
        <div style={{ padding: 0, margin: 0 }} ref={bottomRef} />
    </S.Message>
})

