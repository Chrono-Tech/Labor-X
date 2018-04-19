import { Translate } from 'components/common'
import React from 'react'
import css from './MyJobsBoards.scss'

export default class MyJobsBoards extends React.Component {
  render () {
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.myJobsBoards' /></div>
        </div>
        <div className={css.content}>
          <div>MyJobsBoards page content</div>
        </div>
      </div>
    )
  }
}
