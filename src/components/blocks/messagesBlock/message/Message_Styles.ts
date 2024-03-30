import { font } from "styles/Font"
import { Avatar } from "components/common/avatar/Avatar"
import styled, { css } from "styled-components"
import { theme } from "styles/Theme.styled"
import { FlexWrapper } from "components/common/FlexWrapper.styled"
import { Button } from "components/common/button/Button"

type Props = {
    viewed: "true" | "false"
    isMeOwner?: "true" | "false"
}
const Message = styled.div`
    display: flex;
    flex-direction: column;
    gap: min(15px, 1vw);
    ${font({ weight: 500, Fmin: 10, Fmax: 16 })}
    border-bottom: 1px solid;
    border-color: ${theme.color.background.primary};
`
const MessageWrapper = styled.div<Props>`
    display: flex;
    border-radius: 10px;
    padding: min(15px, 1vw);
    gap: min(15px, 1vw);
    ${(props) =>
        props.isMeOwner === "true"
            ? css<Props>`
                  flex-direction: row;
              `
            : css<Props>`
                  flex-direction: row-reverse;
              `}
    ${(props) =>
        props.viewed === "true"
            ? css<Props>`
                  background-color: transparent;
              `
            : css<Props>`
                  background-color: ${theme.color.background.primary};
              `}
`
const ButtonsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: min(15px, 1vw);
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
const OptionButton = styled(Button)`
    opacity: 0.3;
    align-self: center;
    text-align: center;
`
const ReadedIconWrapper = styled.div<Props>`
    display: flex;
    align-items: center;
    justify-content: center;
    ${(props) =>
        props.viewed === "true"
            ? css<Props>`
                  opacity: 1;
              `
            : css<Props>`
                  opacity: 0.3;
              `}
`

export const S = {
    Message,
    Date,
    Avatar,
    Name,
    Photo,
    Text,
    Time,
    OptionButton,
    MessageWrapper,
    ButtonsWrapper,
    ReadedIconWrapper,
}
