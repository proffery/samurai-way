import styled from "styled-components"
import { MessageStateType } from "../../../../redux/state"
import { theme } from "../../../../styles/Theme.styled"
import { font } from "../../../../styles/Font"
import avatarImg from '../../../../assets/images/Author.webp'
import { FlexWrapper } from "../../../micro/FlexWrapper"

type MessagePropsType = {
    messageData: MessageStateType
}

export const Message: React.FC<MessagePropsType> = (props) => {
    return (
        <StyledMessage>
            <FlexWrapper direction="column" align="center">
                <Avatar src={avatarImg} />
                <AuthorName>Dmitry&nbsp;</AuthorName>
            </FlexWrapper>
            <MessageText>{props.messageData.message}</MessageText>   
        </StyledMessage>
    )
}

const StyledMessage = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px;
    ${font({weight: 300, Fmin: 10, Fmax: 16})}
    border-bottom: 1px solid;
    border-color: ${theme.color.background.primary};
`

const Avatar = styled.img`
   border-radius: 50%;
   width: 60%;
   max-width: 50px;
`

const MessageText = styled.div`
    display: flex;
    width: 100%;
`

const AuthorName = styled.span`
    ${font({weight: 400, Fmin: 10, Fmax: 14})}
    color: ${theme.color.text.primary_dark};
`