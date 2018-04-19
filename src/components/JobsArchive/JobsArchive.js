import { Translate } from 'components/common'
import React from 'react'
import css from './JobsArchive.scss'

export default class JobsArchive extends React.Component {
  render () {
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.jobsArchive' /></div>
        </div>
        <div className={css.content}>
          <div>JobsArchive page content</div>
        </div>
      </div>
    )
  }
}
