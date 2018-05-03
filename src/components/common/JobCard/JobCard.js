import React from 'react'
import { Link, Counter } from 'components/common'
import PropTypes from 'prop-types'
import css from './JobCard.scss'

const STATUSES = {
  IN_PROGRESS: 'inProgress',
  ERROR: 'error',
  DONE: 'done',
  PENDING: 'pending',
}

export default class JobCard extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    jobName: PropTypes.string.isRequired,
    award: PropTypes.number.isRequired,
    applicants: PropTypes.number,
    applicantsNew: PropTypes.number,
    offers: PropTypes.number,
    offersNew: PropTypes.number,
    date: PropTypes.instanceOf(Date).isRequired,
    status: PropTypes.oneOf(Object.values(STATUSES)).isRequired,
    icon: PropTypes.string,
  }

  static STATUSES = STATUSES

  constructor (props, context){
    super(props, context)
    this.dateDescStr = this.dateDescStr.bind(this)
  }

  dateDescStr () {
    return this.props.status === STATUSES.DONE || this.props.status === STATUSES.ERROR ? 'Completed' : 'Starts at'
  }

  render () {
    return (
      <div className={[css.root, css[this.props.status]].join(' ')}>
        <div>
          { this.props.icon && <img className={css.icon} src={this.props.icon} alt='' /> }
          <p>{ this.props.title }</p>
        </div>
        <div className={css.jobInfo}>
          <Link className={css.jobName} href='/client-job'><h4>{this.props.jobName}</h4></Link>
          <div className={css.jobDateAward}>
            <p>{`${this.dateDescStr()}: `}{ this.props.date.toLocaleDateString('en') }</p>
            <p>LHUS { this.props.award.toFixed(2) } (${(this.props.award * 30).toFixed(2)})</p>
          </div>
        </div>
        <div>
          { this.props.status === STATUSES.ERROR ?
            <p className={css.report}>Client has reported an issue in the job log</p> :
            <div className={css.applicantsOffers}>
              {this.props.applicants && <p>{this.props.applicants} Applicants</p>}
              {this.props.applicantsNew && <Counter value={this.props.applicantsNew} />}
              {this.props.offers && <p>{this.props.offers} Offers</p>}
              {this.props.offersNew && <Counter value={this.props.offersNew} />}
            </div>
          }
          <Link className={css.review} href='/client-job'><p>REVIEW</p></Link>
        </div>
      </div>
    )
  }
}
