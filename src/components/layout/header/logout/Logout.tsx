import { memo, useEffect } from "react"
import { useSelector } from "react-redux"
import { selectAuthData } from "store/auth/authSelectors"
import { useActions } from "utils/customHooks/useActions"
import { S } from "./Logout_Styles"
import { selectNewMessagesCount } from "store/messages/messagesSelectors"
import { Avatar } from "components/common/avatar/Avatar"
import { Patch } from "components/app/Router/routeNames"

export const Logout: React.FC = memo(() => {
    const { login, email, photoUrl } = useSelector(selectAuthData)
    const newMessagesCount = useSelector(selectNewMessagesCount)
    const { logout } = useActions()
    useEffect(() => {
        newMessagesCount > 0
            ? (document.title = `Social Network - ${newMessagesCount} new message!`)
            : (document.title = "Social Network")
    }, [newMessagesCount])

    return (
        <S.Logout>
            <S.TextContainer>
                <S.Name>{login}</S.Name>
                <S.Email>{email}</S.Email>
            </S.TextContainer>
            <S.AvatarContainer to={newMessagesCount > 0 ? Patch.Messages : Patch.Profile}>
                <Avatar avatarURL={photoUrl} newMessagesCount={newMessagesCount} />
                <S.LogoutButton ariaLabel={"Log Out button"} variant={"link"} onClick={logout}>
                    Log out
                </S.LogoutButton>
            </S.AvatarContainer>
        </S.Logout>
    )
})
