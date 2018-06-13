import { Translate } from 'components/common'
import React from 'react'
import css from './ApplicationsAndOffers.scss'

export default class ApplicationsAndOffers extends React.Component {
  render () {
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.applicationsAndOffers' /></div>
        </div>
        <div className={css.content}>
          <div>ApplicationsAndOffers page content</div>
        </div>
      </div>
    )
  }
}
