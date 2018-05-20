import withRedux from 'next-redux-wrapper'
import React from 'react'
import initialStore, {
  walletUpdate,
  walletRemove,
  decryptWallet,
  createWallet,
  logout,
} from 'store'
import 'styles/globals/globals.scss'

// import css from './index.scss'

class Wallet extends React.Component {
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

export default withRedux(initialStore, mapStateToProps, mapDispatchToProps)(Wallet)
