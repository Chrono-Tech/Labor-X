// @flow
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import { groupBy } from 'lodash'
import { cancelJob, modalsPush } from 'src/store'
import { PayInvoiceDialog } from 'src/partials'
import { Translate, ActiveJobCard } from 'src/components/common'
import { getToPayCards, getOtherCards } from "src/store/activeJobs"
import css from './ActiveJobsContent.scss'

const dateFormat = 'DD MMMM YYYY, ddd'

class ActiveJobsContent extends React.Component {
  static propTypes = {
    pushModal: PropTypes.func.isRequired,
    cancelJob: PropTypes.func.isRequired,
    toPayCards: PropTypes.arrayOf(PropTypes.shape({})),
    otherCardsGroupedByCreatedAt: PropTypes.shape({}),
  }

  handleOnClickReview = (job, worker) => {
    const { cancelJob } = this.props
    const modal = {
      component: PayInvoiceDialog,
      props: { job, worker, cancelJob },
    }
    this.props.pushModal(modal)
  }

  renderOtherCards () {
    return Object.entries(this.props.otherCardsGroupedByCreatedAt).map(([ date, cards ]) => (
      <div key={date}>
        <h3 className={css.cardsHeader}>{moment(date).format(dateFormat)}</h3>
        {cards.map((card) => (
          <ActiveJobCard {...card} onClickReview={this.handleOnClickReview} key={card.job.key} />
        ))}
      </div>
    ))
  }

  renderToPayCards () {
    return this.props.toPayCards.map((card) => <ActiveJobCard {...card} key={card.job.id} />)
  }

  render () {
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.activeJobs' /></div>
        </div>
        <div className={css.content}>
          <div>
            <h3 className={css.cardsHeader}>Review & Pay</h3>
            { this.props.toPayCards.length ? this.renderToPayCards() : <div>No Jobs to Review & Pay</div> }
          </div>
          {this.renderOtherCards()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  toPayCards: getToPayCards(state),
  otherCardsGroupedByCreatedAt: groupBy(getOtherCards(state), (card) => moment(card.job.extra.createdAt).format('YYYY-MM-DD')),
})

const mapDispatchToProps = (dispatch) => ({
  pushModal: (modal) => dispatch(modalsPush(modal)),
  cancelJob: (jobId: Number) => dispatch(cancelJob(jobId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ActiveJobsContent)
