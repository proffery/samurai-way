import styled, { css } from "styled-components"
import { theme } from "styles/Theme.styled"

type Props = {
  messages?: number
}
const MessagesMarker = styled.div<Props>`
  position: absolute;
  top: 75%;
  left: 0;
  ${(props) =>
    props.messages &&
    css<Props>`
      &::before {
        position: absolute;
        content: "${props.messages > 0 ? props.messages : ""}";
        display: flex;
        height: calc(1em * 1.8);
        width: calc(1em * 1.8);
        text-align: center;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: ${theme.color.background.second};
        border: 2px solid ${theme.color.background.block};
        color: ${theme.color.text.second};
      }
    `}
  cursor: pointer;
`

export const S = { MessagesMarker }
