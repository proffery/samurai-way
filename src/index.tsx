import { AppRootStateType, store } from "./redux/redux-store";
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalStyle } from './styles/Global.styled';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/Theme.styled';
import { Provider } from "react-redux";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
    <GlobalStyle />
  </ThemeProvider>,
  document.getElementById('root'))
