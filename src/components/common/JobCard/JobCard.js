import React from 'react'
import { Link, Counter } from 'components/common'
import PropTypes from 'prop-types'
import moment from 'moment'
import css from './JobCard.scss'

const STATUSES = {
  APPLIED: 'applied',
  IN_PROGRESS: 'inProgress',
  APPROVED: 'approved',
  PROBLEM: 'problem',
  ATTENTION: 'attention',
}

const dateFormat = 'DD MMM YYYY'

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

  dateDescStr (status) {
    return status === STATUSES.DONE || status === STATUSES.ERROR ? 'Completed' : 'Starts at'
  }

  render () {
    const { status, icon, title, jobName, award, date, applicants, applicantsNew, offers, offersNew } = this.props

    return (
      <div className={[css.root, css[status]].join(' ')}>
        <div>
          { icon && <img className={css.icon} src={icon} alt='' /> }
          <p>{ title }</p>
        </div>
        <div className={css.jobInfo}>
          <Link className={css.jobName} href='/client-job'><h4>{jobName}</h4></Link>
          <div className={css.jobDateAward}>
            <p>{`${this.dateDescStr(status)}: `}{ moment(date).format(dateFormat) }</p>
            <p>LHUS { award.toFixed(2) } (${(award * 30).toFixed(2)})</p>
          </div>
        </div>
        <div>
          { status === STATUSES.PROBLEM ?
            <p className={css.report}>Client has reported an issue in the job log</p> :
            <div className={css.applicantsOffers}>
              {applicants && <p>{applicants} Applicants</p>}
              {applicantsNew && <Counter value={applicantsNew} />}
              {offers && <p>{offers} Offers</p>}
              {offersNew && <Counter value={offersNew} />}
            </div>
          }
          <Link className={css.review} href='/client-job'><p>REVIEW</p></Link>
        </div>
      </div>
    )
  }
}
