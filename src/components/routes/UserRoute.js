import React from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/lib/connect/connect'
import Redirect from 'react-router-dom/Redirect'
import Route from 'react-router-dom/Route'
import { userSelector, logoutLoadingSelector } from "src/store/user/selectors"
import { decryptedWalletSelector } from "src/store/wallet/selectors"
import UserModel from "src/models/app/UserModel"

export const UserRoute = (props) => (
  props.user &&
  props.decryptedWallet &&
  props.logoutLoading
    ? <Route {...props}>{props.children}</Route>
    : <Redirect to='/my-accounts' />
)

UserRoute.propTypes = {
  user: PropTypes.instanceOf(UserModel),
  decryptedWallet: PropTypes.shape({}),
  logoutLoading: PropTypes.bool.isRequired,
  children: PropTypes.shape({}),
}

const mapStateToProps = (state) => ({
  user: userSelector()(state),
  decryptedWallet: decryptedWalletSelector(state),
  logoutLoading: logoutLoadingSelector(state),
})

export default connect(mapStateToProps)(UserRoute)
