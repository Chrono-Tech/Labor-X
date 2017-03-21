import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import log from 'loglevel';

import {store, start as startStore} from './store';
import App from './components/App';
import './index.css';

const start = () => {
    log.setLevel('debug');
    log.info('Starting Labox X...');

    ReactDOM.render(
        <Provider store={store}><App /></Provider>,
        document.getElementById('root')
    );

    startStore();
};


window.LABORX = window.LABORX || {};
window.LABORX.start = start;
