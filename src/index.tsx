import App from 'App'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store/redux-store'
import { theme } from './styles/Theme.styled'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/Global.styled'
import { HashRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
    <GlobalStyle />
  </ThemeProvider>,
  document.getElementById('root'))
