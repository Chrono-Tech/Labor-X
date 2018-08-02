import React from 'react'
import { Link } from 'components/common'

import { Footer } from 'components/layouts'
import { LearnMoreBlock } from 'components/Login'

import css from './SigninLayout.scss'

export default (props) => (
  <div className={css.root}>
    <div className={css.root2}>
      <div className={css.contentWrapper}>
        <Link href='/' className={css.logo}>
          <img src='/static/images/laborx-login-head.jpg' alt='' />
        </Link>
        <div className={css.loginActionsWrapper}>
          <div className={css.loginActionsContent}>
            <div className={css.formHeader}>{props.title}</div>
            <p className={css.subtitle}>{props.subtitle}</p>
            {props.children}
          </div>
          <div className={css.learnMoreBlockWrapper}>
            <LearnMoreBlock />
          </div>
        </div>
        <img src='/static/images/laborx-login-hour.jpg' className={css.backgroundImage} alt='' />
      </div>
      <Footer />
    </div>
  </div>
)