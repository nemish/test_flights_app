import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';


import MainApp from './components/MainApp';



ReactDOM.render((
    <Provider store={store}>
        <MainApp />
    </Provider>
), document.getElementById('app'));