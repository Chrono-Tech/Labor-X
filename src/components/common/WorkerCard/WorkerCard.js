import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import cn from 'classnames'
import { ProfileModel, JobOfferModel } from 'src/models'
import { Link, Button, Rating, SecurityShield, WorkerState } from 'src/components/common'
import css from './WorkerCard.scss'

const dateFormat = 'DD MMM YYYY h:mm A'

export default class WorkerCard extends React.Component {
  static propTypes = {
    offer: PropTypes.instanceOf(JobOfferModel).isRequired,
    worker: PropTypes.instanceOf(ProfileModel).isRequired,
    offerSent: PropTypes.bool,
  }

  static defaultProps = {
    offerSent: false,
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

  renderFooterOfferSent (offer) {
    const offerAmount = offer.estimate && offer.rate ? offer.estimate.times(offer.rate) : null
    return (
      <div className={css.footerRow}>
        { offerAmount != null && <p className={css.offer}>Offer: LHUS {offerAmount.toFixed(2).toString()} (${(offerAmount.times(30)).toFixed(2).toString()})</p>}
        <p className={css.date}>Sent on {moment(offer.ipfs.appliedDate).format(dateFormat)}</p>
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

  renderFooter (offer) {
    const offerAmount = offer.estimate && offer.rate ? offer.estimate.times(offer.rate) : null
    return (
      <div className={css.footerRow}>
        { offerAmount != null && <p className={css.offer}>Offer: LHUS {offerAmount.toFixed(2).toString()} (${(offerAmount.times(30)).toFixed(2).toString()})</p>}
        <p className={css.date}>Applied on {moment(offer.ipfs.appliedDate).format(dateFormat)}</p>
        <div className={css.actions}>
          { offerAmount != null
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
    const { worker, offer, offerSent } = this.props
    return (
      <div className={cn(css.root, {
        [css.attention]: !offerSent && offer,
      })}
      >
        <div className={css.workerRow}>
          <div className={css.workerName}>
            {worker.ipfs.logo != null && (
              <img className={css.icon} src={worker.ipfs.logo} alt={worker.ipfs.name} />
            )}
            <Link className={css.link} href={`/worker-profile/${worker.id}`}>
              <h4>{worker.ipfs.name}</h4>
              <p>Worker</p>
            </Link>
          </div>
          <div className={css.extraData}>
            <Rating rating={worker.workerExtra.rating} />
            <SecurityShield level={worker.workerExtra.validationLevel} />
            <WorkerState state={worker.workerExtra.state} />
          </div>
        </div>
        { offerSent ? this.renderFooterOfferSent(offer) : this.renderFooter(offer) }
      </div>
    )
  }
}
