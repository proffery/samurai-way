import { MessageStateType } from "../../../../redux/state"

type MessagePropsType = {
    messageData: MessageStateType
}

export const Message: React.FC<MessagePropsType> = (props) => {
    return (
        <div>{props.messageData.message}</div>
    )
}