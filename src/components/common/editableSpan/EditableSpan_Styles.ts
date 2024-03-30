import { Input } from "components/common/input/Input.styled"
import styled from "styled-components"
import { theme } from "styles/Theme.styled"

const EditableInput = styled(Input)`
    width: 100%;
    color: ${theme.color.background.second};
    font-size: inherit;
    font-weight: inherit;
    border-radius: 0;
    padding: min(10px, 1vw) 0;
`
const EditableSpan = styled.p`
    display: flex;
    width: 100%;
    font-size: inherit;
    font-weight: inherit;
    padding: min(10px, 1vw) 0;
`

export const S = {
    EditableInput,
    EditableSpan,
}
