import React, { ChangeEvent, MouseEvent, KeyboardEvent, useState, memo } from "react"
import { BlockHeader } from "../../micro/BlockHeader.styled"
import { BlockSection } from "../../micro/BlockSection.styled"
import { Message } from "./message/Message"
import styled from "styled-components"
import { FlexWrapper } from "../../micro/FlexWrapper.styled"
import { Button } from "../../micro/button/Button"
import { Input } from "../../micro/input/Input.styled"
import { MessageType } from "../../../redux/messages/messagesReducer"

type MessagesBlockPropsType = {
    messages: MessageType[]
    newMessageForm: string
    onChangeMessage: (text: string) => void
    addMessage: () => void
}

export const MessagesBlock: React.FC<MessagesBlockPropsType> = memo((props) => {
    let [error, setError] = useState<string | null>('Enter your message')

    const onChangeMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.onChangeMessage(e.currentTarget.value)
    }

    const addMessageOnClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (error) setError(null)
        addMessage()
    }

    const addMessageCtrlEnterHandler = (e: KeyboardEvent<HTMLFormElement>) => {
        if (error) setError(null)
        if (e.key === 'Enter' && e.ctrlKey) {
            addMessage()
        }
    }

    const addMessage = () => {
        if (props.newMessageForm.trim() !== "") {
            props.addMessage()
        } else {
            setError('Enter your message')
        }
    }

    return (
        <StyledMessagesBlock id="messages">
            <BlockHeader>Messages</BlockHeader>
            <MessagesList messages={props.messages} />
            <Form
                onKeyDown={addMessageCtrlEnterHandler}
            >
                <Input
                    as={"textarea"}
                    aria-label="enter your message"
                    placeholder="Enter your message"
                    bordered={'true'}
                    value={props.newMessageForm}
                    onChange={onChangeMessageHandler}
                />
                <FlexWrapper>
                    <Button
                        type={'submit'}
                        variant={'primary'}
                        onClick={addMessageOnClickHandler}
                        disabled={!!error}
                    >{'Send'}</Button>
                </FlexWrapper>
            </Form>
        </StyledMessagesBlock>
    )
})

const StyledMessagesBlock = styled(BlockSection)`
    width: 100%;
    min-width: 75%;
    height: fit-content;
    min-height: 50%;
    overflow-y: scroll;
`

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
    messages: MessageType[]
}

const MessagesList: React.FC<MessagesListPropsType> = (props) => {
    return (
        <StyledMessagesList>
            {props.messages.map(message =>
                <Message key={message.id} messageData={message} />
            )}
        </StyledMessagesList>
    )
}

const StyledMessagesList = styled.div`
    gap: 20px;
    overflow-y: auto;
`