import { S } from './App_Styles'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Patch } from 'components/app/Router/routeNames'
import { Alerts } from 'components/common/alerts/AlertsContainer'
import { Footer } from 'components/layout/footer/Footer'
import { Header } from 'components/layout/header/Header'
import { Navbar } from 'components/layout/navbar/Navbar'
import { useActions } from 'utils/customHooks/useActions'
import { selectIsloggedIn } from 'store/auth/authSelectors'
import { LoadingLoader } from '../common/loaders/LoadingLoader.styled'
import { AppRouteSwich } from 'components/app/Router/routes/AppRouteSwich'
import { LoginRouteSwich } from 'components/app/Router/routes/LoginRouteSwich'
import { selectAppIsLoading, selectIsInitialized } from 'store/app/appSelectors'
import { InitializationLoader } from 'components/common/loaders/IniatializationLoader'

export const App: React.FC = () => {
  const isLoggedIn = useSelector(selectIsloggedIn)
  const isLoading = useSelector(selectAppIsLoading)
  const isInitialized = useSelector(selectIsInitialized)
  const { savePathToStorage, initializeApp } = useActions()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { pathname } = useHistory().location

  useEffect(() => {
    initializeApp()
  }, [])

  useEffect(() => {
    pathname !== Patch.Login && savePathToStorage(pathname)
  }, [pathname])

  if (!isLoggedIn) {
    return <S.LoginWrapper>
      {isLoading && <LoadingLoader />}
      {!isInitialized && <InitializationLoader />}
      <Alerts />
      <LoginRouteSwich />
      <Footer />
    </S.LoginWrapper>
  }

  return <S.AppWrapper collapsed={isCollapsed.toString()}>
    {isLoading && <LoadingLoader />}
    {!isInitialized && <InitializationLoader />}
    <Alerts />
    <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
    <Header />
    <AppRouteSwich />
    <Footer />
  </S.AppWrapper>
}