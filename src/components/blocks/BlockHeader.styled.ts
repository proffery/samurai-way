import { font } from "../../styles/Font";
import { theme } from "../../styles/Theme.styled";
import styled from "styled-components";

export const BlockHeader = styled.h2`
    color: ${theme.color.text.primary};
    ${font({weight: 700, Fmin: 14, Fmax: 26})}
    margin-bottom: 20px;
`