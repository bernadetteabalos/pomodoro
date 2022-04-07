import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import SettingsContextProvider from './context/SettingsContext';


ReactDOM.render(
  <SettingsContextProvider value={{}}>
    <App />
  </SettingsContextProvider>,
  document.getElementById('root')
);
