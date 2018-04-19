import { Translate } from 'components/common'
import React from 'react'
import css from './Opportunities.scss'

export default class Opportunities extends React.Component {
  render () {
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.opportunities' /></div>
        </div>
        <div className={css.content}>
          <div>Opportunities page content</div>
        </div>
      </div>
    )
  }
}
