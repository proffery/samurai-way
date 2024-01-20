import styled, { css } from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Footer } from "./components/layout/footer/Footer";
import { Navbar } from "./components/layout/navbar/Navbar";
import { Header } from "./components/layout/header/Header";
import { Users } from "./components/layout/pages/users/Users";
import { Profile } from "./components/layout/pages/profile/Profile";
import { Messages } from "./components/layout/pages/messages/Messages";
import { Notifications } from "./components/layout/pages/notifications/Notifications";
import { Settings } from "./components/layout/pages/settings/Settings";
import { NotFound } from './components/layout/pages/notFound/NotFound';
import { useState } from 'react';
import { theme } from './styles/Theme.styled';
import { AppRootStateType } from './redux/redux-store';
import { useSelector } from 'react-redux';
import { MenuStateType } from './redux/menuReducer';
import { FooterStateType } from './redux/footerReducer';


function App() {
  const [navCollapsed, setNavCollapsed] = useState<boolean>(true)

  const menuData = useSelector<AppRootStateType, MenuStateType>(state => state.menu)
  const footerData = useSelector<AppRootStateType, FooterStateType>(state => state.footer)

  return (
    <Router >
      <Container collapsed={navCollapsed ? 'true' : 'false'}>
        <Navbar menuData={menuData} navcollapsed={navCollapsed} setNavCollapsed={setNavCollapsed} />
        <Header />
        <Switch>
          <Route path='/' exact render={() => <Profile />} />
          <Route path='/profile' render={() => <Profile />} />
          <Route path='/users' render={() => <Users />} />
          <Route path='/messages' render={() => <Messages />} />
          <Route path='/notifications' component={Notifications} />
          <Route path='/settings' component={Settings} />
          <Route path='*' component={NotFound} />
        </Switch>
        <Footer menuData={menuData} footerData={footerData} />
      </Container>
    </Router>
  )
}

export default App;

type ContainerPropsType = {
  collapsed: "true" | "false"
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
  ${props => props.collapsed === "false" && css<ContainerPropsType>`
    grid-template-columns: 5px repeat(4, 1fr);
    main {
      grid-area: 2 / 1 / 3 / 6 ;
    }
    nav {
      grid-area: 1 / 1 / 3 / 1 ;
      padding: 7px;
    }
    header {
      grid-area: 1 / 1 / 2 / 6 ;
    }
  `}
  @media ${theme.media.mobile} {
    grid-template-rows: 80px 93vh 1fr;
  }
`