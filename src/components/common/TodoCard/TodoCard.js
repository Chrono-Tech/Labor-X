// @flow
import React from 'react'
import { connect } from "react-redux"
import { Image } from 'components/common'
import PropTypes from 'prop-types'
import moment from 'moment'
import cn from 'classnames'
import get from "lodash/get"
import { JobModel, JOB_STATE_WORK_REJECTED, JOB_STATE_STARTED, JOB_STATE_PENDING_START } from "src/models"
import { pauseJobWork, resumeJobWork, startWork } from "src/store"
import { SendInvoiceDialog } from "../../../partials"
import { modalsPush } from "../../../store"
import css from './TodoCard.scss'

const STATUSES = {
  APPLIED: 'applied',
  IN_PROGRESS: 'inProgress',
  APPROVED: 'approved',
  PROBLEM: 'problem',
  ATTENTION: 'attention',
}

const dateFormat = 'h:mm A'

class TodoCard extends React.Component {
  static STATUSES = STATUSES

  static propTypes = {
    job: PropTypes.instanceOf(JobModel),
    resumeJobWork: PropTypes.func,
    pauseJobWork: PropTypes.func,
    completeJobWork: PropTypes.func,
    startWork: PropTypes.func,
    endWork: PropTypes.func,
    openSendInvoiceDialog: PropTypes.func,
  }

