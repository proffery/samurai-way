import React from "react"
import styled from "styled-components"
import { theme } from "../../../styles/Theme.styled"
import { font } from "../../../styles/Font"

type AboutBlockPropsType = {
    className?: string
}

export const AboutBlock: React.FC<AboutBlockPropsType> = (props) => {
    return (
        <StyledAboutBlock id="about" className={props.className}>
            <Header>About</Header>
        </StyledAboutBlock>
    )
}

const StyledAboutBlock = styled.section`
    display: flex;
    flex-direction: column;
    color: ${theme.color.text.primary_dark};
    padding: 40px 23px;
    height: fit-content;
`

const Header = styled.h2`
    color: ${theme.color.text.primary};
    ${font({weight: 700, Fmin: 14, Fmax: 26})}
`

