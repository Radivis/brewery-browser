import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';

import store from './store/store';
import BreweryRouter from './components/BreweryRouter/BreweryRouter';
import NavBar from './components/NavBar/NavBar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <BreweryRouter />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


