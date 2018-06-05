import { Translate, FeedbackCard, TodoCard } from 'components/common'
import React from 'react'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import moment from 'moment'
import { schemaFactory as jobSchemaFactory } from "src/models/app/JobModel"

import css from './TodoContent.scss'

const dateFormat = 'DD MMMM YYYY, ddd'

export default class TodoContent extends React.Component {
  static propTypes = {
    todoJobs: PropTypes.arrayOf(jobSchemaFactory()),
    feedbackCards: PropTypes.arrayOf(PropTypes.shape(FeedbackCard.propTypes)),
    resumeJobWork: PropTypes.func,
    pauseJobWork: PropTypes.func,
  }

  render () {
    const { resumeJobWork, pauseJobWork } = this.props

    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.toDo' /></div>
        </div>
        <div className={css.content}>
          {this.props.todoJobs && this.props.todoJobs.map(x => (
            <div key={x.id}>
              <h3 className={css.date}>{moment(x.ipfs.period.since).format(dateFormat)} {moment(x.ipfs.period.since).isSame(Date.now(), 'days') && '(Today)'}</h3>
              <TodoCard className={css.todoCard} job={x} resumeJobWork={resumeJobWork} pauseJobWork={pauseJobWork} />
            </div>
          ))}
          <div className={css.feedback}>
            <h3 className={css.feedbackTitle}>Give Feedback</h3>
            <p>Give feedback to people you were working with!</p>
            <div className={css.feedbackCards}>
              {this.props.feedbackCards.map((card) => (<FeedbackCard {...card} key={uniqid()} />))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
