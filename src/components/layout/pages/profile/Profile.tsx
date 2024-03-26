import { GetProfileContacts } from 'api/profileAPI'
import { AboutBlock } from 'components/blocks/aboutBlock/AboutBlock'
import { ContactsBlock } from 'components/blocks/contactsBlock/ContactsBlock'
import { FriendsBlock } from 'components/blocks/friendsBlock/FriendsBlock'
import { HeaderBlock } from 'components/blocks/headerBlock/HeaderBlock'
import { PostsBlock } from 'components/blocks/postsBlock/PostsBlock'
import { ToTop } from 'components/common/toTop/ToTop'
import React, { memo } from "react"
import { AlertType } from 'store/app/appReducer'
import { AuthStateType } from 'store/auth/authReducer'
import { ChangeAboutProfileType, ProfileStateType } from 'store/profile/profileReducer'
import styled from "styled-components"
import { theme } from 'styles/Theme.styled'

type Props = {
    className?: string
    appIsLoading: boolean
    authStateData: AuthStateType
    profileStateData: ProfileStateType
    addPost: () => void
    followProfile: (userId: number) => void
    postOnChange: (newPost: string) => void
    unfollowProfile: (userId: number) => void
    changeProfilePhotos: (image: File) => void
    changeProfileStatus: (newStatus: string) => void
    addAppAlert: (type: AlertType, message: string) => void
    changeProfileAbout: (about: ChangeAboutProfileType) => void
    changeProfileContacts: (contacts: GetProfileContacts) => void
}

export const Profile: React.FC<Props> = memo((props) => {
    return (
        <StyledProfile id='profile' >
            <ToTop anchor_id='profile-header' />
            <ProfileHeaderBlock
                authStateData={props.authStateData}
                profileStateData={props.profileStateData}
                appIsLoading={props.appIsLoading}
                follow={props.followProfile}
                unfollow={props.unfollowProfile}
                changeProfileStatus={props.changeProfileStatus}
                addAppAlert={props.addAppAlert}
                changeProfilePhotos={props.changeProfilePhotos}
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
                addNewPost={props.postOnChange}
            />
            <ProfileFriendsBlock blockHeaderName={'Friends'} />
            <ProfilePossibleFriendsBlock blockHeaderName={'Might know'} isFriends={false} />
        </StyledProfile>
    )
})

const StyledProfile = styled.main`
    display: grid;
    overflow-y: auto;
    overflow-x: hidden;
    grid-template-rows: auto auto repeat(4, .5fr);
    grid-template-columns: repeat(5, 1fr);
    @media ${theme.media.mobile} {
        grid-template-rows: auto auto 1fr 1fr;
        grid-template-columns: 1fr 1fr;
    }
`
const ProfileHeaderBlock = styled(HeaderBlock)`
    grid-area: 1 / 1 / 2 / 6 ;
    @media ${theme.media.mobile} {
        grid-area: 1 / 1 / 2 / 3 ;
    }
`
const ProfileAboutBlock = styled(AboutBlock)`
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
    grid-area: 2 / 2 / 7 / 5 ;
    @media ${theme.media.mobile} {
        grid-area: 3 / 1 / 7 / 3 ;
    }
`
const ProfileFriendsBlock = styled(FriendsBlock)`
    grid-area: 2 / 5 / 3 / 6 ;
    @media ${theme.media.mobile} {
        display: none;
    }
`
const ProfilePossibleFriendsBlock = styled(FriendsBlock)`
    grid-area: 3 / 5 / 4 / 6 ;
    @media ${theme.media.mobile} {
        display: none;
    }
`