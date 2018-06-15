import React from 'react'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import { JobModel, BoardModel } from 'src/models'
import { JobCard } from 'components/common'
import css from './TabContent.scss'

export default class TabContent extends React.Component {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({
      job: PropTypes.instanceOf(JobModel).isRequired,
      board: PropTypes.instanceOf(BoardModel).isRequired,
    })),
  }

  render () {
    return (
      <div className={css.content}>
        { this.props.cards.map(card => (<JobCard job={card.job} board={card.board} key={uniqid()} />)) }
      </div>
    )
  }
}
