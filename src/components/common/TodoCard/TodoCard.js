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

import css from './TodoCard.scss'
import { SendInvoiceDialog } from "../../../partials"
import { modalsPush } from "../../../store"

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

  constructor (props, context){
    super(props, context)
    this.state = {
      now: Date.now(),
      sinceStartedAtTime: 0,
      workTime: 0,
      intervalRef: null
    }
    this.workedTimeRender = this.workedTimeRender.bind(this)
    this.progressIcon = this.progressIcon.bind(this)
    this.handleComplete = this.handleComplete.bind(this)
    this.handlePausePlayClick = this.handlePausePlayClick.bind(this)
  }

  componentDidMount () {
    //this.setState({intervalRef: setInterval(this.oneSecondInterv.bind(this), 1000)})
  }

  componentWillUnmount () {
    clearInterval(this.state.intervalRef);
  }

  oneSecondInterv () {
    const startTime = get(this, "props.job.extra.startTime") && get(this, "props.job.extra.startTime").getSeconds();
    const pausedFor = get(this, "props.job.pausedFor");

    const now = Date.now();
    let sinceStartedAtTime = null;
    let workTime = null;
    if (startTime) sinceStartedAtTime = now - startTime;
    if (sinceStartedAtTime && pausedFor) workTime = sinceStartedAtTime - pausedFor;

    this.setState({ workTime, sinceStartedAtTime });
  }

  handleComplete () {
    // eslint-disable-next-line no-console
    console.log('Opportunity-view-handleComplete')
    this.props.openSendInvoiceDialog(this.props.job)
  }

  handleMessage () {
    // eslint-disable-next-line no-console
    console.log('Opportunity-view-handleMessage')
  }

  handlePausePlayClick () {
    // eslint-disable-next-line no-console
    console.log('handlePausePlayClick: ', this.props.job.paused)
    if (this.props.job.extra.startTime) {
      this.props.job.paused ? this.props.resumeJobWork(this.props.job.id) : this.props.pauseJobWork(this.props.job.id)
    } else {
      this.props.startWork(this.props.job.id)
    }
  }

  handleCompleteTaskIconClick () {
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

  workedTimeRender () {
    const { job } = this.props
    if (job.paused) {
      const dur = moment.duration(job.pausedFor, 'seconds')
      const hours = Math.trunc(dur.asHours())
      const minutes = this.leadZero(Math.trunc(dur.asMinutes() % 60))
      const seconds = this.leadZero(Math.trunc(dur.asSeconds() % 60))
      return `${hours}:${minutes}:${seconds}`
    }
  }

  totalHours () {
    const { job } = this.props
    const since = get(job, "ipfs.period.since");
    const until = get(job, "ipfs.period.until");
    if (since && until) {
      return moment.duration((until.getTime() - since.getTime()), 'milliseconds').asHours()
    } else {
      return 0
    }
  }

  pausedTime () {
    const { job } = this.props
    const now = Date.now();
    const pausedAt = get(job, "pausedAt").getTime();
    const pausedFor = get(job, "pausedFor") * 1000;
    if (pausedAt && pausedFor) {
      return  pausedFor + (now - pausedAt)
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

  getIconType (job) {
    if ( job.paused && job.state === JOB_STATE_STARTED ) {
      return Image.ICONS.PLAY
    }
    if ( !job.paused && job.state === JOB_STATE_STARTED ) {
      return Image.ICONS.PAUSE
    }
    return Image.ICONS.PLAY
  }

  progressIcon () {
      return (
        <Image
          onClick={this.handlePausePlayClick}
          icon={ this.getIconType(this.props.job) }
        />
      )
  }

  getDurationString (milliseconds) {
    var tempTime = moment.duration(milliseconds, "milliseconds");
    return String(tempTime.hours()).padStart(2, "0") + ":" + String(tempTime.minutes()).padStart(2, "0") + ":" + String(tempTime.seconds()).padStart(2, "0");
  }

  renderTimes () {
    const { job } = this.props;
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
          {`${this.getDurationString(this.state.workTime)} of  ${this.totalHours()}h`} 
          </span>
        </p>
      )
    }

    if (job.state === JOB_STATE_STARTED && job.paused) {
      return (
        <p>
          <span className={css.medium}>
            {`${this.getDurationString(this.pausedTime())} total pause time`} 
          </span>
        </p>
      )
    }
  }

  render () {
    const { job } = this.props
    const cardNote = this.getCardNote()
    console.log(job);

    return (
      <div className={cn(css.root, css[this.getTodoStatus()])}>
        <div className={css.todoInfo}>
          {cardNote ? <p className={css.cardNote}>{cardNote}</p> : null}
          <div className={css.rowInfo}>
            { job.ipfs.period && job.ipfs.period.isSpecified ? <span>{moment(job.ipfs.period.since).format(dateFormat)}</span> : null }
            <span className={css.medium}>{ job.ipfs.name }</span>
            { job.ipfs.period && job.ipfs.period.isSpecified && !!this.daysUntil(job.ipfs.period.until) ? <span className={css.daysLeft}>{this.daysUntil(job.ipfs.period.until)} day(s) to go</span> : null }
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
