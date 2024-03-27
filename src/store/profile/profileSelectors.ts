import { AppRootState } from 'store/redux-store'
import { ProfileState } from './profileReducer'

export const selectProfileData = (state: AppRootState): ProfileState => state.profile