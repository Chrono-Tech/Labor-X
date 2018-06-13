import React from 'react'
import css from './LoginLayout.scss'

export default class LoginLayout extends React.Component {
  render () {
    return (
      <div className={css.root}>
        {this.props.children}
      </div>
    )
  }
}
