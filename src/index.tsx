import { store } from "./redux/state";
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalStyle } from './styles/Global.styled';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/Theme.styled';
import { RootStateType } from './redux/state';

const rerenderEntireTree = (state: RootStateType) => {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <App
        state={state}
        addPost={store.addPost.bind(store)}
        newPostChange={store.newPostChange.bind(store)}
      />
      <GlobalStyle />
    </ThemeProvider>,
    document.getElementById('root'))
}

rerenderEntireTree(store.getState())

store.subscribe(() => rerenderEntireTree(store.getState()))
