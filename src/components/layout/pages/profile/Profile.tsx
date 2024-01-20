import React from "react"
import { AboutBlock } from "../../../blocks/aboutBlock/AboutBlock"
import { ActiveFriendsBlock } from "../../../blocks/activeFriendsBlock/ActiveFriendsBlock"
import { HeaderBlock } from "../../../blocks/headerBlock/HeaderBlock"
import styled from "styled-components"
import { theme } from "../../../../styles/Theme.styled"
import { ToTopLink } from "../../../micro/toTopLink/ToTopLink"
import { PostsBlockContainer } from "../../../blocks/postsBlock/PostsBlockContainer"
import { FriendsBlockContainer } from "../../../blocks/friendsBlock/FriendsBlockContainer"

type ProfilePropsType = {
}

export const Profile: React.FC<ProfilePropsType> = (props) => {

    return (
        <StyledProfile id="profile" >
            <ProfileHeaderBlock />
            <ProfileAboutBlock />
            <ProfilePostsBlock />
            <ProfileFriendsBlock />
            <StyledActiveFriendsBlock />
            <ToTopLink top_block_anchor_id="profile-header" />
        </StyledProfile>
    )
}

const StyledProfile = styled.main`
    display: grid;
    overflow-y: auto;
    overflow-x: hidden;
    grid-template-rows: auto 50vh 1fr;
    grid-template-columns: 1fr 3fr 1fr;
    @media ${theme.media.mobile} {
        grid-template-rows: auto auto 30vh 30vh;
        grid-template-columns: 3fr 1.5fr;
    }
`

const ProfileHeaderBlock = styled(HeaderBlock)`
    grid-area: 1 / 1 / 2 / 4 ;
    @media ${theme.media.mobile} {
        grid-area: 1 / 1 / 2 / 3 ;
    }
`

const ProfileAboutBlock = styled(AboutBlock)`
    grid-area: 2 / 1 / 4 / 2 ;
    @media ${theme.media.mobile} {
        grid-area: 2 / 1 / 3 / 3 ;
    }
`

const ProfilePostsBlock = styled(PostsBlockContainer)`
    grid-area: 2 / 2 / 4 / 3 ;
    @media ${theme.media.mobile} {
        grid-area: 3 / 1 / 5 / 2 ;
    }
`

const ProfileFriendsBlock = styled(FriendsBlockContainer)`
    grid-area: 2 / 3 / 3 / 4 ;
    height: fit-content;
    @media ${theme.media.mobile} {
        grid-area: 3 / 2 / 4 / 3 ;
    }
`

const StyledActiveFriendsBlock = styled(ActiveFriendsBlock)`
    grid-area: 3 / 3 / 4 / 4 ;
    @media ${theme.media.mobile} {
        grid-area: 4 / 2 / 5 / 3 ;
    }
`