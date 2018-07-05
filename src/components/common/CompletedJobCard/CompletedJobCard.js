import React from 'react'
import PropTypes from 'prop-types'

import { JobModel } from 'src/models'
import { Link } from 'src/components/common'
import { JOB_STATE_PENDING_FINISH, JOB_STATE_FINISHED, JOB_STATE_FINALIZED } from 'src/models'
import css from './CompletedJobCard.scss'

const dateFormat = 'DD MMM YYYY'

export default class CompletedJobCard extends React.Component {
  static propTypes = {
    job: PropTypes.instanceOf(JobModel).isRequired,
  }

  constructor(...args) {
    super(...args)
  }

  handleClickReview = () => {
    this.props.onClickReviewOffer(this.props.job.id)
  }

  renderStateLabel = (jobState) => {
    if (!jobState)
      return null;
    if (jobState.index === JOB_STATE_FINISHED.index)
      return <div className={css.completedLabel}>COMPLETED</div>
    if (jobState.index === JOB_STATE_FINALIZED.index)
      return <div className={css.finalizedLabel}>FINALIZED</div>
    if (jobState.index === JOB_STATE_PENDING_FINISH.index)
      return <div className={css.invoiceSentLabel}>INVOICE SENT</div>
  }

  renderFooter = () => {
    const { job } = this.props
    return (
      <div className={css.cardFooter}>
        {this.renderStateLabel(job.state)}
        <img  width="24" height="24" alt="" title="Message"  src="/static/images/svg/message-blue.svg" />
      </div>
    )
  }

  render() {
    const { job } = this.props
    return (
      <div
        className={css.root}
      >
        <div className={css.cardInfo}>
          <Link className={css.cardName} href={`/client-job-view/${job.id}`}>
            <h4>job.ipfs.name</h4>
          </Link>
          <div className={css.cardDate}>
          Install 10 Gas Ovens
          </div>
          <div className={css.cardWorkingHourse}>
          38h/ 40h
          </div>
          <div className={css.cardCostPayment}>
          LHUS 76.25 ($3,050.00)
          </div>
        </div>
        {this.renderFooter()}
      </div>
    )
  }
}
