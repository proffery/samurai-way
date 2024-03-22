import { MessagesContainer } from 'components/containers/MessagesContainer'
import { Redirect, Route, Switch } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { InitializationLoader } from './components/common/loaders/IniatializationLoader'
import { LoadingLoader } from './components/common/loaders/LoadingLoader.styled'
import { AlertsContainer } from './components/containers/AlertsContainer'
import { FooterContainer } from './components/containers/FooterContainer'
import { HeaderContainer } from './components/containers/HeaderContainer'
import { LoginContainer } from './components/containers/LoginContainer'
import { NavbarContainer } from './components/containers/NavbarContainer'
import { ProfileContainer } from './components/containers/ProfileContainer'
import { NotFound } from './components/layout/pages/notFound/NotFound'
import { Notifications } from './components/layout/pages/notifications/Notifications'
import { Settings } from './components/layout/pages/settings/Settings'
import { Users } from './components/layout/pages/users/Users'
import { theme } from './styles/Theme.styled'

type AppPropsType = {
  isLoading: boolean
  storagePath: string
  isLoggedIn: boolean
  isInitialized: boolean
  navbarCollapsed: boolean
}
function App(props: AppPropsType) {
  const { isLoggedIn, navbarCollapsed, isLoading, isInitialized, storagePath } = props

  if (!isLoggedIn) {
    return (
      <LoginWrapper>
        {isLoading && <LoadingLoader />}
        {!isInitialized && <InitializationLoader />}
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
      {!isInitialized && <InitializationLoader />}
      <AlertsContainer />
      <NavbarContainer />
      <HeaderContainer />
      <Switch>
        <Route path='/' exact render={() => <ProfileContainer />} />
        <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
        <Route path='/users' component={Users} />
        <Route path='/messages/:userId?' component={MessagesContainer} />
        <Route path='/notifications' component={Notifications} />
        <Route path='/settings' component={Settings} />
        <Route path='/404' component={NotFound} />
        <Route path='/login' render={() => <Redirect to={`${storagePath}`} />} />
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
  ${props => props.collapsed === 'false' ? css<ContainerPropsType>`
    grid-template-columns: 5px repeat(4, 1fr);
    main {
      grid-area: 2 / 1 / 3 / 6 ;
      padding-left: min(45px, 12vw);
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