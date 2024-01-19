import styled from "styled-components"
import { FriendsBlock } from "../../../blocks/friendsBlock/FriendsBlock"
import { theme } from "../../../../styles/Theme.styled"
import { MessagesPageStateType, MessagesReducerActionsType } from "../../../../redux/messagesReducer"
import { MessagesBlockContainer } from "../../../blocks/messagesBlock/MessagesBlockContainer"

type MessagesPropsType = {
    messagesData: MessagesPageStateType
    dispatch: (action: MessagesReducerActionsType) => void
}

export const Messages: React.FC<MessagesPropsType> = (props) => {
    return (
        <StyledMessages id="messages">
            <MessagesFriendsBlock
                block_header="Dialogs"
                friendsData={props.messagesData.dialogs}
            />
            <MessagesBlockContainer
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