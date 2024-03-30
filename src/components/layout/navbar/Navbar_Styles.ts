import styled, { css } from "styled-components"
import { theme } from "styles/Theme.styled"

type Props = {
    collapsed?: string
}
const Navbar = styled.nav<Props>`
    position: relative;
    width: fit-content;
    align-items: center;
    display: flex;
    flex-direction: column;
    background-color: ${theme.color.background.menu};
    padding: 54px min(30px, 2vw);
    gap: 54px;
    z-index: 1000;
    transition: all ease-out 0.2s;
    &:hover {
        box-shadow: ${theme.shadow.navbar};
        background-image: ${theme.gradient.banner};
    }
    ${(props) =>
        props.collapsed === "false" &&
        css<Props>`
            & a {
                justify-content: center;
            }
        `}
`
export const S = { Navbar }
