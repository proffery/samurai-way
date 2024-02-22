import styled from "styled-components"
import { Button } from "../../micro/button/Button"
import { theme } from "../../../styles/Theme.styled"
import { Icon } from "../../micro/icon/Icon"
import { font } from "../../../styles/Font"

type LogoutPropsType = {
    className?: string
    login: string
    email: string
    photoUrl: string
    logout: () => void
}

export const Logout: React.FC<LogoutPropsType> = (props) => {
    return (
        <StyledLout>
            <TextContainer>
                <Name>{props.login}</Name>
                <Email>{props.email}</Email>
            </TextContainer>
            <AvatarContainer>
                {props.photoUrl
                    ? <Avatar src={props.photoUrl} />
                    : <DefaultAvatar iconId={'avatarDefault'} viewBox="0 0 1024 1024" />}
                    <LogoutButton variant={'link'} onClick={() => props.logout()}>Logout</LogoutButton>
            </AvatarContainer>
        </StyledLout>
    )
}

const StyledLout = styled.div`
    display: flex;
    flex: 1;
    justify-content: space-around;
    width: fit-content;
    min-width: 24%;
    @media ${theme.media.mobile} {
        min-width: 50%;
    }
`

const AvatarContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    color: ${theme.color.text.placeholder};
    width: 40%;
`
const Avatar = styled.img`
    border-radius: 50% 50%;
    width: 54px;
    height: 54px;
    object-fit: fill;
    aspect-ratio: 1/1;
    background-color: ${theme.color.background.primary};
    border: 1px solid ${theme.color.text.placeholder};
    @media ${theme.media.mobile} {
        width: 40px;
        height: 40px;
    }
`
const DefaultAvatar = styled(Icon)`
    border-radius: 50% 50%;
    width: 60px;
    height: 60px;
    object-fit: fill;
    aspect-ratio: 1/1;
    background-color: ${theme.color.background.primary};
    border: 1px solid ${theme.color.text.placeholder};
    @media ${theme.media.mobile} {
        width: 40px;
        height: 40px;
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
    ${font({ weight: 400, Fmin: 10, Fmax: 14 })}
`