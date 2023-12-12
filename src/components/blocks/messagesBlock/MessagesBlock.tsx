import React, { ChangeEvent, MouseEvent, KeyboardEvent } from "react"
import { BlockHeader } from "../BlockHeader.styled"
import { BlockSection } from "../BlockSection.styled"
import { MessageStateType, MessagesPageStateType } from "../../../redux/state"
import { Message } from "./message/Message"
import styled from "styled-components"
import { FlexWrapper } from "../../micro/FlexWrapper"
import { Button } from "../../micro/button/Button"
import { Field } from "../../micro/field/Field.styled"
import { MessagesReducerActionsType, addMessageAC, messageOnChangeAC } from "../../../redux/messageReducer"

type MessagesBlockPropsType = {
    className?: string
    messagesData: MessagesPageStateType
    dispatch: (action: MessagesReducerActionsType) => void
}

export const MessagesBlock: React.FC<MessagesBlockPropsType> = (props) => {

    const onChangeMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(messageOnChangeAC(e.currentTarget.value))
    }

    const addMessageHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        props.dispatch(addMessageAC())
    }

    const addMessageCtrlEnterHandler = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            props.dispatch(addMessageAC())
        }
    }

    return (
        <BlockSection id="messages" className={props.className}>
            <BlockHeader>Messages</BlockHeader>
            <MessagesList messagesData={props.messagesData.messages} />
            <Form
                onKeyDown={addMessageCtrlEnterHandler}
            >
                <Field
                    as={"textarea"}
                    aria-label="enter your post"
                    placeholder="Enter your post"
                    bordered={'true'}
                    value={props.messagesData.newMessageForm}
                    onChange={onChangeMessageHandler}
                />
                <FlexWrapper>
                    <Button
                        type={'submit'}
                        button_style={'primary'}
                        onClick={addMessageHandler}
                        name={'Send'}
                    />
                </FlexWrapper>
            </Form>
        </BlockSection>
    )
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-self: end;
    gap: 10px;
    textarea {
        min-height: 70px;
    }
`

type MessagesListPropsType = {
    messagesData: MessageStateType[]
}

const MessagesList: React.FC<MessagesListPropsType> = (props) => {
    return (
        <StyledMessagesList>
            {props.messagesData.map(message =>
                <Message key={message.id} messageData={message} />)}
        </StyledMessagesList>
    )
}

const StyledMessagesList = styled.div`
    height: 100%;
    gap: 20px;
`