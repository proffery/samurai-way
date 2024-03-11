import styled from "styled-components"
import { font } from "../../../styles/Font"
import { theme } from "../../../styles/Theme.styled"
import { Avatar } from '../../common/avatar/Avatar'
import { Button } from "../../common/button/Button"
import { FlexWrapper } from '../../common/FlexWrapper.styled'
import { memo } from 'react'

type LogoutPropsType = {
    className?: string
    login: string
    email: string
    photoUrl: string
    logOut: () => void
}

export const Logout: React.FC<LogoutPropsType> = memo((props) => {
    const { login, email, photoUrl } = props

    const logOutHandeler = () => {
        props.logOut()
    }

    return (
        <StyledLogout>
            <TextContainer>
                <Name>{login}</Name>
                <Email>{email}</Email>
            </TextContainer>
            <AvatarContainer direction={'column'} gap='5px'>
                <Avatar avatarURL={photoUrl} />
                <LogoutButton variant={'link'} onClick={logOutHandeler}>Log out</LogoutButton>
            </AvatarContainer>
        </StyledLogout>
    )
})

const StyledLogout = styled.div`
    display: flex;
    flex: 1;
    justify-content: space-around;
    width: fit-content;
    min-width: 24%;
    @media ${theme.media.mobile} {
        min-width: 15%;
    }
`
const TextContainer = styled.div`
    display: flex;
    gap: 3px;
    width: 80%;
    width: fit-content;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    @media ${theme.media.mobile} {
        display: none;
    }
`
const AvatarContainer = styled(FlexWrapper)`
    width: 20%;
    justify-content: center;
    align-items: center;
`
const Name = styled.span`
    overflow-wrap: anywhere;
    ${font({ weight: 500, Fmin: 10, Fmax: 14 })}
`
const Email = styled.span`
    overflow-wrap: anywhere;
    ${font({ weight: 300, Fmin: 10, Fmax: 12 })}
`
const LogoutButton = styled(Button)`
    align-self: center;
    text-decoration: underline;
    ${font({ weight: 400, Fmin: 10, Fmax: 14 })}
`