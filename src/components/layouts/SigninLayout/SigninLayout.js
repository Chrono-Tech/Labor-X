import React from 'react'
import PropTypes from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { Link } from 'components/common'
import { Footer } from 'components/layouts'
import { LearnMoreBlock } from 'components/Login'

import css from './SigninLayout.scss'

export default class SigninLayout extends React.Component {

  static propTypes = {
    backgroundImage: PropTypes.string,
    contentClassName: PropTypes.string,
    children: PropTypes.shape({}),
  }

  static defaultProps = {
    backgroundImage: '/static/images/laborx-login-hour.jpg',
  }

  render () {
    const { backgroundImage, contentClassName } = this.props
    const contentClassNames = [css.loginActionsContent].concat(contentClassName)
    return (
      <div className={css.root}>
        <div className={css.root2}>
          <div className={css.contentWrapper}>
            <Link href='/' className={css.logo}>
              <img src='/static/images/laborx-login-head.jpg' alt='' />
            </Link>
            <div className={css.loginActionsWrapper}>
              <div className={contentClassNames.join(' ')}>
                <div>
                  <ReactCSSTransitionGroup
                    transitionName='slides'
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={2000}
                    transitionAppear={false}
                    transitionEnter
                    transitionLeave={false}
                  >
                    <div className={css.componentWrapper}>{this.props.children}</div>
                  </ReactCSSTransitionGroup>
                </div>
              </div>
              <div className={css.learnMoreBlockWrapper}>
                <LearnMoreBlock />
              </div>
            </div>
            <img src={backgroundImage} className={css.backgroundImage} alt='' />
          </div>
          <Footer />
        </div>
      </div>
    )
  }

}
