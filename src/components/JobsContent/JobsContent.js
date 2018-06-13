import { Translate } from 'components/common'
import React from 'react'
import css from './JobsContent.scss'

export default class JobsContent extends React.Component {
  render () {
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.jobsContent' /></div>
        </div>
        <div className={css.content}>
          <div>JobsContent page content</div>
        </div>
      </div>
    )
  }
}
