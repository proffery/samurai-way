import { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectAuthData } from 'store/auth/authSelectors'
import { useActions } from 'utils/customHooks/useActions'
import { S } from './Logout_Styles'
import { selectNewMessagesCount } from 'store/messages/messagesSelectors'

export const Logout: React.FC = memo(() => {
    const { login, email, photoUrl } = useSelector(selectAuthData)
    const newMessagesCount = useSelector(selectNewMessagesCount)
    const { logout } = useActions()
    useEffect(() => {
        newMessagesCount > 0 ? 
        document.title =  `Social Network - ${newMessagesCount} new message!` :
        document.title =  'Social Network'

    }, [newMessagesCount])

    return <S.Logout>
        <S.TextContainer>
            <S.Name>{login}</S.Name>
            <S.Email>{email}</S.Email>
        </S.TextContainer>
        <S.AvatarContainer>
            <S.AvatarWithNewMessages avatarURL={photoUrl} messages={newMessagesCount} />
            <S.LogoutButton
                ariaLabel={'Log Out button'}
                variant={'link'}
                onClick={logout}
            >Log out</S.LogoutButton>
        </S.AvatarContainer>
    </S.Logout>
})
