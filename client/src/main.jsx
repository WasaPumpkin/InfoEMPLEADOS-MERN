import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/main.scss';
import { Provider } from 'react-redux';
import store from './store';




const appElement = document.getElementById('root'); // Updated to 'root'
console.log('app element:', appElement);
if (!appElement) {
  throw new Error(
    "Failed to find the app element. Make sure there is a div with id 'root' in your index.html"
  );
}

const root = ReactDOM.createRoot(appElement);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
