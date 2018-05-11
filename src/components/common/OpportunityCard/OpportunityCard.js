import React from 'react'
import { Link } from 'components/common'
import PropTypes from 'prop-types'
import css from './OpportunityCard.scss'

export default class JobCard extends React.Component {
  static propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    jobName: PropTypes.string.isRequired,
    payTotal: PropTypes.number.isRequired,
    payHour: PropTypes.number.isRequired,
  }

  render () {
    return (
      <div className={css.root}>
        <div>
          { this.props.icon && <img className={css.icon} src={this.props.icon} alt='' /> }
          <p>{ this.props.title }</p>
        </div>
        <div className={css.jobInfo}>
          <Link className={css.jobName} href='/opportunity-view'><h4>{this.props.jobName}</h4></Link>
          <div className={css.jobPay}>
            <p>LHUS { this.props.payHour.toFixed(2) } (${(this.props.payHour * 30).toFixed(2)}) / h</p>
            <p>LHUS { this.props.payTotal.toFixed(2) } (${(this.props.payTotal * 30).toFixed(2)})</p>
          </div>
        </div>
      </div>
    )
  }
}
