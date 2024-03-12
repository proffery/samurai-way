import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store/redux-store'
import { theme } from './styles/Theme.styled'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/Global.styled'
import { HashRouter as Router } from 'react-router-dom'
import { AppContainer } from './components/containers/AppContainer'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <AppContainer />
      </Router>
    </Provider>
    <GlobalStyle />
  </ThemeProvider>,
  document.getElementById('root'))
