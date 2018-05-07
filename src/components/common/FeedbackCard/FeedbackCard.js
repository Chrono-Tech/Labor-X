import React from 'react'
import { Link } from 'components/common'
import PropTypes from 'prop-types'
import css from './FeedbackCard.scss'

export default class FeedbackCard extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    jobName: PropTypes.string.isRequired,
    jobIcon: PropTypes.string,
    recruiterName: PropTypes.string.isRequired,
    recruiterIcon: PropTypes.string,
  }

  render () {
    return (
      <div className={css.root}>
        <div className={css.title}>
          <p className={css.link}>{ this.props.title }</p>
        </div>
        <div className={css.content}>
          <div className={css.iconAndName}>
            { this.props.jobIcon && <img className={css.icon} src={this.props.jobIcon} alt='' /> }
            <Link className={css.link} href='/worker-profile'><p>{ this.props.jobName }</p></Link>
          </div>
          <div className={css.iconAndName}>
            { this.props.recruiterIcon && <img className={css.icon} src={this.props.recruiterIcon} alt='' /> }
            <Link className={css.link} href='/worker-profile'><p>{ this.props.recruiterName }</p></Link>
          </div>
          <Link className={css.go} href='/worker-profile'><p>GO!</p></Link>
        </div>
      </div>
    )
  }
}
