import { Translate } from 'components/common'
import React from 'react'
import css from './CompletedJobs.scss'

export default class CompletedJobs extends React.Component {
  render () {
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.completedJobs' /></div>
        </div>
        <div className={css.content}>
          <div>CompletedJobs page content</div>
        </div>
      </div>
    )
  }
}
