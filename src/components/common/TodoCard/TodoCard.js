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
    spent: PropTypes.number,
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

  render () {
    return (
      <div className={[this.props.className, css.root, css[this.props.status]].join(' ')}>
        <div className={css.todoInfo}>
          {this.props.cardNote && <p className={css.cardNote}>{this.props.cardNote}</p>}
          <div className={css.rowInfo}>
            <span>{moment(this.props.startDate).format(dateFormat)}</span>
            <span className={css.medium}>{ this.props.jobName }</span>
            <span className={css.daysLeft}>123</span>
          </div>
        </div>
        <div className={css.progress}>
          <p> of </p>
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
