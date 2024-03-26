import { useEffect } from 'react'
import { Patch } from 'AppRoutingNames'
import { useSelector } from 'react-redux'
import { theme } from './styles/Theme.styled'
import styled, { css } from 'styled-components'
import { Login } from 'components/layout/login/Login'
import { useActions } from 'utils/customHooks/useActions'
import { selectIsloggedIn } from 'store/auth/authSelectors'
import { Users } from './components/layout/pages/users/Users'
import { Settings } from './components/layout/pages/settings/Settings'
import { NotFound } from './components/layout/pages/notFound/NotFound'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import { HeaderContainer } from './components/containers/HeaderContainer'
import { NavbarContainer } from './components/containers/NavbarContainer'
import { ProfileContainer } from './components/containers/ProfileContainer'
import { MessagesContainer } from 'components/containers/MessagesContainer'
import { LoadingLoader } from './components/common/loaders/LoadingLoader.styled'
import { Notifications } from './components/layout/pages/notifications/Notifications'
import { InitializationLoader } from './components/common/loaders/IniatializationLoader'
import {
  selectAppIsLoading, selectIsInitialized, selectNavbarCollapsed,
  selectStoragePath
} from 'store/app/appSelectors'
import { Alerts } from 'components/common/alerts/Alerts'
import { Footer } from 'components/layout/footer/Footer'

function App() {
  const isLoggedIn = useSelector(selectIsloggedIn)
  const navbarCollapsed = useSelector(selectNavbarCollapsed)
  const isLoading = useSelector(selectAppIsLoading)
  const isInitialized = useSelector(selectIsInitialized)
  const storagePath = useSelector(selectStoragePath)
  const { savePathToStorage, initializeApp } = useActions()
  const { pathname } = useHistory().location

  useEffect(() => {
    initializeApp()
  }, [])

  useEffect(() => {
    pathname !== Patch.Login && savePathToStorage(pathname)
  }, [pathname])

  if (!isLoggedIn) {
    return (
      <LoginWrapper>
        {isLoading && <LoadingLoader />}
        {!isInitialized && <InitializationLoader />}
        <Alerts />
        <Switch>
          <Route path={Patch.Home} exact render={() => <Redirect to={Patch.Login} />} />
          <Route path={Patch.Login} render={() => <Login />} />
          <Route path={Patch.Other} render={() => <Redirect to={Patch.Login} />} />
        </Switch>
        <Footer />
      </LoginWrapper>
    )
  }

  return (
    <Wrapper collapsed={navbarCollapsed.toString()}>
      {isLoading && <LoadingLoader />}
      {!isInitialized && <InitializationLoader />}
      <Alerts />
      <NavbarContainer />
      <HeaderContainer />
      <Switch>
        <Route path={Patch.Home} exact component={ProfileContainer} />
        <Route path={Patch.ProfileParams} component={ProfileContainer} />
        <Route path={Patch.Users} component={Users} />
        <Route path={Patch.MessagesParams} component={MessagesContainer} />
        <Route path={Patch.Notifications} component={Notifications} />
        <Route path={Patch.Settings} component={Settings} />
        <Route path={Patch.NotFound} component={NotFound} />
        <Route path={Patch.Login} render={() => <Redirect to={`${storagePath}`} />} />
        <Route path={Patch.Other} render={() => <Redirect to={Patch.NotFound} />} />
      </Switch>
      <Footer />
    </Wrapper>
  )
}

export default App

type Container = {
  collapsed: string
}
const Wrapper = styled.div<Container>`
  display: grid;
  grid-template-rows: 104px 93vh 1fr;
  grid-template-columns: repeat(5, 1fr);
  max-width: 1440px;
  height: 100%;
  margin: 0 auto;
  padding: 0;
  transition: all ease-in-out .2s;
  main {
    grid-area: 2 / 2 / 3 / 6 ;
  }
  nav {
    grid-area: 1 / 1 / 3 / 2 ;
  }
  header {
    grid-area: 1 / 2 / 2 / 6 ;
  }
  footer {
    grid-area: 3 / 1 / 4 / 6 ;
  }
  ${props => props.collapsed === 'false' ? css<Container>`
    grid-template-columns: 5px repeat(4, 1fr);
    main {
      grid-area: 2 / 1 / 3 / 6 ;
      padding-left: min(45px, 12vw);
      height: 100%;
    }
    nav {
      grid-area: 1 / 1 / 3 / 1 ;
      width: 32px;
      padding: min(45px, 16vw) 4px;
    }
    header {
      grid-area: 1 / 1 / 2 / 6 ;
      padding-left: min(45px, 12vw);
    }
  `: undefined}
  @media ${theme.media.mobile} {
    grid-template-rows: 80px 93vh 1fr;
  }
`
const LoginWrapper = styled.div`
  max-width: 1440px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0;
  main {
    height: 80vh;
  }
`
