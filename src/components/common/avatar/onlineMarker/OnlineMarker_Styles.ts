import { OnlineStatus } from "components/common/avatar/onlineMarker/OnlineMarker"
import styled, { css } from "styled-components"
import { theme } from "styles/Theme.styled"

type Props = {
    status?: OnlineStatus
}
const OnlineMarker = styled.div<Props>`
    position: absolute;
    top: 75%;
    left: 70%;

    &::before {
        position: absolute;
        content: " ";
        display: flex;
        height: calc(1em * 1.8);
        width: calc(1em * 1.8);
        text-align: center;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: transparent;
        ${(props) =>
            props.status === "online" &&
            css<Props>`
                background-color: ${theme.color.background.status_success};
                border: 2px solid ${theme.color.background.block};
            `}
        ${(props) =>
            props.status === "busy" &&
            css<Props>`
                background-color: ${theme.color.background.status_busy};
                border: 2px solid ${theme.color.background.block};
            `}
        ${(props) =>
            props.status === "offline" &&
            css<Props>`
                background-color: ${theme.color.background.status_error};
                border: 2px solid ${theme.color.background.block};
            `}
        cursor: pointer;
    }
`

export const S = { OnlineMarker }
