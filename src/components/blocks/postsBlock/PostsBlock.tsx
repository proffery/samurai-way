import React from "react"
import styled from "styled-components"

type PostsBlockPropsType = {
    className?: string
}

export const PostsBlock: React.FC<PostsBlockPropsType> = (props) => {
    return (
        <StyledPostsBlock id="posts" className={props.className}>
            Posts_BLOCK
        </StyledPostsBlock>
    )
}

const StyledPostsBlock = styled.section`
    
`