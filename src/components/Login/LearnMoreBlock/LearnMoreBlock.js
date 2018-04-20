import { Link } from 'components/common'
import React from 'react'
import PropTypes from 'prop-types'
import { bootstrap } from 'store/bootstrap'
import 'styles/globals/globals.scss'
import css from './LearnMoreBlock.scss'

export default class Index extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  }
  
  static defaultProps = {
    className: '',
  }
  
  render () {
    const { className } = this.props
    const classNames = [css.forNewUsersContent].concat(className)
    
    return (
      <div className={css.root}>
        <div className={classNames.join(' ')}>
          <h1>New to LaborX?</h1>
          <p className={css.text}>Learn more about our innovative solution for Recruiters, Workers and Clients</p>
          <Link className={css.learnMoreLink} href='/landing-page#learn-more'>
            Learn More
          </Link>
          <p className={css.createAccountBlock}>
            or <Link className={css.createAccountLink} href='/'>Create New Account</Link>
          </p>
        </div>
      </div>
    )
  }
}

