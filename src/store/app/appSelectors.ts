import { AlertObjectType, IconLinksStateType } from 'store/app/appReducer'
import { AppRootStateType } from 'store/redux-store'

export const selectAppIsLoading = (state: AppRootStateType): boolean => state.app.isLoading
export const selectStoragePath = (state: AppRootStateType): string => state.app.currentPath
export const selectIsInitialized = (state: AppRootStateType): boolean => state.app.isInitialized
export const selectNavbarCollapsed = (state: AppRootStateType): boolean => state.app.navbarCollapsed
export const selectMenuItems = (state: AppRootStateType): IconLinksStateType[] => state.app.menuItems
export const selectFooterLinks = (state: AppRootStateType): IconLinksStateType[] => state.app.footerLinks
export const selectAlerts = (state: AppRootStateType): AlertObjectType[] => state.app.alerts