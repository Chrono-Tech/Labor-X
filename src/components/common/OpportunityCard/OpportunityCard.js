import React from 'react'
import t from "typy"
import { JobModel, BoardModel } from 'src/models'
import { Link } from 'src/components/common'
import PropTypes from 'prop-types'
import css from './OpportunityCard.scss'

const courseUsdLhus = 18

export default class OpportunityCard extends React.Component {
  static propTypes = {
    job: PropTypes.instanceOf(JobModel).isRequired,
    board: PropTypes.instanceOf(BoardModel),
  }

  getJobLhus = (job) => {
    const fixedPrice = t(job, "ipfs.budget.fixedPrice").safeObject
    if (fixedPrice) { return fixedPrice }
    else {
      const hourlyRate = Number(t(job, "ipfs.budget.hourlyRate").safeObject)
      const totalHours = Number(t(job, "ipfs.budget.totalHours").safeObject)
      return hourlyRate * totalHours
    }
  }

  renderTotalHours = (job) => {
    const fixedPrice = t(job, "ipfs.budget.fixedPrice").safeObject
    const totalHours = t(job, "ipfs.budget.totalHours").safeObject
    if (fixedPrice)
    {return " "}
    else
    {return `${totalHours}h`}
  }

  renderJobTotalEarning = (job) => {
    const totalEarningLhus = this.getJobLhus(job)
    const totalEarningUsd = totalEarningLhus * courseUsdLhus
    return `LHUS ${totalEarningLhus} ($${totalEarningUsd})`
  }

  renderJobHourlyRate = (job) => {
    const fixedPrice = t(job, "ipfs.budget.fixedPrice").safeObject
    if (fixedPrice) {
      return ""
    }
    else {
      const hourlyRateLhus = Number(t(job, "ipfs.budget.hourlyRate").safeObject)
      const hourlyRateUsd = hourlyRateLhus * courseUsdLhus
      return `LHUS ${hourlyRateLhus} ($${hourlyRateUsd}) / h`
    }

  }

  render () {
    const { job, board } = this.props
    return (
      <div className={css.root}>
        {board
          ? (
            <div>
              {!board.ipfs.logo ? <img className={css.icon} src='/static/temp/get-started.png' alt='' /> : (
                <img className={css.icon} src={board.ipfs.logo} alt={board.ipfs.name} />
              )}
              <p>{board.ipfs.name}</p>
            </div>
          )
          : (
            <div>
              <img className={css.icon} src='/static/temp/get-started.png' alt='' />
              <p>No Board</p>
            </div>
          )
        }
        <div className={css.jobInfo}>
          <Link className={css.jobName} href={`/opportunity-view/${job.id}`}><h4>{job.ipfs.name}</h4></Link>
          {!(job.ipfs.budget.isSpecified && job.ipfs.budget.award) ? null : (
            <div className={css.jobPay}>
              <p>{this.renderTotalHours(job)}</p>
              <p>{this.renderJobHourlyRate(job)}</p>
              <p>{this.renderJobTotalEarning(job)}</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}
