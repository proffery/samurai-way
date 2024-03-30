import styled from "styled-components"
import { theme } from "styles/Theme.styled"

const Users = styled.main`
    display: flex;
    flex: 1;
    justify-content: space-between;
    @media ${theme.media.mobile} {
        flex-wrap: wrap;
    }
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: min(30px, 2vw);
    min-width: 170px;
    max-width: 20%;
    @media ${theme.media.mobile} {
        display: none;
    }
`

export const S = {
    Users,
    Wrapper,
}
