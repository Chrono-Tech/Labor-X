import { Translate, FeedbackCard, TodoCard } from 'components/common'
import React from 'react'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import moment from 'moment'
import css from './ToDo.scss'

const dateFormat = 'DD MMMM YYYY, ddd'

export default class ToDo extends React.Component {
  static propTypes = {
    todoLists: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.instanceOf(Date),
      todos: PropTypes.arrayOf(PropTypes.shape(TodoCard.propTypes)),
    })),
    feedbackCards: PropTypes.arrayOf(PropTypes.shape(FeedbackCard.propTypes)),
  }

  render () {
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.toDo' /></div>
        </div>
        <div className={css.content}>
          {this.props.todoLists.map((list) => (
            <div key={uniqid()}>
              <h3 className={css.date}>{moment(list.date).format(dateFormat)} {moment(list.date).isSame(Date.now(), 'days') && '(Today)'}</h3>
              {list.todos.map((todo) => (
                <TodoCard
                  key={uniqid()}
                  className={css.todoCard}
                  {...todo}
                />
              ))}
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
