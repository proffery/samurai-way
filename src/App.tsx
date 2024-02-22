import styled, { css } from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Footer } from "./components/layout/footer/Footer";
import { Navbar } from "./components/layout/navbar/Navbar";
import { Users } from "./components/layout/pages/users/Users";
import { Messages } from "./components/layout/pages/messages/Messages";
import { Notifications } from "./components/layout/pages/notifications/Notifications";
import { Settings } from "./components/layout/pages/settings/Settings";
import { NotFound } from './components/layout/pages/notFound/NotFound';
import { theme } from './styles/Theme.styled';
import { AppRootStateType } from './redux/redux-store';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from './redux/appReducer';
import { ProfileContainer } from './components/layout/pages/profile/ProfileContainer';
import { HeaderContainer } from './components/layout/header/HeaderContainer';
import { LoadingLoader } from './components/micro/appGlobalConditions/conditions/LoadingLoader.styled';



function App() {
  const appData = useSelector<AppRootStateType, AppStateType>(state => state.app)
  const dispatch = useDispatch()
  return (
    <Router >
      <Container collapsed={appData.navbarCollapsed.toString()}>
        {appData.isLoading && <LoadingLoader />}
        <Navbar
          menuItems={appData.menuItems}
          navbarCollapsed={appData.navbarCollapsed}
          dispatch={dispatch}
        />
        <HeaderContainer />
        <Switch>
          <Route path='/' exact render={() => <ProfileContainer />} />
          <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
          <Route path='/users' component={Users} />
          <Route path='/messages' component={Messages} />
          <Route path='/notifications' component={Notifications} />
          <Route path='/settings' component={Settings} />
          <Route path='*' component={NotFound} />
        </Switch>
        <Footer
          menuData={appData.menuItems}
          footerData={appData.socialLinks}
        />
      </Container>
    </Router>
  )
}

export default App;

type ContainerPropsType = {
  collapsed: string
}

const Container = styled.div<ContainerPropsType>`
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