import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import SettingsContextProvider from './context/SettingsContext';

import themes from './theme/schema.json';
import { setToLS } from './utils/storage';

const Index = () => {
  setToLS('all-themes', themes);
  return (
    <App />
  )
}


ReactDOM.render(
  <SettingsContextProvider value={{}}>
    <Index />
  </SettingsContextProvider>,
  document.getElementById('root')
);
