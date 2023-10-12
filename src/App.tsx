import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Footer } from "./layout/footer/Footer";
import { Navbar } from "./layout/navbar/Navbar";
import { Header } from "./layout/header/Header";
import { Container } from "./components/Container";
import { Home } from "./layout/sections/home/Home";
import { Profile } from "./layout/sections/profile/Profile";
import { Messages } from "./layout/sections/messages/Messages";
import { Notifications } from "./layout/sections/notifications/Notifications";
import { Settings } from "./layout/sections/settings/Settings";
import { FlexWrapper } from './components/FlexWrapper';
import styled from 'styled-components';
import { NotFound } from './layout/sections/notFound/NotFound';



function App() {

  return (
    <>
      <Container>
        <Router >
          <Navbar />
          <Sections direction='column' >
              <Header />
              <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/feed' component={Home} />
                <Route path='/profile' component={Profile} />
                <Route path='/messages' component={Messages} />
                <Route path='/notifications' component={Notifications} />
                <Route path='/settings' component={Settings} />
                <Route path='*' component={NotFound} />
              </Switch>
          </Sections>
        </Router>
      </Container>
      <Footer />
    </>
  );
}

export default App;

const Sections = styled(FlexWrapper)`
  width: 100%;
  height: 100vh;
`