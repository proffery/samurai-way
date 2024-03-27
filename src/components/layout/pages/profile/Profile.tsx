import { AboutBlock } from 'components/blocks/aboutBlock/AboutBlock'
import { ContactsBlock } from 'components/blocks/contactsBlock/ContactsBlock'
import { FriendsBlock } from 'components/blocks/friendsBlock/FriendsBlock'
import { HeaderBlock } from 'components/blocks/headerBlock/HeaderBlock'
import { PostsBlock } from 'components/blocks/postsBlock/PostsBlock'
import { ToTop } from 'components/common/toTop/ToTop'
import React, { memo, useEffect } from "react"
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectAppIsLoading } from 'store/app/appSelectors'
import { selectAuthData } from 'store/auth/authSelectors'
import { selectProfileData } from 'store/profile/profileSelectors'
import styled from "styled-components"
import { theme } from 'styles/Theme.styled'
import { useActions } from 'utils/customHooks/useActions'

const Profile: React.FC = memo(() => {
    const appIsLoading = useSelector(selectAppIsLoading)
    const authStateData = useSelector(selectAuthData)
    const profileStateData = useSelector(selectProfileData)
    const {followProfile, unfollowProfile, changeProfileStatus, 
        addAppAlert, changeProfilePhotos, addPost, getProfileData,
        changeProfileAbout, changeProfileContacts, postOnChange
    } = useActions()
    const params = useParams<{userId: string}>()
    const { id: authId } = authStateData
    const { userId } = params

    useEffect(() => {
        getProfileData(Number(userId ? userId : authId))
    }, [userId])

    return (
        <StyledProfile id='profile' >
            <ToTop anchor_id='profile-header' />
            <ProfileHeaderBlock
                authStateData={authStateData}
                profileStateData={profileStateData}
                appIsLoading={appIsLoading}
                follow={followProfile}
                unfollow={unfollowProfile}
                changeProfileStatus={changeProfileStatus}
                addAppAlert={addAppAlert}
                changeProfilePhotos={changeProfilePhotos}
            />
            <ProfileAboutBlock
                profileData={profileStateData.data}
                authStateData={authStateData}
                addAppAlert={addAppAlert}
                changeProfileAbout={changeProfileAbout}
            />
            <ProfileContactsBlock
                profileStateData={profileStateData}
                authStateData={authStateData}
                addAppAlert={addAppAlert}
                changeProfileContacts={changeProfileContacts}
            />
            <ProfilePostsBlock
                profileStateData={profileStateData}
                addPost={addPost}
                addNewPost={postOnChange}
            />
            <ProfileFriendsBlock blockHeaderName={'Friends'} />
            <ProfilePossibleFriendsBlock blockHeaderName={'Might know'} isFriends={false} />
        </StyledProfile>
    )
})

export default Profile

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