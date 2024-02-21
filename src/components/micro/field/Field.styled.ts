import styled from "styled-components"
import { theme } from "../../../styles/Theme.styled"

type FieldPropsType = {
    bordered: 'true' | 'false'
    className?: string
}

export const Field = styled.input.attrs<FieldPropsType>((props) => ({
    type: props.type || 'text',
    placeholder: props.placeholder || '',

}))`
    border-radius: 10px;
    border: 1px solid ${props => props.bordered === 'true' ? theme.color.text.placeholder : 'transparent'};
    resize: vertical;
`