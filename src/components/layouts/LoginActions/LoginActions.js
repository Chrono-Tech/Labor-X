import { Link } from 'components/common'
import { LoginLayout, Footer } from 'components/layouts'
import { LoginOptions, LearnMoreBlock } from 'components/Login'
import React from 'react'
import PropTypes from 'prop-types'
import { bootstrap } from 'store/bootstrap'
import 'styles/globals/globals.scss'
import css from './LoginActions.scss'

export default class LoginActions extends React.Component {
  static propTypes = {
    backgroundImage: PropTypes.string,
  }
  
  static defaultProps = {
    backgroundImage: '/static/images/laborx-login-hour.jpg',
  }
  
  render () {
    const { backgroundImage, contentClassName } = this.props
    const contentClassNames = [css.loginActionsContent].concat(contentClassName)
    
    return (
      <div className={css.root}>
        <div className={css.contentWrapper}>
          <Link href='/' className={css.logo}>
            <img src='/static/images/laborx-login-head.jpg' alt='' />
          </Link>
          <div className={css.loginActionsWrapper}>
            <div className={contentClassNames.join(' ')}>
              {this.props.children}
            </div>
            <LearnMoreBlock />
          </div>
          <img src={backgroundImage} className={css.backgroundImage} alt='' />
        </div>
        <Footer />
      </div>
    )
  }
}
