import React from 'react'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import { JobModel, BoardModel } from 'src/models'
import { WorkerJobCard } from 'components/common'
import css from './ApplicationsTabContent.scss'

export default class ApplicationsTabContent extends React.Component {
  static propTypes = {
    applications: PropTypes.arrayOf(PropTypes.shape({
      job: PropTypes.instanceOf(JobModel),
      board: PropTypes.instanceOf(BoardModel),
      notice: PropTypes.shape({
        label: PropTypes.string,
        description: PropTypes.string,
        date: PropTypes.instanceOf(Date),
      }),
    })),
    applicationsApproved: PropTypes.arrayOf(PropTypes.shape({
      job: PropTypes.instanceOf(JobModel),
      board: PropTypes.instanceOf(BoardModel),
      notice: PropTypes.shape({
        label: PropTypes.string,
        description: PropTypes.string,
        date: PropTypes.instanceOf(Date),
      }),
    })),
  }

  handleClickReviewOffer = () => {
    // eslint-disable-next-line no-console
    console.log('---ApplicationsTabContent handleClickReviewOffer')
  }

  handleClickDismiss = () => {
    // eslint-disable-next-line no-console
    console.log('---ApplicationsTabContent handleClickDismiss')
  }

  render () {
    return (
      <div className={css.content}>
        { this.props.applicationsApproved.map(card => (<WorkerJobCard job={card.job} board={card.board} notice={card.notice} onClickReviewOffer={this.handleClickReviewOffer} key={uniqid()} />)) }
        { this.props.applications.map(card => (<WorkerJobCard job={card.job} board={card.board} notice={card.notice} onClickDismiss={this.handleClickDismiss} key={uniqid()} />)) }
      </div>
    )
  }
}
