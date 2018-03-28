import { LoginLayout } from 'components/layouts'
import { LoginOptions } from 'components/Login'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import store from 'store'
import 'styles/globals/globals.scss'

class Index extends React.Component {
  render () {
    return (
      <LoginLayout>
        <LoginOptions />
      </LoginLayout>
    )
  }
}

export default withRedux(store)(Index)
