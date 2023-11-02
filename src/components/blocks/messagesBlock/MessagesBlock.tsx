import React from "react"
import { BlockHeader } from "../BlockHeader.styled"
import { BlockSection } from "../BlockSection.styled"
import { MessageStateType } from "../../../redux/state"
import { Message } from "./message/Message"
import styled from "styled-components"
import { FlexWrapper } from "../../micro/FlexWrapper"
import { Button } from "../../micro/button/Button"
import { Field } from "../../micro/field/Field.styled"

type MessagesBlockPropsType = {
    className?: string
    messagesData: MessageStateType[]
}

export const MessagesBlock: React.FC<MessagesBlockPropsType> = (props) => {

    const AddMessageHandler = () => {
        alert('SendMessage')
    }

    return (
        <BlockSection id="messages" className={props.className}>
            <BlockHeader>Messages</BlockHeader>
            <MessagesList messagesData={props.messagesData}/>
            <Form>
                <Field
                    as={"textarea"}
                    aria-label="enter your post"
                    placeholder="Enter your post"
                    bordered={'true'}
                />
                <FlexWrapper>
                    <Button
                        type={'submit'}
                        button_style={'primary'}
                        onClick={AddMessageHandler}
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