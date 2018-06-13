import { Translate } from 'components/common'
import React from 'react'
import css from './ReportsAndClaims.scss'

export default class ReportsAndClaims extends React.Component {
  render () {
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.reportsAndClaims' /></div>
        </div>
        <div className={css.content}>
          <div>ReportsAndClaims page content</div>
        </div>
      </div>
    )
  }
}
