import React from 'react'
import { LoginLayout } from 'components/layouts'
import 'styles/globals/globals.scss'
import { Link } from 'components/common'

export default class Index extends React.Component {
  render () {
    return (
      <LoginLayout>
        <Link href='/login-options'>Go to Login Options</Link>
      </LoginLayout>
    )
  }
}
