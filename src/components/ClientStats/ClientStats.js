import { Translate } from 'components/common'
import React from 'react'
import css from './ClientStats.scss'

export default class ClientStats extends React.Component {
  render () {
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.clientStats' /></div>
        </div>
        <div className={css.content}>
          <div>ClientStats page content</div>
        </div>
      </div>
    )
  }
}
