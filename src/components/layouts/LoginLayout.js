import React from 'react'
import Link from 'next/link'

export default class LoginLayout extends React.Component {
  render () {
    return (
      <div>
        <Link href='/dashboard'>Go to dashboard</Link>
      </div>
    )
  }
}
