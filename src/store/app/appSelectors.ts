import { AlertObjectType, IconsLinks } from 'store/app/appReducer'
import { AppRootStateType } from 'store/redux-store'

export const selectAppIsLoading = (state: AppRootStateType): boolean => state.app.isLoading
export const selectStoragePath = (state: AppRootStateType): string => state.app.currentPath
export const selectIsInitialized = (state: AppRootStateType): boolean => state.app.isInitialized
export const selectMenuItems = (state: AppRootStateType): IconsLinks[] => state.app.menuItems
export const selectFooterLinks = (state: AppRootStateType): IconsLinks[] => state.app.footerLinks
export const selectAlerts = (state: AppRootStateType): AlertObjectType[] => state.app.alerts