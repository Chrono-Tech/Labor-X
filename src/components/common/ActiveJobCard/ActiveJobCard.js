import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import cn from 'classnames'
import { Link, Button } from 'src/components/common'
import { JobModel, BoardModel, ProfileModel, JobNoticeModel, JOB_STATE_FINISHED, JOB_STATE_PENDING_START/*, NOTICE_TYPE_PROBLEM, NOTICE_TYPE_MESSAGE */ } from 'src/models'

import css from './ActiveJobCard.scss'
import { confirmStartWork } from "../../../store"

const dateFormat = 'h:mm A'

class ActiveJobCard extends React.Component {
  static propTypes = {
    job: PropTypes.instanceOf(JobModel).isRequired,
    board: PropTypes.instanceOf(BoardModel),
    notice: PropTypes.instanceOf(JobNoticeModel),
    worker: PropTypes.instanceOf(ProfileModel),
    recruiter: PropTypes.instanceOf(ProfileModel),
    onClickReview: PropTypes.func,
    confirmStartWork: PropTypes.func,
  }

  constructor (...args) {
    super(...args)
    this.handleReview = this.handleReview.bind(this)
  }

  handleReview () {
    this.props.onClickReview(this.props.job, this.props.worker)
  }

  handleMessage () {
    // eslint-disable-next-line no-console
    console.log('ActionJobCard-handleMessage')
  }

  handleConfirmStartWork = () => {
    this.props.confirmStartWork()
  }

  render () {
    const { job, worker, recruiter/*, board*/ } = this.props

    return (
      <div
        className={cn(css.root, {
          'applied': true,
          [css.approved]: true,
          [css.inProgress]: true,
          // [css.attention]: notice && notice.type === NOTICE_TYPE_MESSAGE,
          // [css.problem]: notice && notice.type === NOTICE_TYPE_PROBLEM,
        })}
      >
        <div className={css.rowInfo}>
          <h4>{moment(job.extra.startedAt).format(dateFormat)}</h4>
          <h4 className={css.medium}>{ job.ipfs.name }</h4>
          {/*{!(job.ipfs.budget.isSpecified && job.ipfs.budget.award) ? null : (*/}
          {/*<div className={css.jobAwardRow}>*/}
          {/*<p>{job.ipfs.budget.award.dividedBy(3).toFixed(2)} / LHUS {job.ipfs.budget.award.toFixed(2)}</p>*/}
          {/*<p>{job.ipfs.budget.award.dividedBy(3).multipliedBy(30).toFixed(2)} / USD {job.ipfs.budget.award.multipliedBy(30).toFixed(2)}</p>*/}
          {/*</div>*/}
          {/*)}*/}
          { job.ipfs.budget ? (
            <div className={css.jobAwardRow}>
              <p>LHT { job.ipfs.budget.hourlyRate } / { job.ipfs.budget.totalHours }</p>
              <p>USD { job.ipfs.budget.hourlyRate * 30 } / { job.ipfs.budget.totalHours * 30 }</p>
            </div>
          ) : null }
        </div>
        <div>
          {!worker ? null : (
            <div className={css.iconAndName}>
              <img className={css.icon} src={worker.ipfs.logo} alt={worker.ipfs.name} />
              <Link className={css.link} href='/worker-profile'><p>{worker.ipfs.name} (Worker)</p></Link>
            </div>
          )}
          {!recruiter ? null : (
            <div className={css.iconAndName}>
              <img className={css.icon} src={recruiter.ipfs.logo} alt={recruiter.ipfs.name} />
              <Link className={css.link} href='/recruiter-profile'><p>{recruiter.ipfs.name} (Recruiter)</p></Link>
            </div>
          )}
          {job.state === JOB_STATE_FINISHED && <Button
            label='REVIEW'
            className={css.review}
            mods={Button.MODS.FLAT}
            onClick={this.handleReview}
          />}
          {job.state === JOB_STATE_PENDING_START && <Button
            label='CONFIRM START'
            className={css.review}
            mods={Button.MODS.FLAT}
            onClick={this.handleConfirmStartWork}
          />}
          {/*<Image*/}
          {/*clickable*/}
          {/*className={css.actionButton}*/}
          {/*title='Message'*/}
          {/*icon={Image.ICONS.MESSAGE}*/}
          {/*onClick={this.handleMessage}*/}
          {/*/>*/}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  confirmStartWork: () => dispatch(confirmStartWork(ownProps.job.id)),
})

export default connect(null, mapDispatchToProps)(ActiveJobCard)
