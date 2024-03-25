import { Avatar } from 'components/common/avatar/Avatar'
import { font } from './../../../../styles/Font'
import styled from 'styled-components'
import { theme } from 'styles/Theme.styled'
import { FlexWrapper } from 'components/common/FlexWrapper.styled'

const Message = styled.div`
    display: flex;
    flex-direction: column;
    gap: min(15px, 1vw);
    ${font({ weight: 300, Fmin: 10, Fmax: 16 })}
    border-bottom: 1px solid;
    border-color: ${theme.color.background.primary};
`
const Text = styled(FlexWrapper)`
    display: flex;
    align-self: center;
    text-align: justify;
    word-wrap: break-word;
    width: 100%;
    height: 100%;
    color: ${theme.color.text.primary_dark};
`
const Date = styled.span`
    align-self: center;
    justify-content: center;
    text-align: center;
    color: ${theme.color.text.primary};
    width: 100%;
`
const Name = styled.span`
    text-align: center;
    ${font({ weight: 400, Fmin: 10, Fmax: 14 })}
    color: ${theme.color.text.primary_dark};
`
const Photo = styled(Avatar)`
    min-width: 40px;
    max-width: 60px;
`
const Time = styled.span`
    ${font({ weight: 300, Fmin: 8, Fmax: 10 })}
    align-self: center;
    text-align: center;
`

export const S = {
    Message,
    Date,
    Avatar,
    Name,
    Photo,
    Text,
    Time
}