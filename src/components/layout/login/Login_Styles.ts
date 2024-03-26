import { BlockSection } from 'components/blocks/BlockSection.styled'
import styled from 'styled-components'
import { theme } from 'styles/Theme.styled'

const Login = styled.main`
    display: flex;
    background-color: ${theme.color.background.primary};
    align-items: center;
    justify-content: center;
`
const Section = styled(BlockSection)`
    display: flex;
    width: 35%;
    min-width: 320px;
    @media ${theme.media.mobile} {
        height: 100%;
        width: 100%;
    }
`
const Notification = styled.div`
    display: flex;
    flex-direction: column;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: min(30px, 2vw);
    padding: min(30px, 2vw);
    @media ${theme.media.mobile} {
        background-color: ${theme.color.background.block};
        align-self: center;
        justify-self: center;
        height: 80%;
        width: 80%;
        justify-content: center;
    }
`

export const S = {
    Login,
    Section,
    Form,
    Notification
}