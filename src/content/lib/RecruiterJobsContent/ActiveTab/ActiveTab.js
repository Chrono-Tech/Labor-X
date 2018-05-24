import React from 'react'
import PropTypes from 'prop-types'
import { JobCard } from 'src/components/common'
import css from './ActiveTab.scss'

export default class ActiveTab extends React.Component {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape(JobCard.propTypes)),
  }

  render () {
    return (
      <div className={css.root}>
        {this.props.cards.map(card => (
          <JobCard {...card} key={card.job.key} />
        ))}
      </div>
    )
  }
}
