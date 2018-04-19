import { Translate } from 'components/common'
import React from 'react'
import css from './Saved.scss'

export default class Saved extends React.Component {
  render () {
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.saved' /></div>
        </div>
        <div className={css.content}>
          <div>Saved page content</div>
        </div>
      </div>
    )
  }
}
