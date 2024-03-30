import styled from "styled-components"
import { theme } from "styles/Theme.styled"

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: min(15px, 1vw);
    padding: 0 min(30px, 2vw);
    @media ${theme.media.mobile} {
        background-color: ${theme.color.background.block};
        align-self: center;
        justify-self: center;
        height: 80%;
        width: 80%;
        justify-content: center;
    }
`
const Notification = styled.div`
    display: flex;
    flex-direction: column;
`

export const S = {
    Form,
    Notification,
}
