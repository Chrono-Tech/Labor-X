import React from 'react'
import { Button, Image } from 'components/common'
import PropTypes from 'prop-types'
import moment from 'moment'
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
    className: PropTypes.string,
    jobName: PropTypes.string.isRequired,
    cardNote: PropTypes.string,
    status: PropTypes.oneOf(Object.values(STATUSES)).isRequired,
    startDate: PropTypes.instanceOf(Date).isRequired,
    deadline: PropTypes.instanceOf(Date),
    totalHours: PropTypes.number,
    worked: PropTypes.number,
  }

  constructor (props, context){
    super(props, context)
    this.workedTime = this.workedTime.bind(this)
    this.progressIcon = this.progressIcon.bind(this)
  }

  static STATUSES = STATUSES

  handleComplete () {
    // eslint-disable-next-line no-console
    console.log('Opportunity-view-handleComplete')
  }

  handleMessage () {
    // eslint-disable-next-line no-console
    console.log('Opportunity-view-handleMessage')
  }

  daysUntil(date) {
    return moment(date).diff(moment(), 'days')
  }

  leadZero (value) {
    return value < 10 ? `0${value}` : value
  }

  progressIcon () {
    return this.props.status === STATUSES.IN_PROGRESS ?
      <Image icon={Image.ICONS.PAUSE}/> : <Image icon={Image.ICONS.PLAY}/>
  }

  workedTime () {
    const dur = moment.duration(this.props.worked, 'seconds')
    const hours = Math.trunc(dur.asHours())
    const minutes = this.leadZero(Math.trunc(dur.asMinutes() % 60))
    const seconds = this.leadZero(Math.trunc(dur.asSeconds() % 60))
    return this.props.status === STATUSES.PROBLEM ? `${hours}h` : `${hours}:${minutes}:${seconds}`
  }

  render () {
    return (
      <div className={[this.props.className, css.root, css[this.props.status]].join(' ')}>
        <div className={css.todoInfo}>
          {this.props.cardNote && <p className={css.cardNote}>{this.props.cardNote}</p>}
          <div className={css.rowInfo}>
            <span>{moment(this.props.startDate).format(dateFormat)}</span>
            <span className={css.medium}>{ this.props.jobName }</span>
            {!!this.daysUntil(this.props.deadline) && <span className={css.daysLeft}>{this.daysUntil(this.props.deadline)} day(s) to go</span>}
          </div>
        </div>
        <div className={css.progress}>
          <div className={css.progressTimer}>
            {this.props.status !== STATUSES.PROBLEM && this.progressIcon()}
            <p><span className={css.medium}>{this.props.worked > 0 ? this.workedTime() : 'Start Work'}</span> of {this.props.totalHours}h</p>
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
