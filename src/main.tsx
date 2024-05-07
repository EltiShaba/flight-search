import React from 'react';
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import App from './App.tsx'
import './index.css'
// import { incrementAsync } from './store/features/applicationSlice.ts';
// import {
//   BrowserRouter as Router,
// } from "react-router-dom";

// store.dispatch(incrementAsync(2));


ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <Provider store={store}>
      {/* <Router> */}
        <App />
      {/* </Router> */}
    </Provider>
  // </React.StrictMode>,
)
