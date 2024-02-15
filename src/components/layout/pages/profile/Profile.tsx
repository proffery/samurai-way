import React from "react"
import { AboutBlock } from "../../../blocks/aboutBlock/AboutBlock"
import { HeaderBlock } from "../../../blocks/headerBlock/HeaderBlock"
import styled from "styled-components"
import { theme } from "../../../../styles/Theme.styled"
import { ToTopLink } from "../../../micro/toTopLink/ToTopLink"
import { FriendsBlockContainer } from "../../../blocks/friendsBlock/FriendsBlockContainer"
import { PossibleFriendsBlockContainer } from "../../../blocks/friendsBlock/PossibleFriendsBlockContainer"
import { PostsBlock } from "../../../blocks/postsBlock/PostsBlock"
import { PostStateType } from "../../../../redux/profileReducer"
import { GetProfileResponseType } from "../../../../api/social-network-api"

type ProfilePropsType = {
    posts: PostStateType[]
    profileData: GetProfileResponseType
    newPostForm: string
    onChangeNewPostText: (text: string) => void
    addPost: () => void
}

export const Profile: React.FC<ProfilePropsType> = (props) => {
    console.log(props.profileData);
    
    return (
        <StyledProfile id="profile" >
            <ProfileHeaderBlock />
            <ProfileAboutBlock />
            <ProfilePostsBlock
                posts={props.posts}
                newPostForm={props.newPostForm}
                addPost={props.addPost}
                onChangeNewPostText={props.onChangeNewPostText}
            />
            <ProfileFriendsBlock />
            <ProfilePossibleFriendsBlock />
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

const ProfilePostsBlock = styled(PostsBlock)`
    grid-area: 2 / 2 / 4 / 3 ;
    @media ${theme.media.mobile} {
        grid-area: 3 / 1 / 5 / 2 ;
    }
`

const ProfileFriendsBlock = styled(FriendsBlockContainer)`
    grid-area: 2 / 3 / 3 / 4 ;
    @media ${theme.media.mobile} {
        grid-area: 3 / 2 / 4 / 3 ;
    }
`

const ProfilePossibleFriendsBlock = styled(PossibleFriendsBlockContainer)`
    grid-area: 3 / 3 / 4 / 4 ;
    margin-top: 142px;
    button {
        margin-top: 0;
    }
    @media ${theme.media.mobile} {
        grid-area: 4 / 2 / 5 / 3 ;
        margin-top: 182px;
    }
`