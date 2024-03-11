import { AppRootStateType } from 'store/redux-store'
import { ProfileStateType } from './profileReducer'

export const selectProfileData = (state: AppRootStateType): ProfileStateType => state.profile