import React from 'react';
import ReactDOM from 'react-dom';
import log from 'loglevel';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {start as startStore} from './store';
import {router} from './router';
import './index.css';

const start = () => {
    log.setLevel('debug');
    log.info('Starting Labox X...');

    ReactDOM.render(
        <MuiThemeProvider>
            {router}
        </MuiThemeProvider>,
        document.getElementById('root')
    );

    log.info('Starting store');
    startStore();
};


window.LABORX = window.LABORX || {};
window.LABORX.start = start;
