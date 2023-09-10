import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {disableReactDevTools} from '@fvilers/disable-react-devtools';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import configureStore from "./redux/store"; // Import your store configuration


if (process.env.NODE_ENV === 'production') {
    disableReactDevTools();
}
const { store, persistor } = configureStore(); // Initialize the store

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
);

reportWebVitals();
