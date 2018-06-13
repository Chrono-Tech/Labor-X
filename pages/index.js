import React from 'react'
import { Link } from 'src/components/common'
import { LoginLayout } from 'src/components/layouts'
import { connect } from 'react-redux'

class IndexPage extends React.Component {
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

export default connect()(IndexPage)
