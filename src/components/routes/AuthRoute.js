import React from 'react'
import connect from 'react-redux/lib/connect/connect'
import Redirect from 'react-router-dom/Redirect'
import Route from 'react-router-dom/Route'
import { userSelector } from "src/store/user/selectors";
import {decryptedWalletSelector} from "src/store/wallet/selectors";

export const AuthRoute = (props) => props.user && props.decryptedWallet ? <Redirect to='/dashboard' /> : <Route {...props}>{props.children}</Route>

const mapStateToProps = (state) => ({
  user: userSelector()(state),
  decryptedWallet: decryptedWalletSelector(state),
})

export default connect(mapStateToProps)(AuthRoute)
