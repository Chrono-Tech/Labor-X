import { Link } from 'components/common'
import { LoginLayout } from 'components/layouts'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import { bootstrap } from 'store/bootstrap'
import 'styles/globals/globals.scss'
import initialStore from 'store'

class Index extends React.Component {
  static getInitialProps ({ store }) {
    store.dispatch(bootstrap())
  }

  render () {
    return (
      <LoginLayout>
        <Link href='/login-options'>Go to Login Options</Link>
      </LoginLayout>
    )
  }
}

export default withRedux(initialStore)(Index)
