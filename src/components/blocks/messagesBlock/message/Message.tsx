
import { MessageResponseType } from 'api/social-network-api'
import { Avatar } from 'components/common/avatar/Avatar'
import { FlexWrapper } from 'components/common/FlexWrapper.styled'
import { Icon } from 'components/common/icon/Icon'
import { memo, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { font } from 'styles/Font'
import { theme } from 'styles/Theme.styled'

type MessagePropsType = {
    className?: string
    messageData: MessageResponseType
    opponentPhoto?: string
    authPhoto: string
    authId: number
}

export const Message: React.FC<MessagePropsType> = memo((props) => {
    const { messageData, authId, authPhoto, opponentPhoto } = props
    const bottomRef = useRef<null | HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messageData])

    const time = (date: string) => `${new Date(date).getHours()}:${new Date(date).getMinutes()}`
    const date = (date: string) => new Date(date).toLocaleDateString()

    return (
        <StyledMessage direction='column'>
            <MessageDate>
                {date(messageData.addedAt)}
            </MessageDate>
            <FlexWrapper 
                style={{
                    backgroundColor: messageData.viewed ? 'none' : theme.color.background.primary,
                    borderRadius: '10px',
                    padding: 'min(15px, 1vw)'
                }}
                direction={messageData.senderId === authId ? 'row' : 'row-reverse'}
                gap='min(15px, 1vw)'>
                <MessageTime>{time(messageData.addedAt)}</MessageTime>
                {messageData.senderId === authId ?
                    <FlexWrapper direction="column" align="center" justify='center'>
                        <StyledAvatar avatarURL={authPhoto} />
                        <AuthorName>{messageData.senderName}&nbsp;</AuthorName>
                    </FlexWrapper> :
                    <FlexWrapper direction="column" align="center" justify='center'>
                        <StyledAvatar avatarURL={opponentPhoto} />
                        <AuthorName>{messageData.senderName}&nbsp;</AuthorName>
                    </FlexWrapper>
                }
                <MessageText
                    justify={messageData.senderId === authId ? 'start' : 'end'}
                >
                    {messageData.body}
                </MessageText>
                <FlexWrapper
                    style={messageData.viewed ? { opacity: 1 } : { opacity: .3 }}
                    align={'center'}
                    justify={'center'}
                >
                    <Icon width='80%' iconId='readed' />
                </FlexWrapper>
            </FlexWrapper>
                <div style={{padding:0, margin:0}} ref={bottomRef} />
        </StyledMessage>
    )
})

const StyledMessage = styled(FlexWrapper)`
    gap: min(15px, 1vw);
    display: flex;
    ${font({ weight: 300, Fmin: 10, Fmax: 16 })}
    border-bottom: 1px solid;
    border-color: ${theme.color.background.primary};
`
const MessageText = styled(FlexWrapper)`
    align-self: center;
    text-align: justify;
    word-wrap: break-word;
    width: 100%;
    height: 100%;
`
const MessageDate = styled.span`
    align-self: center;
    justify-content: center;
    text-align: center;
    color: ${theme.color.text.primary};
    width: 100%;
`
const AuthorName = styled.span`
    text-align: center;
    ${font({ weight: 400, Fmin: 10, Fmax: 14 })}
    color: ${theme.color.text.primary_dark};
`
const StyledAvatar = styled(Avatar)`
    min-width: 40px;
    max-width: 60px;
`
const MessageTime = styled.span`
    ${font({ weight: 300, Fmin: 8, Fmax: 10 })}
    align-self: center;
    text-align: center;
`