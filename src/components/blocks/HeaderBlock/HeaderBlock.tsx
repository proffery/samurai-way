import React from "react"
import styled from "styled-components"

type HeaderBlockPropsType = {
    className?: string
}

export const HeaderBlock: React.FC<HeaderBlockPropsType> = (props) => {
    return (
        <StyledHeaderBlock id="header" className={props.className}>
            Header_BLOCK
        </StyledHeaderBlock>
    )
}

const StyledHeaderBlock = styled.section`
    aspect-ratio: 19 / 7;
`