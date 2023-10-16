import ReactDOM from 'react-dom';
import App from './App';
import { GlobalStyle } from './styles/Global.styled';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/Theme.styled';
import { state } from './redux/state';

ReactDOM.render(
    <ThemeProvider theme={theme}>
      <App state={state}/>
      <GlobalStyle />
    </ThemeProvider>,
  document.getElementById('root')
);