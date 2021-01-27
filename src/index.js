import React from 'react';
import ReactDOM from 'react-dom';
//import App from './AppClass';
//import App from './AppFunction';
//import App from './Login';
//import App from './Register';
import App from './App';

ReactDOM.render(<App />,document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}

