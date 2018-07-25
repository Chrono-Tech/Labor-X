import React from 'react'
import { LoginActions } from 'src/components/layouts'
import { LoginOptions } from 'src/components/Login'

import css from './index.scss'

export default class LoginPage extends React.Component {
  render () {
    return (
      <div className={css.root}>
        <LoginActions contentClassName={css.contentGradient}>
          <LoginOptions />
        </LoginActions>
      </div>
    )
  }
}
