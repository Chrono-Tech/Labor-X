import React from 'react'
import { goBack } from 'connected-react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { Link } from 'components/common'
import 'styles/globals/globals.scss'
import css from './SignupLayout.scss'

export class SignupLayout extends React.Component {

  static propTypes = {
    goBack: PropTypes.func.isRequired,
  }

  render () {
    const { contentClassName } = this.props

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
              <button onClick={this.props.goBack} className={css.backLink} >
                <img src='/static/images/svg/back.svg' alt='' />
              </button>
              <Link href='/' className={css.helpLink}>
                <img src='/static/images/svg/help-white.svg' alt='' />
              </Link>
              <h1>Create New Account</h1>
            </div>
          </div>
          <div ref='pagesWrapper' className={contentClassNames.join(' ')}>
            <ReactCSSTransitionGroup
              transitionName='slides'
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={2000}
              transitionAppear={false}
              transitionEnter
              transitionLeave={false}
            >
              <div>{this.props.children}</div>
            </ReactCSSTransitionGroup>
          </div>
          <Link href='/' className={css.footerLogo}>
            <img src='/static/images/svg/laborx-caption.svg' alt='' />
          </Link>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({ goBack: () => dispatch(goBack()) })

export default connect(null, mapDispatchToProps)(SignupLayout)