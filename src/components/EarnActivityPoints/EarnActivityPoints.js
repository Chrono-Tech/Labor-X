import { Translate } from 'components/common'
import React from 'react'
import css from './EarnActivityPoints.scss'

export default class EarnActivityPoints extends React.Component {
  render () {
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.earnActivityPoints' /></div>
        </div>
        <div className={css.content}>
          <div>EarnActivityPoints page content</div>
        </div>
      </div>
    )
  }
}
