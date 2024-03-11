import { font } from "../../styles/Font";
import { theme } from "../../styles/Theme.styled";
import styled from "styled-components";

export const BlockHeader = styled.h2`
    position: relative;
    word-wrap: break-word;
    padding-bottom: min(20px, 2vw);
    width: 100%;
    color: ${theme.color.text.primary};
    ${font({weight: 700, Fmin: 14, Fmax: 26})}
    &::before {
        position: absolute;
        content: "";
        height: 1px;
        width: 100%;
        left: 0;
        top: 100%;
        background-color: ${theme.color.background.primary};
    }
    @media ${theme.media.mobile} {
        padding-bottom: 20px;
    }
`