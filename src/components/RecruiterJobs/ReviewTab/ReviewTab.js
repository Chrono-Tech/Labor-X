import React from 'react'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import { JobCard, FeedbackCard } from 'components/common'
import css from './ReviewTab.scss'

export default class ReviewTab extends React.Component {
  static propTypes = {
    jobCards: PropTypes.arrayOf(PropTypes.shape(JobCard.propTypes)),
    feedbackCards: PropTypes.arrayOf(PropTypes.shape(FeedbackCard.propTypes)),
  }

  render () {
    return (
      <div className={css.root}>
        {this.props.jobCards.map((card) => (<JobCard {...card} key={uniqid()} />))}
        <div>
          <h3 className={css.feedbackTitle}>Give Feedback</h3>
          <p>Give feedback to people you were working with!</p>
          <div className={css.feedbackCards}>
            {this.props.feedbackCards.map((card) => (<FeedbackCard {...card} key={uniqid()} />))}
          </div>
        </div>
      </div>
    )
  }
}
