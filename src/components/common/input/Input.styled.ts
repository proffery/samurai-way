import styled from 'styled-components'
import { theme } from 'styles/Theme.styled'

type InputPropsType = {
    className?: string
    bordered?: 'true' | 'false'
    error?: 'true' | 'false'
}

export const Input = styled.input.attrs<InputPropsType>((props) => ({
    type: props.type || 'text',
    placeholder: props.placeholder || '',

}))`
    border-radius: min(10px, 1vw);
    border: 1px solid ${props => props.bordered === 'true' ? theme.color.background.second : 'transparent'};
    resize: vertical;
    min-height: min(40px, 3vw);
    padding: min(10px, 1vw);
    &:focus-visible{
        outline: 1px solid ${theme.color.background.second};
        outline: 2px solid ${props => props.error === 'true' ? theme.color.background.status_error : 'transparent'};
    }
    @media ${theme.media.mobile} {
        min-height: min(30px, 8vw);
    }
`