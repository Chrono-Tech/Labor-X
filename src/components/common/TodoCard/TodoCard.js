import React from 'react'
import { Image } from 'components/common'
import PropTypes from 'prop-types'
import moment from 'moment'
import cn from 'classnames'
import { JobModel } from "src/models"

import css from './TodoCard.scss'

const STATUSES = {
  APPLIED: 'applied',
  IN_PROGRESS: 'inProgress',
  APPROVED: 'approved',
  PROBLEM: 'problem',
  ATTENTION: 'attention',
}

const dateFormat = 'h:mm A'

export default class TodoCard extends React.Component {
  static propTypes = {
    job: PropTypes.instanceOf(JobModel),
    resumeJobWork: PropTypes.func,
    pauseJobWork: PropTypes.func,
    completeJobWork: PropTypes.func,
  }

  static STATUSES = STATUSES

  constructor (props, context){
    super(props, context)
    this.workedTimeRender = this.workedTimeRender.bind(this)
    this.progressIcon = this.progressIcon.bind(this)
    this.handleComplete = this.handleComplete.bind(this)
  }

  handleComplete () {
    // eslint-disable-next-line no-console
    console.log('Opportunity-view-handleComplete')
    this.props.completeJobWork(this.props.job)
  }

  handleMessage () {
    // eslint-disable-next-line no-console
    console.log('Opportunity-view-handleMessage')
  }

  handlePausePlayClick = () => {
    this.props.job.paused ? this.props.resumeJobWork(this.props.job.id) : this.props.pauseJobWork(this.props.job.id)
  }

  getTodoStatus = () => {
    const { job } = this.props

    if (!job.paused) {
      return STATUSES.IN_PROGRESS
    } else if (job.state.name === 'WORK_REJECTED') {
      return STATUSES.PROBLEM
    } else if (job.ipfs.period && this.daysUntil(job.ipfs.period.until) === 1) {
      return STATUSES.ATTENTION
    } else {
      return STATUSES.APPROVED
    }
  }

  getCardNote = () => {
    const { job } = this.props
    if (job.state.name === 'WORK_REJECTED') {
      return 'RE-DO TODAY'
    } else if (job.ipfs.period && this.daysUntil(job.ipfs.period.until) <= 1) {
      return 'DUE TODAY'
    } else {
      return ''
    }
  }

  workedTimeRender () {
    const dur = moment.duration(this.workedTimeSeconds(), 'seconds')
    const hours = Math.trunc(dur.asHours())
    const minutes = this.leadZero(Math.trunc(dur.asMinutes() % 60))
    const seconds = this.leadZero(Math.trunc(dur.asSeconds() % 60))
    return `${hours}:${minutes}:${seconds}`
  }

  workedTimeSeconds = () => {
    const { finishTime, startTime, pausedFor } = this.props.job
    const fromTime = finishTime ? finishTime : + new Date
    return fromTime - startTime - pausedFor
  }

  totalHours = () => {
    const { job } = this.props
    return job.ipfs.period && job.ipfs.period.isSpecified && job.ipfs.period.totalHours
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
        icon={this.props.job.paused ? Image.ICONS.PAUSE : Image.ICONS.PLAY}
      />
    )
  }

  render () {
    const { job } = this.props
    const cardNote = this.getCardNote()

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
            { this.progressIcon() }
            <p><span className={css.medium}>{this.workedTimeSeconds() > 0 ? this.workedTimeRender() : 'Start Work'}</span> of {this.totalHours()}h</p>
          </div>
          <div className={css.actions}>
            <Image
              clickable
              className={css.actionButton}
              title='Complete Task'
              icon={Image.ICONS.CHECKBOX_CIRCLE}
              onClick={this.handleComplete}
            />
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
