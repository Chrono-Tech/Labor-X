import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import {browserHistory} from 'react-router';

import {ipfsReducers} from './ipfs/ipfsReducers';
import {networkReducers} from './network/networkReducers';
import {userReducers} from './user/userReducers';
import {setupWeb3, loadAccounts} from './network/networkActions';
import {setupNode as setupIpfsNode} from './ipfs/ipfsActions';

import {routerReducer, routerMiddleware} from 'react-router-redux';

const routingMiddleware = routerMiddleware(browserHistory);

const loggerMiddleware = createLogger({
    //stateTransformer
});

const appReducers = combineReducers({
    network: networkReducers,
    ipfs: ipfsReducers,
    routing: routerReducer,
    user: userReducers,
});

/**
 * This reducer just clean state on logout
 */
const rootReducer = (state, action) => {
    if (action.type === 'USER/LOGOUT') {
        state = undefined
    }
    return appReducers(state, action)
};

export const store = createStore(
    rootReducer,
    applyMiddleware(
        routingMiddleware,
        thunkMiddleware,
        loggerMiddleware
    )
);


export const start = () => {
    store.dispatch(setupWeb3(window.web3));
    store.dispatch(loadAccounts());
    store.dispatch(setupIpfsNode());
};
