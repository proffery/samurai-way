import styled from "styled-components"
import { FriendsBlock } from "../../../blocks/friendsBlock/FriendsBlock"
import { MessagesBlock } from "../../../blocks/messagesBlock/MessagesBlock"
import { theme } from "../../../../styles/Theme.styled"
import { MessagesPageStateType, MessagesReducerActionsType } from "../../../../redux/messagesReducer"

type MessagesPropsType = {
    messagesData: MessagesPageStateType
    dispatch: (action: MessagesReducerActionsType) => void
}

export const Messages: React.FC<MessagesPropsType> = (props) => {
    return (
        <StyledMessages id="messages">
            <MessagesFriendsBlock block_header="Dialogs" friendsData={props.messagesData.dialogs} />
            <StyledMessagesBlock
                messagesData={props.messagesData}
                dispatch={props.dispatch}
            />
        </StyledMessages>
    )
}

const StyledMessages = styled.main`
    display: flex;
    @media ${theme.media.mobile} {
        flex-direction: column;
    }
`

const MessagesFriendsBlock = styled(FriendsBlock)`
    width: 30%;
    @media ${theme.media.mobile} {
        width: 100%;
        max-height: 30%;
    }
`

const StyledMessagesBlock = styled(MessagesBlock)`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
`