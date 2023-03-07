import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SignInSignupWithLocalStorage from './components/Login';
import { Provider } from 'react-redux';
import store from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <SignInSignupWithLocalStorage/>
    </Provider>
  </React.StrictMode>
);


