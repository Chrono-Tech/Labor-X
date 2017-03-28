import React from 'react';
import {browserHistory, Router, Route, IndexRoute} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';

import {store} from './store';
import App from './components/App';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

import { UserIsAuthenticated } from './auth/wrappers.js'

const history = syncHistoryWithStore(browserHistory, store);

const Authenticated = UserIsAuthenticated((props) => React.cloneElement(props.children, props));
/*
 Route path="/" component={App}>
 <Route path="login" component={Login}/>
 <Route component={EnsureLoggedInContainer}>
 <Route component={MainLayout}>
 <IndexRoute component={Dashboard}/>
 <Route path="dashboard" component={Dashboard}/>
 <Route path="wallet">
 <IndexRoute component={Wallet}/>
 <Route path="account/:address/send" component={SendWizard} />
 <Route path="account/:address" component={Account} />
 </Route>
 </Route>
 </Route>
 </Route>
 */
export const router = (
    <Provider store={ store }>
        <Router history={ history }>
            <Route component={ App }>

                <Route path="/" component={ Authenticated } >
                    <IndexRoute component={ Dashboard }/>
                    <Route path="dashboard" component={ Dashboard }/>
                </Route>

                <Route path="/login" component={ Login } />

            </Route>
        </Router>
    </Provider>
);
