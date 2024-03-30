import { AlertObject, IconsLinks } from "store/app/appReducer"
import { AppRootState } from "store/redux-store"

export const selectAppIsLoading = (state: AppRootState): boolean => state.app.isLoading
export const selectStoragePath = (state: AppRootState): string => state.app.currentPath
export const selectIsInitialized = (state: AppRootState): boolean => state.app.isInitialized
export const selectMenuItems = (state: AppRootState): IconsLinks[] => state.app.menuItems
export const selectFooterLinks = (state: AppRootState): IconsLinks[] => state.app.footerLinks
export const selectAlerts = (state: AppRootState): AlertObject[] => state.app.alerts
