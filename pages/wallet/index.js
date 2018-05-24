import React from 'react'
import { connect } from 'react-redux'
import {
  walletUpdate,
  walletRemove,
  decryptWallet,
  createWallet,
  logout,
} from 'src/store'

// import css from './index.scss'

class WalletPage extends React.Component {
  render () {
    return null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    walletUpdate: (wallet, name) => dispatch(walletUpdate(wallet, name)),
    walletRemove: (name) => dispatch(walletRemove(name)),
    decryptWallet: (wallet) => dispatch(decryptWallet(wallet)),
    createWallet: (options) => dispatch(createWallet(options)),
    logout: (wallet) => dispatch(logout(wallet)),
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletPage)
