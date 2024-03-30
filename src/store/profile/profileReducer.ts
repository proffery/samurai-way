import { ChangeProfileData, GetProfileContacts, GetProfileResponse, profileAPI } from "api/profileAPI"
import { PhotosResponse, ResultCode } from "api/api-instance"
import { usersAPI } from "api/usersAPI"
import { setAppIsLoading, addAppAlert, SetAppIsLoading, AddAlert } from "store/app/appReducer"
import { CLEAR_REDUCER, CleanReducers, setAuthUserPhoto } from "store/auth/authReducer"
import { AppDispatch, AppRootState } from "store/redux-store"
import { FollowUser, UnfollowUser } from "store/users/usersReducer"
import { handleServerNetworkError } from "utils/handleServerNetworkError"
import { v1 } from "uuid"

//CONSTANTS
const ADD_POST = "PROFILE/ADD-POST"
const UPDATE_POST = "PROFILE/UPDATE-POST"
const ON_CHANGE_POST = "PROFILE/ON-CHANGE-POST"
const SET_PROFILE_DATA = "PROFILE/SET-PROFILE-DATA"
const SET_FOLLOW_STATUS = "PROFILE/SET-FOLLOW-STATUS"
const SET_STATUS = "PROFILE/SET-STATUS"
const SET_PHOTOS = "PROFILE/SET-PHOTOS"

//INITIAL STATE
export const initialState = {
  posts: [] as PostObject[],
  newPostForm: "" as string,
  data: {
    aboutMe: "Human",
    contacts: {
      facebook: "",
      website: "",
      vk: "",
      twitter: "",
      instagram: "",
      youtube: "",
      github: "",
      mainLink: "",
    },
    lookingForAJob: false,
    lookingForAJobDescription: "",
    fullName: "",
    userId: 2,
    photos: {
      small: "",
      large: "",
    },
    isFollow: false,
    status: "",
  } as ProfileData,
  contactsIcons: [
    {
      id: 1,
      name: "facebook" as string,
      href: "#",
      icon_id: "facebook",
      viewBox: "0 0 24 24",
    },
    {
      id: 2,
      name: "twitter" as string,
      href: "#",
      icon_id: "twitter",
      viewBox: "0 0 24 24",
    },
    {
      id: 3,
      name: "instagram" as string,
      href: "#",
      icon_id: "instagram",
      viewBox: "0 0 24 24",
    },
    {
      id: 4,
      name: "youtube" as string,
      href: "#",
      icon_id: "youtube",
      viewBox: "0 0 24 24",
    },
    {
      id: 5,
      name: "github" as string,
      href: "#",
      icon_id: "github",
      viewBox: "-10 -10 150 150",
    },
    {
      id: 6,
      name: "vk" as string,
      href: "#",
      icon_id: "vk",
      viewBox: "-3 -3 40 40",
    },
    {
      id: 7,
      name: "website" as string,
      href: "#",
      icon_id: "home",
      viewBox: "-2 -2 24 24",
    },
    {
      id: 8,
      name: "mainLink" as string,
      href: "#",
      icon_id: "linkedin",
      viewBox: "0 2 24 24",
    },
  ],
}

//REDUCER
export const profileReducer = (state: ProfileState = initialState, action: ProfileActions): ProfileState => {
  switch (action.type) {
    case ADD_POST:
      return { ...state, posts: [action.payload.newPost, ...state.posts] }
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((el) =>
          el.id === action.payload.postId ? { ...el, message: action.payload.newPost } : el,
        ),
      }
    case ON_CHANGE_POST:
      return { ...state, newPostForm: action.payload.newPost }
    case SET_PROFILE_DATA:
      return { ...state, data: { ...action.payload.data, isFollow: false, status: "" } }
    case SET_FOLLOW_STATUS:
      return { ...state, data: { ...state.data, isFollow: action.payload.isFollow } }
    case SET_STATUS:
      return { ...state, data: { ...state.data, status: action.payload.status } }
    case SET_PHOTOS:
      return { ...state, data: { ...state.data, photos: { ...action.payload.data.photos } } }
    case CLEAR_REDUCER:
      return initialState
    default:
      return state
  }
}

//ACTIONS
export const setPost = (postMessage: string) => {
  const newPost: PostObject = {
    id: v1(),
    message: postMessage,
    likeCount: 0,
    commentsCount: 0,
  }
  return { type: ADD_POST, payload: { newPost } } as const
}
export const updatePost = (postId: string, newPost: string) =>
  ({ type: UPDATE_POST, payload: { newPost, postId } }) as const
export const postOnChange = (newPost: string) => ({ type: ON_CHANGE_POST, payload: { newPost } }) as const
export const setProfileData = (data: GetProfileResponse) => ({ type: SET_PROFILE_DATA, payload: { data } }) as const
export const setFollowStatus = (isFollow: boolean) => ({ type: SET_FOLLOW_STATUS, payload: { isFollow } }) as const
export const setStatus = (status: string) => ({ type: SET_STATUS, payload: { status } }) as const
export const setPhotos = (data: { photos: PhotosResponse }) => ({ type: SET_PHOTOS, payload: { data } }) as const

