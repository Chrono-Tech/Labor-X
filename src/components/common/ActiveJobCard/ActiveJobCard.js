import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link, Image } from 'src/components/common'
import { lhsToUsd } from 'src/utils'
import css from './ActiveJobCard.scss'

const STATUSES = {
  APPLIED: 'applied',
  IN_PROGRESS: 'inProgress',
  APPROVED: 'approved',
  PROBLEM: 'problem',
  ATTENTION: 'attention',
}

const dateFormat = 'h:mm A'

export default class ActiveJobCard extends React.Component {
  static propTypes = {
    jobName: PropTypes.string.isRequired,
    workerName: PropTypes.string.isRequired,
    workerIcon: PropTypes.string.isRequired,
    recruiterName: PropTypes.string.isRequired,
    recruiterIcon: PropTypes.string.isRequired,
    workedTime: PropTypes.number.isRequired,
    hourlyRate: PropTypes.number,
    totalHours: PropTypes.number,
    startDate: PropTypes.instanceOf(Date),
    status: PropTypes.oneOf(Object.values(STATUSES)).isRequired,
  }

  static STATUSES = STATUSES

  handleMessage () {
    // eslint-disable-next-line no-console
    console.log('ActionJobCard-handleMessage')
  }

  render () {
    const { jobName, workerName, workerIcon, recruiterName, recruiterIcon, workedTime, hourlyRate, totalHours, status, startDate } = this.props
    const workedTimeHours = moment.duration(workedTime, 'seconds').asHours()
    const award = hourlyRate * totalHours
    const awardWorked = hourlyRate * workedTimeHours

    return (
      <div className={[css.root, css[status]].join(' ')}>
        <div className={css.rowInfo}>
          <h4>{moment(startDate).format(dateFormat)}</h4>
          <h4 className={css.medium}>{ jobName }</h4>
          <div className={css.jobAwardRow}>
            <p>{ awardWorked.toFixed(2) } / LHUS { award }</p>
            <p>${lhsToUsd(awardWorked).toFixed(2)} / ${lhsToUsd(award).toFixed(2)}</p>
          </div>
        </div>
        <div>
          <div className={css.iconAndName}>
            { workerIcon && <img className={css.icon} src={workerIcon} alt='' /> }
            <Link className={css.link} href='/worker-profile'><p>{ workerName } (Worker)</p></Link>
          </div>
          <div className={css.iconAndName}>
            { recruiterIcon && <img className={css.icon} src={recruiterIcon} alt='' /> }
            <Link className={css.link} href='/recruiter-profile'><p>{ recruiterName } (Recruiter)</p></Link>
          </div>
          <Link className={css.review} href='/client-job'><p>REVIEW</p></Link>
          <Image
            clickable
            className={css.actionButton}
            title='Message'
            icon={Image.ICONS.MESSAGE}
            onClick={this.handleMessage}
          />
        </div>
      </div>
    )
  }
}
