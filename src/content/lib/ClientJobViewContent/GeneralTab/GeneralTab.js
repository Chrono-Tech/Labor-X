import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { JobModel } from 'src/models'

import css from './GeneralTab.scss'

const dateFormat = 'DD MMM, YYYY'

export default class GeneralTab extends React.Component {
  static propTypes = {
    job: PropTypes.instanceOf(JobModel).isRequired,
  }

  render () {

    const { job } = this.props

    return (
      <div className={css.rootContainer}>
        <div className={css.generalDataContainer}>
          <div className={css.dataRow}>
            <h3>Starts at:</h3>
            <span className={css.dataText}>{moment(job.ipfs.period.since).format(dateFormat)}</span>
          </div>
          <div className={css.dataRow}>
            <h3>Deadline:</h3>
            <span className={css.dataText}>{moment(job.ipfs.period.until).format(dateFormat)}</span>
          </div>
          {job.ipfs.budget.isSpecified && <div className={css.dataRow}>
            <h3>Hours:</h3>
            <span className={css.dataText}>{job.ipfs.budget.totalHours}</span>
          </div>}
          {job.ipfs.budget.isSpecified && <div className={css.dataRow}>
            <h3>Est. Budget:</h3>
            <span className={css.dataText}>{`LHUS ${job.ipfs.budget.award.toString()} (${job.ipfs.budget.awardUSD.toString()})`}</span>
          </div>}
        </div>
      </div>
    )
  }
}
