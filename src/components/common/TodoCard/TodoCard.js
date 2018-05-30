import React from 'react'
import { Image } from 'components/common'
import PropTypes from 'prop-types'
import moment from 'moment'
import cn from 'classnames'
import css from './TodoCard.scss'
import { schemaFactory as jobSchemaFactory } from "../../../models/app/JobModel"

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
    job: jobSchemaFactory(),
    className: PropTypes.string,
    // jobName: PropTypes.string.isRequired,
    // cardNote: PropTypes.string,
    // status: PropTypes.oneOf(Object.values(STATUSES)).isRequired,
    // startDate: PropTypes.instanceOf(Date).isRequired,
    // endDate: PropTypes.instanceOf(Date),
    // totalHours: PropTypes.number,
    // workedTime: PropTypes.number,
  }

  static STATUSES = STATUSES

  constructor (props, context){
    super(props, context)
    this.workedTime = this.workedTime.bind(this)
    this.progressIcon = this.progressIcon.bind(this)
  }

  handleComplete () {
    // eslint-disable-next-line no-console
    console.log('Opportunity-view-handleComplete')
  }

  handleMessage () {
    // eslint-disable-next-line no-console
    console.log('Opportunity-view-handleMessage')
  }

  daysUntil (date) {
    return moment(date).diff(moment(), 'days')
  }

  leadZero (value) {
    return value < 10 ? `0${value}` : value
  }

  progressIcon () {
    return this.props.status === STATUSES.IN_PROGRESS ?
      <Image icon={Image.ICONS.PAUSE} /> : <Image icon={Image.ICONS.PLAY} />
  }

  workedTime () {
    const dur = moment.duration(this.props.workedTime, 'seconds')
    const hours = Math.trunc(dur.asHours())
    const minutes = this.leadZero(Math.trunc(dur.asMinutes() % 60))
    const seconds = this.leadZero(Math.trunc(dur.asSeconds() % 60))
    return this.props.status === STATUSES.PROBLEM ? `${hours}h` : `${hours}:${minutes}:${seconds}`
  }

  render () {
    const { className, cardNote, job } = this.props
    return (
      <div className={cn(className, css.root, css[STATUSES.APPROVED])}>
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
            {/*{ status !== STATUSES.PROBLEM ? this.progressIcon() : null }*/}
            {/*<p><span className={css.medium}>{workedTime > 0 ? this.workedTime() : 'Start Work'}</span> of {totalHours}h</p>*/}
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
