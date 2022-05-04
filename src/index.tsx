import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import theme from './components/themes/MuiTheme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createStore } from 'redux';
import rootReducer from './store';
import { Provider } from 'react-redux';
import { UncountableData } from './api/UncountableData';

const store = createStore(rootReducer)
UncountableData.parseData();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
