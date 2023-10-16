import React from "react"
import styled from "styled-components"

type FriendsBlockPropsType = {
    className?: string
}

export const FriendsBlock: React.FC<FriendsBlockPropsType> = (props) => {
    return (
        <StyledFriendsBlock id="friends" className={props.className}>
            Friends_BLOCK
        </StyledFriendsBlock>
    )
}

const StyledFriendsBlock = styled.section`
    
`