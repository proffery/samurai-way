import { font } from './../../../styles/Font';
import { BlockSection } from 'components/blocks/BlockSection.styled'
import styled from 'styled-components'
import { theme } from 'styles/Theme.styled'

const ContactsBlock = styled(BlockSection)`
    width: 100%;
    display: flex;
    flex-direction: column;
    color: ${theme.color.text.primary};
    ${font({ weight: 300, Fmin: 10, Fmax: 16 })}
`
export const S = {
    ContactsBlock
}