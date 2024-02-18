import React from "react"
import { BlockHeader } from "../../micro/BlockHeader.styled"
import { BlockSection } from "../../micro/BlockSection.styled"

type AboutBlockPropsType = {
    className?: string
}

export const AboutBlock: React.FC<AboutBlockPropsType> = (props) => {
    return (
        <BlockSection id="about" className={props.className}>
            <BlockHeader>About</BlockHeader>
        </BlockSection>
    )
}

