import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router'

// import OurNetworkView from "./component/OurNetworkView";
// import WelcomeView from "./component/WelcomeView";
// import ManageView from "./component/ManageView";
// import AccountPasswordView from "./component/AccountPasswordView";
// import HomeMnemonicLoginView from "./component/HomeMnemonicLoginView";
// import CryptoEducationView from "./component/CryptoEducationView";
import IndexPage from "./component/IndexPage/index";
// import CopyYourAccountPasswordView from "./component/CopyYourAccountPasswordView";
// import CryptoCurrenciesView from "./component/CryptoCurrenciesView";
// import ConfirmBackUpView from "./component/ConfirmBackUpView";
// import YourAccountView from "./component/YourAccountView";
// import LoginView from "./component/LoginView";
// import YourWalletFileView from "./component/YourWalletFileView";
// import AuthorizationMethodsView from "./component/AuthorizationMethodsView";
// import LaborhourView from "./component/LaborhourView";
// import MyAccountsView from "./component/MyAccountsView";
// import HomeLoginMethodsView from "./component/HomeLoginMethodsView";

const history = createBrowserHistory()

import reducer from './store/reducer'

export const store = createStore(
    connectRouter(history)(reducer),
    {},
    compose(
        applyMiddleware(
            routerMiddleware(history),
            thunk,
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

const persistor = persistStore(store)

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading='Loading' persistor={persistor}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route exact path="/" component={IndexPage}/>
                    {/*<Route exact path="/crypto-education" component={CryptoEducationView}/>*/}
                    {/*<Route exact path="/our-network" component={OurNetworkView}/>*/}
                    {/*<Route exact path="/your-account" component={YourAccountView}/>*/}
                    {/*<Route exact path="/crypto-currencies" component={CryptoCurrenciesView}/>*/}
                    {/*<Route exact path="/laborhour" component={LaborhourView}/>*/}
                    {/*<Route exact path="/account-password" component={AccountPasswordView}/>*/}
                    {/*<Route exact path="/copy-your-account-password" component={CopyYourAccountPasswordView}/>*/}
                    {/*<Route exact path="/confirm-back-up" component={ConfirmBackUpView}/>*/}
                    {/*<Route exact path="/your-wallet-file" component={YourWalletFileView}/>*/}
                    {/*<Route exact path="/welcome" component={WelcomeView}/>*/}
                    {/*<Route exact path="/manage" component={ManageView}/>*/}
                    {/*<Route exact path="/authorization-methods" component={AuthorizationMethodsView}/>*/}
                    {/*<Route exact path="/login" component={LoginView}/>*/}
                    {/*<Route exact path="/my-accounts" component={MyAccountsView}/>*/}
                    {/*<Route exact path="/home-mnemonic-login" component={HomeMnemonicLoginView}/>*/}
                    {/*<Route exact path="/home-login-methods" component={HomeLoginMethodsView}/>*/}
                </Switch>
            </ConnectedRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

