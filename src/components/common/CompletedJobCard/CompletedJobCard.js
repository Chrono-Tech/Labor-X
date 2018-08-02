import React from 'react'
import PropTypes from 'prop-types'
import get from "lodash/get"
import moment from 'moment'
import { JOB_STATE_PENDING_FINISH, JOB_STATE_FINISHED, JOB_STATE_FINALIZED, JobModel } from 'src/models'
import { Link } from 'src/components/common'
import css from './CompletedJobCard.scss'

const dateFormat = 'DD MMM YYYY'
const courseUsdLhus = 18

export default class CompletedJobCard extends React.Component {
  static propTypes = {
    job: PropTypes.instanceOf(JobModel).isRequired,
  }

  constructor (...args) {
    super(...args)
  }

  getWorkedHourse = (job) => {
    const jobStateIndex = get(job, "state.index")
    const startTime = moment(get(job, "extra.startTime"))
    if (jobStateIndex === JOB_STATE_FINISHED.index) {
      const endTime = moment(get(job, "extra.finishTime"))
      const duration = moment.duration(endTime.diff(startTime))
      return duration.asHours().toFixed(1) + "h"
    }
    if (jobStateIndex === JOB_STATE_FINALIZED.index) {
      const endTime = moment(get(job, "extra.finalizedAt"))
      const duration = moment.duration(endTime.diff(startTime))
      return duration.asHours().toFixed(1) + "h"
    }
    if (jobStateIndex === JOB_STATE_PENDING_FINISH.index) {
      const endTime = moment(get(job, "extra.pendingFinishAt"))
      const duration = moment.duration(endTime.diff(startTime))
      return duration.asHours().toFixed(1) + "h"
    }
    return " "
  }

  getTotalHours = (job) => {
    const fixedPrice = get(job, "ipfs.budget.fixedPrice")
    const totalHours = get(job, "ipfs.budget.totalHours")
    if (fixedPrice)
    {return " "}
    else
    {return `${totalHours}h`}
  }

  getJobLhus = (job) => {
    const fixedPrice = get(job, "ipfs.budget.fixedPrice")
    if (fixedPrice) {
      return fixedPrice
    } else {
      const hourlyRate = Number(get(job, "ipfs.budget.hourlyRate"))
      const totalHours = Number(get(job, "ipfs.budget.totalHours"))
      return hourlyRate * totalHours
    }
  }

  renderStateLabel = (jobState) => {
    if (!jobState) return null
    if (jobState.index === JOB_STATE_FINISHED.index) return <div className={css.completedLabel}>COMPLETED</div>
    if (jobState.index === JOB_STATE_FINALIZED.index) return <div className={css.finalizedLabel}>FINALIZED</div>
    if (jobState.index === JOB_STATE_PENDING_FINISH.index) return <div className={css.invoiceSentLabel}>INVOICE SENT</div>
  }

  renderFooter = (job) => {
    return (
      <div className={css.cardFooter}>
        {this.renderStateLabel(job.state)}
        <img width='24' height='24' alt='' title='Message' src='/static/images/svg/message-blue.svg' />
      </div>
    )
  }

  renderJobDate = (job) => {
    if (job.state.index === JOB_STATE_FINISHED.index) return moment(get(job, "extra.finishTime")).format(dateFormat)
    if (job.state.index === JOB_STATE_FINALIZED.index) return moment(get(job, "extra.finalizedAt")).format(dateFormat)
    if (job.state.index === JOB_STATE_PENDING_FINISH.index) return moment(get(job, "extra.pendingFinishAt")).format(dateFormat)
    return "Not found"
  }

  renderHours = (job) => {
    const fixedPrice = get(job, "ipfs.budget.fixedPrice")
    if (fixedPrice) {
      return " "
    } else {
      return this.getWorkedHourse(job) + " / " + this.getTotalHours(job)
    }
  }

  render () {
    const { job } = this.props
    const workCostLhus = this.getJobLhus(job)
    const workCostUsd = workCostLhus * courseUsdLhus
    return (
      <div
        className={css.root}
      >
        <div className={css.cardInfo}>
          <Link className={css.cardDate} href={`/client-job-view/${job.id}`}>
            <h4> {this.renderJobDate(job)}  </h4>
          </Link>
          <div className={css.cardName}>
            {get(job, "ipfs.name")}
          </div>
          <div className={css.cardWorkingHourse}>
            {this.renderHours(job)}
          </div>
          <div className={css.cardCostPayment}>
            LHUS {workCostLhus} (${workCostUsd})
          </div>
        </div>
        {this.renderFooter(job)}
      </div>
    )
  }
}
