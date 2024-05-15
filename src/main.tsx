import React from 'react';
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import App from './App.tsx'
import './index.css'
// store.dispatch(incrementAsync(2));


ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
    </Provider>
)
