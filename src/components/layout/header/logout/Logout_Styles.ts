import { font } from 'styles/Font'
import styled, { css } from 'styled-components'
import { theme } from 'styles/Theme.styled'
import { Button } from 'components/common/button/Button'
import { Avatar } from 'components/common/avatar/Avatar'

type Props = {
    messages: number
}
const Logout = styled.div`
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
const AvatarContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 20%;
    justify-content: center;
    align-items: center;
`
const AvatarWithNewMessages = styled(Avatar)<Props>`
    position: relative;
    ${props => props.messages > 0 && css<Props>`
        &::before {
            position: absolute;
            display: flex;
            content: '${props.messages}';
            height: calc(1em + 2px);
            text-align: center;
            align-items: center;
            justify-content: center;
            aspect-ratio: 1 / 1;
            border-radius: 50%;
            right: 0;
            bottom: 0;
            background-color: ${theme.color.background.second};
            color: ${theme.color.text.second};
            ${font({ weight: 500, Fmin: 10, Fmax: 14 })}
        }
    `}
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

export const S = {
    Logout,
    AvatarContainer,
    TextContainer,
    Name,
    Email,
    LogoutButton,
    AvatarWithNewMessages
}