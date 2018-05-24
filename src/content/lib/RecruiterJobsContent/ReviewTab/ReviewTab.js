import React from 'react'
import PropTypes from 'prop-types'
import { JobCard, FeedbackCard } from 'src/components/common'
import css from './ReviewTab.scss'

export default class ReviewTab extends React.Component {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape(JobCard.propTypes)),
    feedback: PropTypes.arrayOf(PropTypes.shape(JobCard.propTypes)),
  }

  render () {
    return (
      <div className={css.root}>
        {this.props.cards.map(card => (
          <JobCard {...card} key={card.job.key} />
        ))}
        <div>
          <h3 className={css.feedbackTitle}>Give Feedback</h3>
          <p>Give feedback to people you were working with!</p>
          <div className={css.feedbackCards}>
            {this.props.feedback.map((card) => (
              <FeedbackCard {...card} key={card.job.key} />))
            }
          </div>
        </div>
      </div>
    )
  }
}
