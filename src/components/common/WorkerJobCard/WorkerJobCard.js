import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { JobModel, BoardModel } from 'src/models'
import { Link, Button, Tip } from 'src/components/common'
import css from './WorkerJobCard.scss'

const dateFormat = 'DD MMM YYYY'

export default class WorkerJobCard extends React.Component {
  static propTypes = {
    job: PropTypes.instanceOf(JobModel).isRequired,
    board: PropTypes.instanceOf(BoardModel),
    notice: PropTypes.shape({
      label: PropTypes.string,
      description: PropTypes.string,
      date: PropTypes.instanceOf(Date),
    }),
    onClickReview: PropTypes.func,
    onClickReviewOffer: PropTypes.func,
    onClickDismiss: PropTypes.func,
  }

  constructor (...args) {
    super(...args)
    this.handleReview = this.handleReview.bind(this)
  }

  handleReview () {
    this.props.onClickReview(this.props.job.id)
  }

  renderFooter = () => {
    const { notice, onClickReview, onClickReviewOffer, onClickDismiss } = this.props
    return (
      <div>
        { !notice ? null : (
          <Tip
            position={Tip.POSITION.LEFT}
            tipContent={(
              <div>
                <div className={css.tipTitle}>{moment().diff(notice.date, 'days') > 0 ? moment(notice.date).format(dateFormat) : moment(notice.date).fromNow()}</div>
                <p>{notice.description}</p>
              </div>
            )}
          >
            <div className={css.notice}>{notice.label}</div>
          </Tip>
        )}
        { onClickReview && (
          <Button
            label='REVIEW'
            className={css.blueAction}
            mods={Button.MODS.FLAT}
            onClick={onClickReview}
          />
        )}
        { onClickReviewOffer && (
          <Button
            label='REVIEW OFFER'
            labelClassName={css.actionLable}
            className={css.blueAction}
            mods={Button.MODS.FLAT}
            onClick={onClickReviewOffer}
          />
        )}
        { onClickDismiss && (
          <Button
            label='DISMISS APPLICATION'
            labelClassName={css.actionLable}
            className={css.redAction}
            mods={Button.MODS.FLAT}
            onClick={onClickDismiss}
          />
        )}
      </div>
    )
  }

  render () {
    const { job, board, notice } = this.props
    return (
      <div
        className={css.root}
      >
        {board
          ? (
            <div>
              {!board.ipfs.logo ? null : (
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
          <Link className={css.jobName} href={`/client-job-view/${job.id}`}>
            <h4>{job.ipfs.name}</h4>
          </Link>
          <div className={css.jobDateAward}>
            {!(job.ipfs.budget.isSpecified && job.ipfs.budget.hourlyRateAward) ? null : (
              <p>LHUS { job.ipfs.budget.hourlyRateAward.toFixed(2) } (${job.ipfs.budget.hourlyRateAwardUSD.toFixed(2)}) / h</p>
            )}
            {!(job.ipfs.budget.isSpecified && job.ipfs.budget.award) ? null : (
              <p>LHUS { job.ipfs.budget.award.toFixed(2) } (${job.ipfs.budget.awardUSD.toFixed(2)})</p>
            )}
          </div>
        </div>
        {this.renderFooter(notice)}
      </div>
    )
  }
}
