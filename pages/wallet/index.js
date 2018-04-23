import { Link } from 'components/common'
import { LoginActions } from 'components/layouts'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import initialStore, { signOut } from 'store/wallet'
import { bootstrap } from 'store/bootstrap'
import 'styles/globals/globals.scss'
import ethereumService from '../../src/services/EthereumService'

import { PersistGate } from 'redux-persist/integration/react'

import { persistStore, persistReducer } from 'redux-persist'

// import css from './index.scss'


class Index extends React.Component {
  componentWillMount () {
    ethereumService.start()
  }
  
  render () {
    console.log('state', this.props.state)
    return (
      <div>
        hello, world!
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

export default withRedux(initialStore, mapStateToProps, mapDispatchToProps)(Index)
