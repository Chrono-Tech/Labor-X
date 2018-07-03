import React from "react";
import { Link } from "src/routes";

import UserCreate from './UserCreate'
import MnemonicCreate from './MnemonicCreate'
import MnemonicSubmit from './MnemonicSubmit'
import MnemonicFinish from './MnemonicFinish'

import css from './index.scss'

const STEP = {
  USER_CREATE: 'USER_CREATE',
  MNEMONIC_CREATE: 'MNEMONIC_CREATE',
  MNEMONIC_SUBMIT: 'MNEMONIC_SUBMIT',
  MNEMONIC_FINISH: 'MNEMONIC_FINISH',
}

const STEP_COMPONENT = {
  [STEP.USER_CREATE]: UserCreate,
  [STEP.MNEMONIC_CREATE]: MnemonicCreate,
  [STEP.MNEMONIC_SUBMIT]: MnemonicSubmit,
  [STEP.MNEMONIC_FINISH]: MnemonicFinish,
}

export default class CreateAccountContent extends React.Component {

  constructor () {
    super()
    this.state = { step: STEP.USER_CREATE }
  }

  render () {

    const { contentClassName, title } = this.props

    const contentClassNames = [css.main].concat(contentClassName)

    return (
      <div className={css.root}>
        <div className={css.contentWrapper}>
          <div className={css.header}>
            <div className={css.headerInner}>
              <Link href='/'>
                <img src='/static/images/svg/laborx-white.svg' alt='' />
              </Link>
            </div>
          </div>
          <div className={css.topSection}>
            <div className={css.topSectionBlock}>
              <button className={css.backLink}>
                <img src='/static/images/svg/back.svg' alt='' />
              </button>
              <Link href='/' className={css.helpLink}>
                <img src='/static/images/svg/help-white.svg' alt='' />
              </Link>
              <h1>title</h1>
            </div>
          </div>
          <div ref='pagesWrapper' className={contentClassNames.join(' ')}>
            {/*<ReactCSSTransitionGroup*/}
              {/*transitionName='slides'*/}
              {/*transitionEnterTimeout={1000}*/}
              {/*transitionLeaveTimeout={2000}*/}
              {/*transitionAppear={false}*/}
              {/*transitionEnter*/}
              {/*transitionLeave={false}*/}
            {/*>*/}
              {/*{ this.renderChildren() }*/}
            {/*</ReactCSSTransitionGroup>*/}
          </div>
          <Link href='/' className={css.footerLogo}>
            <img src='/static/images/svg/laborx-caption.svg' alt='' />
          </Link>
        </div>
      </div>
    )
  }

}