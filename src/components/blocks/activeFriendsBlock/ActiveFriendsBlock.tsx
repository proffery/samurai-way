import React from "react"
import styled from "styled-components"

type ActiveFriendsBlockPropsType = {
    className?: string
}

export const ActiveFriendsBlock: React.FC<ActiveFriendsBlockPropsType> = (props) => {
    return (
        <StyledActiveFriendsBlock id="active-friends" className={props.className}>
            Active
        </StyledActiveFriendsBlock>
    )
}

const StyledActiveFriendsBlock = styled.section`
    
`