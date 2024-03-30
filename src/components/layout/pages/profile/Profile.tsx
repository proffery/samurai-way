import { ToTop } from "components/common/toTop/ToTop"
import React, { memo, useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { selectAppIsLoading } from "store/app/appSelectors"
import { selectAuthData } from "store/auth/authSelectors"
import { selectProfileData } from "store/profile/profileSelectors"
import { useActions } from "utils/customHooks/useActions"
import { S } from "./Profile_Styles"

const Profile: React.FC = memo(() => {
  const appIsLoading = useSelector(selectAppIsLoading)
  const authStateData = useSelector(selectAuthData)
  const profileStateData = useSelector(selectProfileData)
  const {
    followProfile,
    unfollowProfile,
    changeProfileStatus,
    addAppAlert,
    changeProfilePhotos,
    addPost,
    getProfileData,
    changeProfileAbout,
    changeProfileContacts,
    postOnChange,
  } = useActions()
  const params = useParams<{ userId: string }>()
  const { id: authId } = authStateData
  const { userId } = params

  useEffect(() => {
    getProfileData(Number(userId ? userId : authId))
  }, [userId])

  return (
    <S.Profile id="profile">
      <ToTop anchor_id="profile-header" />
      <S.Header
        authStateData={authStateData}
        profileStateData={profileStateData}
        appIsLoading={appIsLoading}
        follow={followProfile}
        unfollow={unfollowProfile}
        changeProfileStatus={changeProfileStatus}
        addAppAlert={addAppAlert}
        changeProfilePhotos={changeProfilePhotos}
      />
      <S.About
        profileData={profileStateData.data}
        authStateData={authStateData}
        addAppAlert={addAppAlert}
        changeProfileAbout={changeProfileAbout}
      />
      <S.Contacts
        profileStateData={profileStateData}
        authStateData={authStateData}
        addAppAlert={addAppAlert}
        changeProfileContacts={changeProfileContacts}
      />
      <S.Posts profileStateData={profileStateData} addPost={addPost} addNewPost={postOnChange} />
      <S.Friends headerName={"Friends"} />
      <S.PossibleFriends headerName={"Might know"} isFriends={false} />
    </S.Profile>
  )
})

export default Profile