//THUNKS
export const addPost = () => (dispatch: AppDispatch, getState: () => AppRootState) => {
  const newPost = getState().profile.newPostForm
  dispatch(setPost(newPost))
  dispatch(postOnChange(""))
}
export const getProfileData = (userId: number) => async (dispatch: AppDispatch, getState: () => AppRootState) => {
  dispatch(setAppIsLoading(true))
  profileAPI
    .getProfile(userId)
    .then((res) => {
      dispatch(setProfileData(res.data))
      if (res.data.userId !== getState().auth.id) return usersAPI.isFollow(userId)
      else return { data: false }
    })
    .then((res) => {
      dispatch(setFollowStatus(res.data))
      return profileAPI.getProfileStatus(userId)
    })
    .then((res) => {
      dispatch(setStatus(res.data))
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
    .finally(() => dispatch(setAppIsLoading(false)))
}

export const followProfile = (userId: number) => async (dispatch: AppDispatch) => {
  dispatch(setAppIsLoading(true))
  try {
    const res = await usersAPI.followUser(userId)
    if (res.data.resultCode === ResultCode.success) {
      dispatch(setFollowStatus(true))
      dispatch(addAppAlert("succeeded", "Followed!"))
    } else {
      dispatch(addAppAlert("failed", res.data.messages[0]))
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
  } finally {
    dispatch(setAppIsLoading(false))
  }
}

export const unfollowProfile = (userId: number) => async (dispatch: AppDispatch) => {
  dispatch(setAppIsLoading(true))
  try {
    const res = await usersAPI.unfollowUser(userId)
    if (res.data.resultCode === ResultCode.success) {
      dispatch(setFollowStatus(false))
      dispatch(addAppAlert("succeeded", "Unfollowed!"))
    } else {
      dispatch(addAppAlert("failed", res.data.messages[0]))
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
  } finally {
    dispatch(setAppIsLoading(false))
  }
}

export const changeProfileStatus =
  (newStatus: string) => async (dispatch: AppDispatch, getState: () => AppRootState) => {
    try {
      if (newStatus !== getState().profile.data.status) {
        dispatch(setAppIsLoading(true))
        const res = await profileAPI.changeStatus(newStatus)
        if (res.data.resultCode === ResultCode.success) {
          dispatch(setStatus(newStatus))
          dispatch(addAppAlert("succeeded", "Status changed!"))
        } else {
          dispatch(addAppAlert("failed", res.data.messages[0]))
        }
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
    } finally {
      dispatch(setAppIsLoading(false))
    }
  }

export const changeProfileContacts =
  (contacts: GetProfileContacts) => async (dispatch: AppDispatch, getState: () => AppRootState) => {
    const { aboutMe, fullName, lookingForAJob, lookingForAJobDescription } = getState().profile.data
    const model: ChangeProfileData = {
      aboutMe: aboutMe || "no info",
      contacts: contacts,
      fullName: fullName,
      lookingForAJob: lookingForAJob,
      lookingForAJobDescription: lookingForAJobDescription || "no info",
    }
    dispatch(setAppIsLoading(true))
    try {
      const res = await profileAPI.changeProfile(model)
      if (res.data.resultCode === ResultCode.success) {
        const oldProfileData = getState().profile.data
        const oldStatus = getState().profile.data.status
        dispatch(setProfileData({ ...oldProfileData, ...model }))
        dispatch(setStatus(oldStatus))
        dispatch(addAppAlert("succeeded", "Contacts are changed!"))
      } else {
        dispatch(addAppAlert("failed", res.data.messages[0]))
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
    } finally {
      dispatch(setAppIsLoading(false))
    }
  }

export const changeProfileAbout =
  (about: ChangeAbout) => async (dispatch: AppDispatch, getState: () => AppRootState) => {
    const { contacts } = getState().profile.data
    const model: ChangeProfileData = {
      aboutMe: about.aboutMe || "no info",
      contacts: contacts,
      fullName: about.fullName,
      lookingForAJob: about.lookingForAJob,
      lookingForAJobDescription: about.lookingForAJobDescription || "no info",
    }
    dispatch(setAppIsLoading(true))
    try {
      const res = await profileAPI.changeProfile(model)
      if (res.data.resultCode === ResultCode.success) {
        const oldProfileData = getState().profile.data
        const oldStatus = getState().profile.data.status
        dispatch(setProfileData({ ...oldProfileData, ...model }))
        dispatch(setStatus(oldStatus))
        dispatch(addAppAlert("succeeded", "About is changed!"))
      } else {
        dispatch(addAppAlert("failed", res.data.messages[0]))
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
    } finally {
      dispatch(setAppIsLoading(false))
    }
  }

export const changeProfilePhotos = (image: File) => async (dispatch: AppDispatch) => {
  dispatch(setAppIsLoading(true))
  try {
    const res = await profileAPI.changePhoto(image)
    if (res.data.resultCode === ResultCode.success) {
      dispatch(setPhotos(res.data.data))
      dispatch(setAuthUserPhoto(res.data.data.photos.small))
      dispatch(addAppAlert("succeeded", "Photo is changed!"))
    } else {
      dispatch(addAppAlert("failed", res.data.messages[0]))
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
  } finally {
    dispatch(setAppIsLoading(false))
  }
}

//TYPES
export type ProfileActions =
  | ReturnType<typeof setPost>
  | ReturnType<typeof setPhotos>
  | ReturnType<typeof setStatus>
  | ReturnType<typeof updatePost>
  | ReturnType<typeof postOnChange>
  | ReturnType<typeof setProfileData>
  | ReturnType<typeof setFollowStatus>
  | SetAppIsLoading
  | UnfollowUser
  | FollowUser
  | AddAlert
  | CleanReducers

export type PostObject = {
  id: string
  message: string
  likeCount: number
  commentsCount: number
}
export interface ProfileData extends GetProfileResponse {
  isFollow: boolean
  status: string
}
export type ProfileState = typeof initialState

export type ChangeAbout = {
  aboutMe: string
  fullName: string
  lookingForAJob: boolean
  lookingForAJobDescription: string
}
export type IconsType = typeof initialState.contactsIcons

export const profileThunks = {
  followProfile,
  unfollowProfile,
  changeProfileStatus,
  changeProfilePhotos,
  addPost,
  getProfileData,
  changeProfileAbout,
  changeProfileContacts,
}
export const profileActions = { postOnChange }
