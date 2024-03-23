import { DialogResponseType, MessageResponseType } from 'api/dialogsAPI'
import { BlockHeader } from 'components/blocks/BlockHeader.styled'
import { BlockSection } from 'components/blocks/BlockSection.styled'
import { Message } from 'components/blocks/messagesBlock/message/Message'
import { Avatar } from 'components/common/avatar/Avatar'
import { Button } from 'components/common/button/Button'
import { FlexWrapper } from 'components/common/FlexWrapper.styled'
import { Input } from 'components/common/input/Input.styled'
import { useFormik } from 'formik'
import { KeyboardEvent, memo } from 'react'
import { NavLink } from 'react-router-dom'
import { AlertType } from 'store/app/appReducer'
import { AuthStateType } from 'store/auth/authReducer'
import styled from 'styled-components'

type MessagesBlockPropsType = {
    messages: MessageResponseType[]
    className?: string
    authData: AuthStateType
    dialogData?: DialogResponseType
    addMessage: (message: string) => void
    addAppAlert: (type: AlertType, message: string) => void
}
type FormikErrorType = {
    message?: string
}
export const MessagesBlock: React.FC<MessagesBlockPropsType> = memo((props) => {
    const { addMessage, addAppAlert, messages, dialogData, authData } = props

    const addMessageCtrlEnterHandler = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            formik.handleSubmit(e)
        }
    }

    const formik = useFormik({
        initialValues: {
            message: '',
        },
        onSubmit: (values) => {
            addMessage(values.message)
            formik.resetForm()
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.message) {
                errors.message = 'Message is emtyt!'
            } else if (values.message.length > 300) {
                errors.message = 'Message must be less than 300 symbols!'
                addAppAlert('failed', errors.message)
            }
            return errors
        },
    })

    return (
        <StyledMessagesBlock id="messages-block">
            <StyledBlockHeader >Messages with {dialogData?.userName}
                <AvatarLink to={'/profile/' + dialogData?.id}>
                    <Avatar avatarURL={dialogData?.photos.small} />
                </AvatarLink>
            </StyledBlockHeader>
            <MessagesList
                messages={messages}
                dialogData={dialogData}
                authData={authData}
            />
            <Form onSubmit={formik.handleSubmit}
                onKeyDown={addMessageCtrlEnterHandler}
            >
                <Input
                    as={"textarea"}
                    aria-label="enter your message"
                    placeholder="Enter your message"
                    bordered={'true'}
                    id={'message'}
                    error={!!formik.errors.message ? 'true' : 'false'}
                    {...formik.getFieldProps('message')}
                    autoFocus
                />
                <FlexWrapper>
                    <Button
                        type={'submit'}
                        variant={'primary'}
                        disabled={!!formik.errors.message}
                        ariaLabel={'Submit button'}
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
    justify-content: space-between;
    min-height: 50%;
    overflow-y: scroll;
`
const StyledBlockHeader = styled(BlockHeader)`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const AvatarLink = styled(NavLink)`
    display: flex;
    width: min(40px, 8vw);
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
    messages: MessageResponseType[]
    dialogData?: DialogResponseType
    authData: AuthStateType
}
const MessagesList: React.FC<MessagesListPropsType> = (props) => {
    const { dialogData, authData, messages } = props
    return (
        <StyledMessagesList>
            {messages.length ?
                messages.map(message =>
                    <Message
                        key={message.id}
                        authId={authData.id}
                        messageData={message}
                        authPhoto={authData.photoUrl}
                        opponentPhoto={dialogData?.photos.small}
                    />
                ) : <EmptyMessages>No messages...</EmptyMessages>
            }
        </StyledMessagesList>
    )
}

const StyledMessagesList = styled.div`
    display: flex;
    flex-direction: column;
    gap: min(15px, 1vw);
    overflow-y: auto;
`
const EmptyMessages = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: hidden;
`