import React, { Fragment }  from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import { ActiveJobCard } from 'src/components/common'
import css from './ActiveTabContent.scss'

const dateFormat = 'DD MMMM YYYY, ddd'

class ActiveTabContent extends React.Component {
  static propTypes = {
    toPayCards: PropTypes.arrayOf(PropTypes.shape({})),
    otherCardsGroupedByCreatedAt: PropTypes.shape({}),
    onHandleOnClickReview: PropTypes.func,
  }

  onHandleOnClickReview (job, worker) {
    this.props.onHandleOnClickReview(job, worker);
  }

  renderOtherCards () {
    const { onHandleOnClickReview } = this.props;
    return Object.entries(this.props.otherCardsGroupedByCreatedAt).map(([ date, cards ]) => (
      <div key={date}>
        <h3 className={css.cardsHeader}>{moment(date).format(dateFormat)}</h3>
        {cards.map((card) => (
          <ActiveJobCard {...card} onClickReview={() => onHandleOnClickReview(card.job, card.worker) } key={card.job.key} />
        ))}
      </div>
    ))
  }

  renderToPayCards () {
    return this.props.toPayCards.map((card) => <ActiveJobCard {...card} key={card.job.id} />)
  }

  render () {
    return (
      <Fragment>
          <h3 className={css.cardsHeader}>Review & Pay</h3>
          { this.props.toPayCards.length ? this.renderToPayCards() : <div>No Jobs to Review & Pay</div> }
          { this.renderOtherCards() }
      </Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
})

export default connect(null, mapDispatchToProps)(ActiveTabContent)
