import { Translate } from 'components/common'
import React from 'react'
import css from './MyProfile.scss'

export default class MyProfile extends React.Component {
  render () {
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.myProfile' /></div>
          <div className={css.tabs}>
            <div className={[css.tab, css.tabActive].join(' ')}><Translate value='nav.validation' /></div>
            <div className={css.tab}><Translate value='nav.notifications' /></div>
            <div className={css.tab}><Translate value='nav.security' /></div>
          </div>
        </div>
        <div className={css.content}>
          <div>MyProfile page content</div>
        </div>
      </div>
    )
  }
}
