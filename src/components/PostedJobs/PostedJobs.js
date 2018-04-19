import { Translate } from 'components/common'
import React from 'react'
import css from './PostedJobs.scss'

export default class PostedJobs extends React.Component {
  render () {
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.postedJobs' /></div>
        </div>
        <div className={css.content}>
          <div>PostedJobs page content</div>
        </div>
      </div>
    )
  }
}
