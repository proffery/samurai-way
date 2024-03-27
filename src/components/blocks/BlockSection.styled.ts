import styled from 'styled-components'
import { theme } from 'styles/Theme.styled'

export const BlockSection = styled.section`
    display: flex;
    border-radius: 10px;
    background-color: ${theme.color.background.block};
    flex-direction: column;
    color: ${theme.color.text.primary_dark};
    padding: min(30px, 2vw);
    height: fit-content;
    gap: min(30px, 2vw);
    box-shadow: ${theme.shadow.block};
`