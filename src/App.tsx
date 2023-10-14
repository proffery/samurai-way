import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Footer } from "./layout/footer/Footer";
import { Navbar } from "./layout/navbar/Navbar";
import { Header } from "./layout/header/Header";
import { Home } from "./layout/sections/home/Home";
import { Profile } from "./layout/sections/profile/Profile";
import { Messages } from "./layout/sections/messages/Messages";
import { Notifications } from "./layout/sections/notifications/Notifications";
import { Settings } from "./layout/sections/settings/Settings";
import styled from 'styled-components';
import { NotFound } from './layout/sections/notFound/NotFound';



function App() {

  return (
    <Router >
      <Container>
        <Navbar />
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
        <Footer />
      </Container>
    </Router>
  )
}

export default App;

const Container = styled.div`
  display: grid;
  grid-template-rows: 70px 93vh 1fr;
  grid-template-columns: repeat(5, 1fr);
  max-width: 1440px;
  width: 90%;
  height: 100%;
  margin: 0 auto;
  padding: 0;
  main {
    grid-area: 2 / 2 / 3 / 6 ;
  }
`