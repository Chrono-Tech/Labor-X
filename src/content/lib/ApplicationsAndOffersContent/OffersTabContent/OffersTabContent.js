import React from 'react'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import { JobModel, BoardModel } from 'src/models'
import { WorkerJobCard } from 'components/common'
import css from './OffersTabContent.scss'

export default class OffersTabContent extends React.Component {
  static propTypes = {
    offers: PropTypes.arrayOf(PropTypes.shape({
      job: PropTypes.instanceOf(JobModel),
      board: PropTypes.instanceOf(BoardModel),
      notice: PropTypes.shape({
        label: PropTypes.string,
        description: PropTypes.string,
        date: PropTypes.instanceOf(Date),
      }),
    })),
  }

  handleClickReview = () => {
    // eslint-disable-next-line no-console
    console.log('---OffersTabContent handleClickReview')
  }

  render () {
    return (
      <div className={css.content}>
        { this.props.offers.map(card => (<WorkerJobCard job={card.job} board={card.board} notice={card.notice} onClickReview={this.handleClickReview} key={uniqid()} />)) }
      </div>
    )
  }
}
