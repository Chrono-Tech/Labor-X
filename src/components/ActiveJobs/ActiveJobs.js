import { Translate } from 'components/common'
import React from 'react'
import css from './ActiveJobs.scss'

export default class ActiveJobs extends React.Component {
  render () {
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.activeJobs' /></div>
        </div>
        <div className={css.content}>
          <div>ActiveJobs page content</div>
        </div>
      </div>
    )
  }
}
