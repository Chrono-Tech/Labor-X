import { Translate } from 'components/common'
import React from 'react'
import css from './Schedule.scss'

export default class Schedule extends React.Component {
  render () {
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.schedule' /></div>
        </div>
        <div className={css.content}>
          <div>Schedule page content</div>
        </div>
      </div>
    )
  }
}
