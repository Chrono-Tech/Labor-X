import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import cn from 'classnames'
import { WorkerModel } from 'src/models'
import { Link, Button, Rating, SecurityShield, WorkerState } from 'src/components/common'
import css from './WorkerCard.scss'

const dateFormat = 'DD MMM YYYY h:mm A'

export default class WorkerCard extends React.Component {
  static propTypes = {
    worker: PropTypes.instanceOf(WorkerModel).isRequired,
    date: PropTypes.instanceOf(Date),
    offer: PropTypes.number,
    offerSent: PropTypes.bool,
  }

  handleReviewOffer () {
    // eslint-disable-next-line no-console
    console.log('WorkerCard-handleReviewOffer')
  }

  handleViewOffer () {
    // eslint-disable-next-line no-console
    console.log('WorkerCard-handleViewOffer')
  }

  handleDismissOffer () {
    // eslint-disable-next-line no-console
    console.log('WorkerCard-handleDismissOffer')
  }

  handleSendOffer () {
    // eslint-disable-next-line no-console
    console.log('WorkerCard-handleSendOffer')
  }

  renderFooterOfferSent (date, offer) {
    return (
      <div className={css.footerRow}>
        { offer != null && <p className={css.offer}>Offer: LHUS {offer.toFixed(2)} (${(offer * 30).toFixed(2)})</p>}
        <p className={css.date}>Sent on {moment(date).format(dateFormat)}</p>
        <div className={css.actions}>
          <Button
            label='VIEW&nbsp;OFFER'
            className={css.buttonBlue}
            mods={Button.MODS.FLAT}
            onClick={this.handleViewOffer}
          />
          <Button
            label='DISMISS&nbsp;OFFER'
            className={css.buttonRed}
            mods={Button.MODS.FLAT}
            onClick={this.handleDismissOffer}
          />
        </div>
      </div>
    )
  }

  renderFooter (date, offer) {
    return (
      <div className={css.footerRow}>
        { offer != null && <p className={css.offer}>Offer: LHUS {offer.toFixed(2)} (${(offer * 30).toFixed(2)})</p>}
        <p className={css.date}>Applied on {moment(date).format(dateFormat)}</p>
        <div className={css.actions}>
          { offer != null
            ? <Button
              label='REVIEW&nbsp;THE&nbsp;OFFER'
              className={css.buttonBlue}
              mods={Button.MODS.FLAT}
              onClick={this.handleReviewOffer}
            />
            : <Button
              label='SEND&nbsp;AN&nbsp;OFFER'
              className={css.buttonRed}
              mods={Button.MODS.FLAT}
              onClick={this.handleSendOffer}
            />
          }
        </div>
      </div>
    )
  }

  render () {
    const { worker, date, offer, offerSent } = this.props
    return (
      <div className={cn(css.root, {
        [css.attention]: !offerSent && offer,
      })}
      >
        <div className={css.workerRow}>
          <div className={css.workerName}>
            {worker.ipfs.avatar != null && (
              <img className={css.icon} src={worker.ipfs.avatar} alt={worker.ipfs.name} />
            )}
            <Link className={css.link} href={`/worker-profile/${worker.id}`}>
              <h4>{worker.ipfs.name}</h4>
              <p>Worker</p>
            </Link>
          </div>
          <div className={css.extraData}>
            <Rating rating={worker.extra.rating} />
            <SecurityShield level={worker.extra.validationLevel} />
            <WorkerState state={worker.extra.state} />
          </div>
        </div>
        { offerSent ? this.renderFooterOfferSent(date, offer) : this.renderFooter(date, offer) }
      </div>
    )
  }
}
