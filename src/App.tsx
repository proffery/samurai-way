import styled, { css } from 'styled-components'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Users } from "./components/layout/pages/users/Users"
import { Messages } from "./components/layout/pages/messages/Messages"
import { Notifications } from "./components/layout/pages/notifications/Notifications"
import { Settings } from "./components/layout/pages/settings/Settings"
import { NotFound } from './components/layout/pages/notFound/NotFound'
import { theme } from './styles/Theme.styled'
import { ProfileContainer } from './components/layout/pages/profile/ProfileContainer'
import { HeaderContainer } from './components/layout/header/HeaderContainer'
import { LoadingLoader } from './components/micro/loaders/LoadingLoader.styled'
import { useEffect } from 'react'
import { LoginContainer } from './components/layout/login/LoginContainer'
import { AlertsContainer } from './components/micro/alerts/AlertsContainer'
import { NavbarContainer } from './components/layout/navbar/NavbarContainer'
import { FooterContainer } from './components/layout/footer/FooterContainer'
import { InitializationLoader } from './components/micro/loaders/IniatializationLoader'


type AppPropsType = {
  isLoggedIn: boolean
  navbarCollapsed: boolean
  isLoading: boolean
  isInitialized: boolean
  initializeApp: () => void
}
function App(props: AppPropsType) {
  const { isLoggedIn, navbarCollapsed, isLoading, isInitialized, initializeApp } = props

  useEffect(() => {
    initializeApp()
  }, [])

  if (!isLoggedIn) {
    return (
      <LoginWrapper>
        {isLoading && <LoadingLoader />}
        {!isInitialized && <InitializationLoader/>}
        <AlertsContainer />
        <Switch>
          <Route path='/' exact render={() => <Redirect to={'/login'} />} />
          <Route path='/login' render={() => <LoginContainer />} />
          <Route path='*' render={() => <Redirect to={'/login'} />} />
        </Switch>
        <FooterContainer />
      </LoginWrapper>
    )
  }

  return (
    <Wrapper collapsed={navbarCollapsed.toString()}>
      {isLoading && <LoadingLoader />}
      {!isInitialized && <InitializationLoader/>}
      <AlertsContainer />
      <NavbarContainer />
      <HeaderContainer />
      <Switch>
        <Route path='/' exact render={() => <ProfileContainer />} />
        <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
        <Route path='/users' component={Users} />
        <Route path='/messages' component={Messages} />
        <Route path='/notifications' component={Notifications} />
        <Route path='/settings' component={Settings} />
        <Route path='/404' component={NotFound} />
        <Route path='/login' render={() => <Redirect to={'/'} />} />
        <Route path='*' render={() => <Redirect to={'/404'} />} />
      </Switch>
      <FooterContainer />
    </Wrapper>
  )
}

export default App

type ContainerPropsType = {
  collapsed: string
}
const Wrapper = styled.div<ContainerPropsType>`
  display: grid;
  grid-template-rows: 104px 93vh 1fr;
  grid-template-columns: repeat(5, 1fr);
  max-width: 1440px;
  height: 100%;
  margin: 0 auto;
  padding: 0;
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
  ${props => props.collapsed === 'false' ? css<ContainerPropsType>`
    grid-template-columns: 5px repeat(4, 1fr);
    main {
      grid-area: 2 / 1 / 3 / 6 ;
    }
    nav {
      grid-area: 1 / 1 / 3 / 1 ;
      padding: 5px;
    }
    header {
      grid-area: 1 / 1 / 2 / 6 ;
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