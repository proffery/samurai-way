import { AppRootStateType } from 'redux/redux-store'
import { ProfileStateType } from './profileReducer'

export const selectProfileData = (state: AppRootStateType): ProfileStateType => state.profile