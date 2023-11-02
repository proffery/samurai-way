import { theme } from "../../styles/Theme.styled";
import styled from "styled-components";

export const BlockSection = styled.section`
    display: flex;
    flex-direction: column;
    color: ${theme.color.text.primary_dark};
    padding: 28px 35px;
    height: fit-content;
    gap: 20px;
    position: relative;
    &::before {
        position: absolute;
        content: "";
        height: 1px;
        width: 100%;
        left: 0;
        top: 70px;
        background-color: ${theme.color.background.primary};
        @media ${theme.media.mobile} {
            top: 50px;
        }
    }
    @media ${theme.media.mobile} {
        padding: 20px 16px;
    }
`