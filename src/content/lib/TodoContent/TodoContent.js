import React from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import uniqid from 'uniqid'
import moment from 'moment'
import { connect } from 'react-redux'
import { Translate, FeedbackCard, TodoCard } from 'components/common'
import { SendInvoiceDialog } from 'src/partials'
import { modalsPush } from 'src/store'
import { JobModel } from "src/models"

import css from './TodoContent.scss'

const dateFormat = 'DD MMMM YYYY, ddd'

class TodoContent extends React.Component {
  static propTypes = {
    todoJobs: PropTypes.arrayOf(PropTypes.instanceOf(JobModel)),
    feedbackCards: PropTypes.arrayOf(PropTypes.shape(FeedbackCard.propTypes)),
    pushModal: PropTypes.func.isRequired,
  }

  constructor (props, context){
    super(props, context)
  }

  renderTodos () {
    return this.props.todoJobs.map(job => (
      <div key={job.id}>
        <h3 className={css.date}>{moment(job.ipfs.period.since).format(dateFormat)} {moment(job.ipfs.period.since).isSame(Date.now(), 'days') && '(Today)'}</h3>
        <TodoCard className={css.todoCard} job={job} />
      </div>
    ))
  }

  renderNoTodosMessage () {
    return (<div>No to-do jobs</div>)
  }

  renderLoader () {
    return (<div>Loading to-do jobs</div>)
  }

  render () {
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.toDo' /></div>
        </div>
        <div className={css.content}>
          {
            this.props.todoJobs
              ? this.props.todoJobs.length
                ? this.renderTodos()
                : this.renderNoTodosMessage()
              : this.renderLoader()
          }
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

export default TodoContent
