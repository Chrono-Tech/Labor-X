import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import t from "typy"
import moment from 'moment'
import { JOB_STATE_PENDING_FINISH, JOB_STATE_FINISHED, JOB_STATE_FINALIZED, JobModel } from 'src/models'
import { Link } from 'src/components/common'
import Button from '@material-ui/core/Button'
import css from './CompletedJobCard.scss'

import { releasePaymentAndWithdraw } from "../../../store/completedJobs/actions"

const dateFormat = 'DD MMM YYYY'
const courseUsdLhus = 18

export class CompletedJobCard extends React.Component {
  static propTypes = {
    job: PropTypes.instanceOf(JobModel).isRequired,
    releasePaymentAndWithdraw: PropTypes.func,
  }

  constructor (...args) {
    super(...args)
  }

  handleReleasePaymentAndWithdraw = () => {
    this.props.releasePaymentAndWithdraw()
  }

  getWorkedHourse = (job) => {
    const jobStateIndex = t(job, "state.index").safeObject
    const startTime = moment(t(job, "extra.startTime").safeObject)
    if (jobStateIndex === JOB_STATE_FINISHED.index) {
      const endTime = moment(t(job, "extra.finishTime").safeObject)
      const duration = moment.duration(endTime.diff(startTime))
      return duration.asHours().toFixed(1) + "h"
    }
    if (jobStateIndex === JOB_STATE_FINALIZED.index) {
      const endTime = moment(t(job, "extra.finalizedAt").safeObject)
      const duration = moment.duration(endTime.diff(startTime))
      return duration.asHours().toFixed(1) + "h"
    }
    if (jobStateIndex === JOB_STATE_PENDING_FINISH.index) {
      const endTime = moment(t(job, "extra.pendingFinishAt").safeObject)
      const duration = moment.duration(endTime.diff(startTime))
      return duration.asHours().toFixed(1) + "h"
    }
    return " "
  }

  getTotalHours = (job) => {
    const fixedPrice = t(job, "ipfs.budget.fixedPrice").safeObject
    const totalHours = t(job, "ipfs.budget.totalHours").safeObject
    if (fixedPrice)
    {return " "}
    else
    {return `${totalHours}h`}
  }

  getJobLhus = (job) => {
    const fixedPrice = t(job, "ipfs.budget.fixedPrice").safeObject
    if (fixedPrice)
    {return fixedPrice}
    else {
      const hourlyRate = Number(t(job, "ipfs.budget.hourlyRate").safeObject)
      const totalHours = Number(t(job, "ipfs.budget.totalHours").safeObject)
      return hourlyRate * totalHours
    }
  }

  renderStateLabel = (jobState) => {
    if (!jobState)
    {return null}
    if (jobState.index === JOB_STATE_FINISHED.index)
    {return <div className={css.completedLabel}>COMPLETED</div>}
    if (jobState.index === JOB_STATE_FINALIZED.index)
    {return <div className={css.finalizedLabel}>FINALIZED</div>}
    if (jobState.index === JOB_STATE_PENDING_FINISH.index)
    {return <div className={css.invoiceSentLabel}>INVOICE SENT</div>}
  }

  renderFooter = (job) => {
    return (
      <div className={css.cardFooter}>
        {this.renderStateLabel(job.state)}
        {/*{ job.state === JOB_STATE_FINISHED ? <Button onClick={this.handleReleasePaymentAndWithdraw}>Release payment & withdraw</Button> : null }*/}
        <Button onClick={this.handleReleasePaymentAndWithdraw}>Release payment & withdraw</Button>
        <img width='24' height='24' alt='' title='Message' src='/static/images/svg/message-blue.svg' />
      </div>
    )
  }

  renderJobDate = (job) => {
    if (job.state.index === JOB_STATE_FINISHED.index)
    {return moment(t(job, "extra.finishTime").safeObject).format(dateFormat)}
    if (job.state.index === JOB_STATE_FINALIZED.index)
    {return moment(t(job, "extra.finalizedAt").safeObject).format(dateFormat)}
    if (job.state.index === JOB_STATE_PENDING_FINISH.index)
    {return moment(t(job, "extra.pendingFinishAt").safeObject).format(dateFormat)}
    return "Not found"
  }

  renderHours = (job) => {
    const fixedPrice = t(job, "ipfs.budget.fixedPrice").safeObject
    if (fixedPrice)
    {return " "}
    else
    {return this.getWorkedHourse(job) + " / " + this.getTotalHours(job)}
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
            {t(job, "ipfs.name").safeObject}
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

const mapDispatchToProps = (dispatch, ownProps) => ({
  releasePaymentAndWithdraw: () => dispatch(releasePaymentAndWithdraw(ownProps.job.id)),
})

export default connect(null, mapDispatchToProps)(CompletedJobCard)
