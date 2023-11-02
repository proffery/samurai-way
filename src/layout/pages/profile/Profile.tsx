import { AboutBlock } from "../../../components/blocks/aboutBlock/AboutBlock"
import { ActiveFriendsBlock } from "../../../components/blocks/activeFriendsBlock/ActiveFriendsBlock"
import { HeaderBlock } from "../../../components/blocks/headerBlock/HeaderBlock"
import { FriendsBlock } from "../../../components/blocks/friendsBlock/FriendsBlock"
import { PostsBlock } from "../../../components/blocks/postsBlock/PostsBlock"
import { ProfilePageStateType } from "../../../redux/state"
import styled from "styled-components"
import { theme } from "../../../styles/Theme.styled"
import { ToTopLink } from "../../../components/toTopLink/ToTopLink"

type ProfilePropsType = {
    profileData: ProfilePageStateType
}

export const Profile: React.FC<ProfilePropsType> = (props) => {
    
    return (
        <StyledProfile id="profile">
            <ProfileHeaderBlock />
            <ProfileAboutBlock />
            <ProfilePostsBlock postsData={props.profileData.posts} />
            <ProfileFriendsBlock block_header="Friends" friendsData={props.profileData.friends}/>
            <StyledActiveFriendsBlock />
            <ToTopLink top_block_anchor_id="profile-header"/>
        </StyledProfile>
    )
}

const StyledProfile = styled.main`
    display: grid;
    overflow-y: auto;
    overflow-x: hidden;
    grid-template-rows: auto 1fr 1fr;
    grid-template-columns: 1fr 3fr 1fr;
    @media ${theme.media.mobile} {
        grid-template-rows: auto auto 40vh 40vh;
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

const ProfileFriendsBlock = styled(FriendsBlock)`
    grid-area: 2 / 3 / 3 / 4 ;
    height: 100%;
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