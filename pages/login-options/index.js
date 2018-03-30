import { LoginLayout } from 'components/layouts'
import { LoginOptions } from 'components/Login'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import initialStore from 'store'
import {bootstrap} from 'store/bootstrap'
import 'styles/globals/globals.scss'
import ethereumService from '../../src/services/EthereumService'

class Index extends React.Component {
  static getInitialProps ({ store }) {
    store.dispatch(bootstrap())
  }

  componentWillMount () {
    ethereumService.start()
  }

  render () {
    return (
      <LoginLayout>
        <LoginOptions />
      </LoginLayout>
    )
  }
}

export default withRedux(initialStore)(Index)
