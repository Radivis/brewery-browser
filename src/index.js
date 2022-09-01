/*
Starting point of the application
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';

import store from './store/store';
import BreweryRouter from './components/BreweryRouter/BreweryRouter';
import NavBar from './components/NavBar/NavBar';
import PageContainer from './components/PageContainer/PageContainer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <PageContainer>
          <BreweryRouter />
        </PageContainer>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


