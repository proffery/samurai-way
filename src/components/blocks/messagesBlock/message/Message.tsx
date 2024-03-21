
import { font } from 'styles/Font'
import styled from 'styled-components'
import { theme } from 'styles/Theme.styled'
import { memo, useRef, useEffect } from 'react'
import avatarImg from '../../../../assets/images/Author.webp'
import { FlexWrapper } from 'components/common/FlexWrapper.styled'
import { MessageRasponseType } from 'api/social-network-api'

type MessagePropsType = {
    messageData: MessageRasponseType
}

export const Message: React.FC<MessagePropsType> = memo((props) => {
    const bottomRef = useRef<null | HTMLDivElement>(null)
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [props.messageData])
    return (
        <StyledMessage>
            <FlexWrapper direction="column" align="center">
                <Avatar src={avatarImg} />
                <AuthorName>Dmitry&nbsp;</AuthorName>
            </FlexWrapper>
            <MessageText>{props.messageData.body}</MessageText>
            <div ref={bottomRef} />
        </StyledMessage>
    )
})

const StyledMessage = styled.div`
    display: flex;
    gap: 10px;
    padding: 15px;
    ${font({ weight: 300, Fmin: 10, Fmax: 16 })}
    border-bottom: 1px solid;
    border-color: ${theme.color.background.primary};
`
const Avatar = styled.img`
   border-radius: 50%;
   width: 100%;
   max-width: 50px;
`
const MessageText = styled.div`
    display: flex;
    align-self: center;
    width: 100%;
`
const AuthorName = styled.span`
    ${font({ weight: 400, Fmin: 10, Fmax: 14 })}
    color: ${theme.color.text.primary_dark};
`