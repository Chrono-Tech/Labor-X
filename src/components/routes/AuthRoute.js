import React from 'react'
import connect from 'react-redux/lib/connect/connect'
import Redirect from 'react-router-dom/Redirect'
import Route from 'react-router-dom/Route'
import PropTypes from "prop-types"

import { userSelector } from "src/store/user/selectors"
import { decryptedWalletSelector } from "src/store/wallet/selectors"
import { submitWelcomeLoadingSelector } from "src/store/auth/signup/selectors"
import { submitLoadingSelector } from "src/store/auth/signin/selectors"
import UserModel from "src/models/app/UserModel"

export const AuthRoute = (props) => (
  props.user &&
  props.decryptedWallet &&
  !props.submitWelcomeLoading &&
  !props.submitLoading
    ? <Redirect to='/dashboard' />
    : <Route {...props}>{props.children}</Route>
)

AuthRoute.propTypes = {
  user: PropTypes.instanceOf(UserModel),
  decryptedWallet: PropTypes.shape({}),
  submitWelcomeLoading: PropTypes.bool.isRequired,
  submitLoading: PropTypes.bool.isRequired,
  children: PropTypes.shape({}),
}

const mapStateToProps = (state) => ({
  user: userSelector()(state),
  decryptedWallet: decryptedWalletSelector(state),
  submitLoading: submitLoadingSelector(state),
  submitWelcomeLoading: submitWelcomeLoadingSelector(state),
})

export default connect(mapStateToProps)(AuthRoute)
