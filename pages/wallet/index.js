import { Link } from 'components/common'
import { LoginActions } from 'components/layouts'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import initialStore, {
  walletCreate,
  walletUpdate,
  walletRemove,
  loadWallet,
  createWallet,
  logout
} from 'store/wallet'
import { bootstrap } from 'store/bootstrap'
import 'styles/globals/globals.scss'
import ethereumService from '../../src/services/EthereumService'

// import css from './index.scss'

class Index extends React.Component {
  componentWillMount () {
    ethereumService.start()
  }
  
  render () {
    return null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    walletUpdate: (wallet, name) => dispatch(walletUpdate(wallet, name)),
    walletRemove: (name) => dispatch(walletRemove(name)),
    loadWallet: (wallet) => dispatch(loadWallet(wallet)),
    createWallet: (options) => dispatch(createWallet(options)),
    logout: (wallet) => dispatch(logout(wallet)),
  }
}

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

export default withRedux(initialStore, mapStateToProps, mapDispatchToProps)(Index)