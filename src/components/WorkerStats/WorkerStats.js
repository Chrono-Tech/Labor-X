import { Translate } from 'components/common'
import React from 'react'
import css from './WorkerStats.scss'

export default class WorkerStats extends React.Component {
  render () {
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.workerStats' /></div>
        </div>
        <div className={css.content}>
          <div>WorkerStats page content</div>
        </div>
      </div>
    )
  }
}
