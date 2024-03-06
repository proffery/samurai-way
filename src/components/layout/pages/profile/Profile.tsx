import React from "react"
import styled from "styled-components"
import { GetProfileResponseContactsType } from '../../../../api/social-network-api'
import { AlertType } from "../../../../redux/appReducer"
import { AuthStateType } from "../../../../redux/authReducer"
import { AboutProfileType, ProfileStateType } from "../../../../redux/profileReducer"
import { theme } from "../../../../styles/Theme.styled"
import { AboutMeBlock } from '../../../blocks/aboutMeBlock/AboutMeBlock'
import { ContactsBlock } from "../../../blocks/contactsBlock/ContactsBlock"
import { FriendsBlockContainer } from "../../../blocks/friendsBlock/FriendsBlockContainer"
import { PossibleFriendsBlockContainer } from "../../../blocks/friendsBlock/PossibleFriendsBlockContainer"
import { HeaderBlock } from "../../../blocks/headerBlock/HeaderBlock"
import { PostsBlock } from "../../../blocks/postsBlock/PostsBlock"
import { ToTop } from "../../../micro/toTop/ToTop"

type ProfilePropsType = {
    className?: string
    authStateData: AuthStateType
    profileStateData: ProfileStateType
    appIsLoading: boolean
    addPost: () => void
    followProfile: (userId: number) => void
    unfollowProfile: (userId: number) => void
    postOnChange: (newPost: string) => void
    changeProfileStatus: (newStatus: string) => void
    changeProfileContacts: (contacts: GetProfileResponseContactsType) => void
    changeProfileAbout: (about: AboutProfileType) => void
    addAppAlert: (type: AlertType, message: string) => void
}

export const Profile: React.FC<ProfilePropsType> = (props) => {

    return (
        <StyledProfile id='profile' >
            <ProfileHeaderBlock
                authStateData={props.authStateData}
                profileStateData={props.profileStateData}
                appIsLoading={props.appIsLoading}
                follow={props.followProfile}
                unfollow={props.unfollowProfile}
                changeProfileStatus={props.changeProfileStatus}
                addAppAlert={props.addAppAlert}
            />
            <ProfileAboutBlock
                profileData={props.profileStateData.data}
                authStateData={props.authStateData}
                addAppAlert={props.addAppAlert}
                changeProfileAbout={props.changeProfileAbout}
            />
            <ProfileContactsBlock
                profileStateData={props.profileStateData}
                authStateData={props.authStateData}
                addAppAlert={props.addAppAlert}
                changeProfileContacts={props.changeProfileContacts}
            />
            <ProfilePostsBlock
                profileStateData={props.profileStateData}
                addPost={props.addPost}
                onChangeNewPostText={props.postOnChange}
            />
            <ProfileFriendsBlock />
            <ProfilePossibleFriendsBlock />
            <ToTop top_block_anchor_id="profile-header" />
        </StyledProfile>
    )
}

const StyledProfile = styled.main`
    display: grid;
    overflow-y: auto;
    overflow-x: hidden;
    grid-template-rows: auto auto 1fr;
    grid-template-columns: 1fr 3fr 1fr;
    @media ${theme.media.mobile} {
        grid-template-rows: auto auto 30vh 30vh;
        grid-template-columns: 1fr 1fr;
    }
`
const ProfileHeaderBlock = styled(HeaderBlock)`
    grid-area: 1 / 1 / 2 / 4 ;
    @media ${theme.media.mobile} {
        grid-area: 1 / 1 / 2 / 3 ;
    }
`
const ProfileAboutBlock = styled(AboutMeBlock)`
    grid-area: 2 / 1 / 3 / 2 ;
    @media ${theme.media.mobile} {
        grid-area: 2 / 1 / 3 / 2 ;
    }
`
const ProfileContactsBlock = styled(ContactsBlock)`
    grid-area: 3 / 1 / 4 / 2 ;
    @media ${theme.media.mobile} {
        grid-area: 2 / 2 / 3 / 3 ;
    }
`
const ProfilePostsBlock = styled(PostsBlock)`
    grid-area: 2 / 2 / 4 / 3 ;
    @media ${theme.media.mobile} {
        grid-area: 3 / 1 / 5 / 3 ;
    }
`
const ProfileFriendsBlock = styled(FriendsBlockContainer)`
    grid-area: 2 / 3 / 3 / 4 ;
    @media ${theme.media.mobile} {
        display: none;
    }
`
const ProfilePossibleFriendsBlock = styled(PossibleFriendsBlockContainer)`
    grid-area: 3 / 3 / 4 / 4 ;
    @media ${theme.media.mobile} {
        display: none;
    }
`