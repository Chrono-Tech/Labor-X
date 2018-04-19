import { Translate } from 'components/common'
import React from 'react'
import css from './ValidationRequests.scss'

export default class ValidationRequests extends React.Component {
  render () {
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.validationRequests' /></div>
        </div>
        <div className={css.content}>
          <div>ValidationRequests page content</div>
        </div>
      </div>
    )
  }
}
