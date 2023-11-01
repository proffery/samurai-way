import { theme } from "../../styles/Theme.styled";
import styled from "styled-components";

export const BlockSection = styled.section`
    display: flex;
    flex-direction: column;
    color: ${theme.color.text.primary_dark};
    padding: 40px 48px 0px;
    height: fit-content;
    gap: 20px;
    @media ${theme.media.mobile} {
        padding: 27px 16px 0;
    }
`