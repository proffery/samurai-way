import { AboutBlock } from "../../../components/blocks/aboutBlock/AboutBlock"
import { ActiveFriendsBlock } from "../../../components/blocks/activeFriendsBlock/ActiveFriendsBlock"
import { HeaderBlock } from "../../../components/blocks/HeaderBlock/HeaderBlock"
import { FriendsBlock } from "../../../components/blocks/friendsBlock/FriendsBlock"
import { PostsBlock } from "../../../components/blocks/postsBlock/PostsBlock"
import styled from "styled-components"

export const Profile = () => {
    return (
        <StyledProfile id="profile">
            <ProfileHeaderBlock />
            <ProfileAboutBlock />
            <ProfilePostsBlock />
            <ProfileFriendsBlock />
            <StyledActiveFriendsBlock />
        </StyledProfile>
    )
}

const StyledProfile = styled.main`
    display: grid;
    grid-template-rows: auto 1fr 1fr ;
    grid-template-columns: 1fr 3fr 1fr;
    
`

const ProfileHeaderBlock = styled(HeaderBlock)`
    grid-area: 1 / 1 / 2 / 4 ;
`

const ProfileAboutBlock = styled(AboutBlock)`
    grid-area: 2 / 1 / 4 / 2 ;
`

const ProfilePostsBlock = styled(PostsBlock)`
    grid-area: 2 / 2 / 4 / 3 ;
`

const ProfileFriendsBlock = styled(FriendsBlock)`
    grid-area: 2 / 3 / 3 / 4 ;
`

const StyledActiveFriendsBlock = styled(ActiveFriendsBlock)`
    grid-area: 3 / 3 / 4 / 4 ;
`