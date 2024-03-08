import { AppRootStateType } from 'redux/redux-store'
import { IconLinksStateType } from './appReducer'

export const selectIsLoading = (state: AppRootStateType): boolean => state.app.isLoading
export const selectIsInitialized = (state: AppRootStateType): boolean => state.app.isInitialized
export const selectNavbarCollapsed = (state: AppRootStateType): boolean => state.app.navbarCollapsed
export const selectMenuItems = (state: AppRootStateType): IconLinksStateType[] => state.app.menuItems
export const selectFooterLinks = (state: AppRootStateType): IconLinksStateType[] => state.app.footerLinks