  constructor (props, context) {
    super(props, context)
    this.state = {
      ticker: 0,
      intervalRef: null,
      tick: this.tick,
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    let ticker = prevState.ticker
    let intervalRef = prevState.intervalRef

    if (nextProps.job.state === JOB_STATE_STARTED) {
      if (!prevState.intervalRef && !nextProps.job.paused) {
        ticker = 0
        intervalRef = setInterval(prevState.tick, 1000)
      } else {
        if (nextProps.job.paused) {
          clearInterval(prevState.intervalRef)
          ticker = 0
          intervalRef = null
        }
      }
    } else {
      clearInterval(prevState.intervalRef)
      ticker = 0
      intervalRef = null
    }
    return {
      ticker,
      intervalRef,
    }
  }

  componentWillUnmount () {
    clearInterval(this.state.intervalRef)
  }

  handleMessage = () => {
    // eslint-disable-next-line no-console
    console.log('Opportunity-view-handleMessage')
  }

  handlePausePlayClick = () => {
    // eslint-disable-next-line no-console
    console.log('handlePausePlayClick: ', this.props.job.paused)
    if (this.props.job.extra.startTime) {
      this.props.job.paused ? this.props.resumeJobWork(this.props.job.id) : this.props.pauseJobWork(this.props.job.id)
    } else {
      this.props.startWork(this.props.job.id)
    }
  }

  handleCompleteTaskIconClick = () => {
    this.props.openSendInvoiceDialog()
  }

  getTodoStatus () {
    const { job } = this.props
    if (!job.paused && job.state === JOB_STATE_STARTED) {
      return STATUSES.IN_PROGRESS
    }
    if (job.state === JOB_STATE_WORK_REJECTED) {
      return STATUSES.PROBLEM
    }
    if (job.ipfs.period && this.daysUntil(job.ipfs.period.until) === 1) {
      return STATUSES.ATTENTION
    }
    return STATUSES.APPROVED
  }

  getCardNote () {
    const { job } = this.props
    if (job.state.name === JOB_STATE_WORK_REJECTED) {
      return 'RE-DO TODAY'
    } else if (job.ipfs.period && this.daysUntil(job.ipfs.period.until) <= 1) {
      return 'DUE TODAY'
    } else {
      return ''
    }
  }

  getIconType (job) {
    if (job.paused && job.state === JOB_STATE_STARTED) {
      return Image.ICONS.PLAY
    }
    if (!job.paused && job.state === JOB_STATE_STARTED) {
      return Image.ICONS.PAUSE
    }
    return Image.ICONS.PLAY
  }

  getDurationString (milliseconds) {
    var tempTime = moment.duration(milliseconds, "milliseconds")
    return String(tempTime.hours()).padStart(2, "0") + ":" + String(tempTime.minutes()).padStart(2, "0") + ":" + String(tempTime.seconds()).padStart(2, "0")
  }

  getWorkedTime () {
    const now = Date.now()
    const startTime = this.props.job.extra.startTime.getTime()
    const pausedFor = this.props.job.pausedFor * 1000
    const ticker = this.state.ticker * 1000
    return ((now - startTime) - pausedFor) + ticker
  }

  tick = () => {
    this.setState({ ticker: this.state.ticker++ })
  }

  totalHours () {
    const { job } = this.props
    const since = get(job, "ipfs.period.since")
    const until = get(job, "ipfs.period.until")
    if (since && until) {
      return moment.duration((until.getTime() - since.getTime()), 'milliseconds').asHours()
    } else {
      return 0
    }
  }

  leadZero (value) {
    return value < 10 ? `0${value}` : value
  }

  daysUntil (date) {
    return moment(date).diff(moment(), 'days')
  }

  progressIcon () {
    return (
      <Image
        onClick={this.handlePausePlayClick}
        icon={this.getIconType(this.props.job)}
      />
    )
  }

  renderTimes () {
    const { job } = this.props
    if (job.state === JOB_STATE_PENDING_START) {
      return (
        <p>
          {`Start Work of  ${this.totalHours()}h`}
        </p>
      )
    }

    if (job.state === JOB_STATE_STARTED && !job.paused) {
      return (
        <p>
          <span className={css.medium}>
            {`${this.getDurationString(this.getWorkedTime())} of  ${this.totalHours()}h`}
          </span>
        </p>
      )
    }

    if (job.state === JOB_STATE_STARTED && job.paused) {
      return (
        <p>
          <span className={css.medium}>
            {`${this.getDurationString(this.getWorkedTime())} of  ${this.totalHours()}h`}
          </span>
        </p>
      )
    }
  }

  render () {
    const { job } = this.props
    const cardNote = this.getCardNote()

    return (
      <div className={cn(css.root, css[this.getTodoStatus()])}>
        <div className={css.todoInfo}>
          {cardNote ? <p className={css.cardNote}>{cardNote}</p> : null}
          <div className={css.rowInfo}>
            {job.ipfs.period && job.ipfs.period.since ? <span>{moment(job.ipfs.period.since).format(dateFormat)}</span> : null}
            <span className={css.medium}>{job.ipfs.name}</span>
            {job.ipfs.period && job.ipfs.period.until && !!this.daysUntil(job.ipfs.period.until) ? <span className={css.daysLeft}>{this.daysUntil(job.ipfs.period.until)} day(s) to go</span> : null}
          </div>
        </div>
        <div className={css.progress}>
          <div className={css.progressTimer}>
            {this.progressIcon()}
            {this.renderTimes()}
          </div>
          <div className={css.actions}>
            {
              this.props.job.state === JOB_STATE_STARTED ? <Image
                clickable
                className={css.actionButton}
                title='Complete Task'
                icon={Image.ICONS.CHECKBOX_CIRCLE}
                onClick={this.handleCompleteTaskIconClick}
              /> : null
            }

            <Image
              clickable
              className={css.actionButton}
              title='Message'
              icon={Image.ICONS.MESSAGE}
              onClick={this.handleMessage}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  resumeJobWork: (jobId: Number) => dispatch(resumeJobWork(jobId)),
  pauseJobWork: (jobId: Number) => dispatch(pauseJobWork(jobId)),
  startWork: (jobId: Number) => dispatch(startWork(jobId)),
  openSendInvoiceDialog: () => dispatch(modalsPush({ component: SendInvoiceDialog, props: { job: ownProps.job } })),
})

export default connect(null, mapDispatchToProps)(TodoCard)
