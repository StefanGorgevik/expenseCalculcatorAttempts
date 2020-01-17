import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './containers/Layout';
import * as serviceWorker from './serviceWorker';
import store from './redux/store'
import {Provider} from 'react-redux'

ReactDOM.render(<Provider store={store}><Layout /> </Provider>, document.getElementById('main'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
