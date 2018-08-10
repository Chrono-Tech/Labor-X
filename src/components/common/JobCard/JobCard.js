import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import cn from 'classnames'
import pluralize from 'pluralize'
import get from "lodash/get"
import { JobModel, JOB_STATE_FINALIZED, BoardModel, JobNoticeModel, NOTICE_TYPE_PROBLEM, NOTICE_TYPE_MESSAGE, JobOfferModel } from 'src/models'
import { Link, Button } from 'src/components/common'
import css from './JobCard.scss'

const dateFormat = 'DD MMM YYYY'

export default class JobCard extends React.Component {
  static propTypes = {
    job: PropTypes.instanceOf(JobModel).isRequired,
    board: PropTypes.instanceOf(BoardModel),
    notice: PropTypes.instanceOf(JobNoticeModel),
    onClickReview: PropTypes.func,
    offers: PropTypes.arrayOf(JobOfferModel),
  }

  constructor (...args) {
    super(...args)
    this.handleReview = this.handleReview.bind(this)
  }

  handleReview () {
    this.props.onClickReview(this.props.job.id)
  }

  renderFooter ({ notice, applicantsCount }) {
    return (
      <div>
        {notice
          ? (
            <p className={css.report}>Client has reported an issue in the job log</p>
          ) : (
            <div className={css.applicantsOffers}>
              { ! applicantsCount ? <p> {pluralize('Applicant', 0, true)} </p> : (
                <p> {pluralize('Applicant', applicantsCount, true)} </p>
              ) }
              {/* {!job.extra.applicantsDelta ? null : (
                <Counter value={job.extra.applicantsDelta} />
              )}
              {!job.extra.offersCount ? null : (
                <p>{pluralize('Offers', job.extra.offersCount, true)} </p>
              )}
              {!job.extra.offersDelta ? null : (
                <Counter value={job.extra.offersDelta} />
              )} */}
            </div>
          )
        }
        <Button
          label='REVIEW'
          className={css.review}
          mods={Button.MODS.FLAT}
          onClick={this.handleReview}
        />
      </div>
    )
  }

  render () {
    const { job, board, notice, offers } = this.props

    return (
      <div
        className={cn(css.root, {
          [css.applied]: true,
          [css.approved]: true,
          [css.inProgress]: true,
          [css.attention]: notice && notice.type === NOTICE_TYPE_MESSAGE,
          [css.problem]: notice && notice.type === NOTICE_TYPE_PROBLEM,
        })}
      >
        <div>
          <img className={css.icon} src={get(board,"ipfs.logo") || '/static/temp/get-started.png'} alt='' />
          <p>{ get(board,"ipfs.name") || ""}</p>
        </div>
        <div className={css.jobInfo}>
          <Link className={css.jobName} href={`/client-job-view/${job.id}`}>
            <h4>{job.ipfs.name}</h4>
          </Link>
          <div className={css.jobDateAward}>
            {job.state !== JOB_STATE_FINALIZED ? null : (
              <p>Finalized at: {moment(job.extra.finalizedAt).format(dateFormat)}</p>
            )}
            {!(job.ipfs.budget.isSpecified && job.ipfs.budget.award) ? null : (
              <p>LHT { job.ipfs.budget.award.toFixed(2) } (${job.ipfs.budget.award.multipliedBy(30).toFixed(2)})</p>
            )}
          </div>
        </div>
        { this.renderFooter({ job, notice, applicantsCount: offers.length }) }
      </div>
    )
  }
}
