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
        <div>
          <div><Link href='/login'>Login</Link></div>
          <div><Link href='/create-account'>Create account</Link></div>
          <div><Link href='/dashboard'>Dashboard</Link></div>
          <div><Link href='/landing-page'>Landing</Link></div>
        </div>
      </LoginLayout>
    )
  }
}

export default withRedux(initialStore)(Index)
