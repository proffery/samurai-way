import { memo } from 'react'
import { S } from './Logout_Styles'
import { Avatar } from 'components/common/avatar/Avatar'

type Props = {
    className?: string
    login: string
    email: string
    photoUrl: string
    logOut: () => void
}

export const Logout: React.FC<Props> = memo((props) => {
    const { login, email, photoUrl, logOut } = props

    return <S.Logout>
        <S.TextContainer>
            <S.Name>{login}</S.Name>
            <S.Email>{email}</S.Email>
        </S.TextContainer>
        <S.AvatarContainer>
            <Avatar avatarURL={photoUrl} />
            <S.LogoutButton
                ariaLabel={'Log Out button'}
                variant={'link'}
                onClick={logOut}
            >Log out</S.LogoutButton>
        </S.AvatarContainer>
    </S.Logout>
})