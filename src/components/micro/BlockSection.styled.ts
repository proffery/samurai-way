import { theme } from "../../styles/Theme.styled";
import styled from "styled-components";

export const BlockSection = styled.section`
    flex-direction: column;
    color: ${theme.color.text.primary_dark};
    padding: 25px 28px;
    height: fit-content;
    gap: 20px;
    @media ${theme.media.mobile} {
        padding: 20px 16px;
    }
`