import { state, subscribe } from "./redux/state";
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalStyle } from './styles/Global.styled';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/Theme.styled';
import { RootStateType, addPost, newPostChange } from './redux/state';

export const rerenderEntireTree = (state:RootStateType) => {
    ReactDOM.render(
      <ThemeProvider theme={theme}>
        <App state={state} addPost={addPost} newPostChange={newPostChange} />
        <GlobalStyle />
      </ThemeProvider>,
    document.getElementById('root'))
  }

rerenderEntireTree(state)

subscribe(() => rerenderEntireTree(state))
