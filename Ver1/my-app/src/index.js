import React from 'react';
import ReactDOM from 'react-dom/client';

// // Bootstrap CSS package that already installed
// import "bootstrap/dist/css/bootstrap.min.css";
// // Bootstrap Bundle JS that already installed too
// import "bootstrap/dist/js/bootstrap.bundle.min";

import "./my_css.css";      //import our own css stylesheet, alter css setting for our own here
import "./index.css";       //default react css
import App from './App';
import reportWebVitals from './reportWebVitals';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
