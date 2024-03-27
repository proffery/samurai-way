import { BlockSection } from 'components/blocks/BlockSection.styled'
import styled from 'styled-components'
import { font } from 'styles/Font'

const Section = styled(BlockSection)`
    height: 100%;
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    align-items: center;
    align-self: center;
    justify-content: center;
    height: 100%;
    width: 55%;
    gap: min(30px, 2vw);
`
const Text = styled.p`
    width: 50%;
    text-align: left;
    ${font({ weight: 400, Fmin: 10, Fmax: 16 })}
`

export const S = {
    Section,
    Text,
    Wrapper
}