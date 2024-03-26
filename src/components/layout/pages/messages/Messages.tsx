import { Patch } from 'components/app/Router/routeNames'
import { DialogsBlock } from 'components/blocks/dialogsBlock/DialogsBlock'
import { FriendsBlock } from 'components/blocks/friendsBlock/FriendsBlock'
import { MessagesBlock } from 'components/blocks/messagesBlock/MessagesBlock'
import { FlexWrapper } from 'components/common/FlexWrapper.styled'
import { ToTop } from 'components/common/toTop/ToTop'
import React, { memo, useEffect } from "react"
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { selectAppIsLoading } from 'store/app/appSelectors'
import { selectAuthData } from 'store/auth/authSelectors'
import { selectMessagesState } from 'store/messages/messagesSelectors'
import styled from "styled-components"
import { theme } from 'styles/Theme.styled'
import { useActions } from 'utils/customHooks/useActions'

type Props = { className?: string }

export const Messages: React.FC<Props> = memo(({ className }) => {
    const messagesState = useSelector(selectMessagesState)
    const appIsLoading = useSelector(selectAppIsLoading)
    const authData = useSelector(selectAuthData)
    const { addAppAlert, startDialog, getDialogs, sendMessage, getMessages } = useActions()
    const params = useParams<{ userId: string }>()
    const history = useHistory()
    const { currentPage, messagesOnPage, totalMessagesCount } = messagesState
    const DOWNLOAD_MESSAGES_PORTION = 3

    useEffect(() => {
        if (!params.userId) {
            getDialogs()
                .then(res => {
                    if (res.payload?.dialogs[0]) {
                        history.push(Patch.Messages + res.payload.dialogs[0].id)
                    } else addAppAlert('info', 'Dialogs is emty... Start chatting with someone.')
                }).catch(err => {
                    addAppAlert('failed', err)
                })
        }
        else {
            startDialog(+params.userId)
            getMessages({ userId: +params.userId, currentPage, messagesOnPage })
        }
    }, [params.userId, currentPage, messagesOnPage])

    const pageChangeHandler = () => {
        let newMessagesNumber = messagesOnPage
        if (messagesOnPage < totalMessagesCount) {
            newMessagesNumber += DOWNLOAD_MESSAGES_PORTION
            getMessages({ userId: +params.userId, currentPage: 1, messagesOnPage: newMessagesNumber })
        }
    }

    const addMessage = (message: string) => {
        params.userId && sendMessage({ userId: +params.userId, message })
    }

    return (
        <StyledMessages id="messages">
            <ToTop anchor_id='dialogs-block' />
            <StyledFriendsWrapper direction={'column'} gap={'min(30px, 2vw)'}>
                <FriendsBlock className={className} blockHeaderName='Friens' />
                <FriendsBlock className={className} blockHeaderName='Might know' isFriends={false} />
            </StyledFriendsWrapper>
            <MessagesWrapper direction={'column'}>
                <DialogsBlock dialogs={messagesState.dialogs} />
                <MessagesBlock
                    authData={authData}
                    appIsLoading={appIsLoading}
                    messagesState={messagesState}
                    addMessage={addMessage}
                    addAppAlert={addAppAlert}
                    pageChangeHandler={pageChangeHandler}
                />
            </MessagesWrapper>
        </StyledMessages>
    )
})

const StyledMessages = styled.main`
    height: 100%;
    gap: min(30px, 2vw);
    display: flex;
    overflow-x: hidden;
    @media ${theme.media.mobile} {
        flex-direction: column;
    }
`
const StyledFriendsWrapper = styled(FlexWrapper)`
    width: 20%;
    @media ${theme.media.mobile} {
        display: none;
    }
`
const MessagesWrapper = styled(FlexWrapper)`
    width: 77%;
    flex: 1;
    gap: min(30px, 2vw);
    @media ${theme.media.mobile} {
        width: 100%;
    }
`