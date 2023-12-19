import { AppRootStateType, store } from "./redux/redux-store";
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalStyle } from './styles/Global.styled';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/Theme.styled';

const rerenderEntireTree = (state: AppRootStateType) => {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <App
        state={state}
        dispatch={store.dispatch.bind(store)} 
      />
      <GlobalStyle />
    </ThemeProvider>,
    document.getElementById('root'))
}

rerenderEntireTree(store.getState())

store.subscribe(() => rerenderEntireTree(store.getState()))