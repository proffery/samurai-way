import { store } from "./redux/redux-store"
import ReactDOM from 'react-dom'
import { GlobalStyle } from './styles/Global.styled'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/Theme.styled'
import { Provider } from "react-redux"
import { BrowserRouter as Router } from 'react-router-dom'
import { AppContainer } from "./AppContainer"

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
