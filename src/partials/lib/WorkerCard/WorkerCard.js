import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import cn from 'classnames'
import { ProfileModel, JobOfferModel, JobModel } from 'src/models'
import { Link, Button, Rating, SecurityShield } from 'src/components/common'
import { modalsPush } from 'src/store'
import { ReviewOfferDialog } from 'src/partials'
import css from './WorkerCard.scss'

const dateFormat = 'DD MMM YYYY h:mm A'

class WorkerCard extends React.Component {
  static propTypes = {
    offer: PropTypes.instanceOf(JobOfferModel).isRequired,
    person: PropTypes.instanceOf(ProfileModel).isRequired,
    // workerProfile: PropTypes.instanceOf(ProfileWorkerModel),
    // profile: PropTypes.instanceOf(ProfileModelBackend),
    job: PropTypes.instanceOf(JobModel),
    offerSent: PropTypes.bool,
    pushModal: PropTypes.func,
    jobId: PropTypes.number,
  }

  static defaultProps = {
    offerSent: false,
  }

  handleViewOffer () {
    // eslint-disable-next-line no-console
    console.log('WorkerCard-handleViewOffer')
  }

  handleReviewOffer = () => {
    const { job, offer, person } = this.props
    const modal = {
      component: ReviewOfferDialog,
      props: { job, offer, person },
    }
    this.props.pushModal(modal)
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
    const { person, offer, offerSent } = this.props
    // const workerName = get(profile, "level1.approved.userName")
    //   ? get(profile, "level1.approved.userName")
    //   : ""
    // const avatarUrl = get(profile, "level1.approved.avatar.url")
    //   ? get(profile, "level1.approved.avatar.url")
    //   : "/static/temp/icon-profile.jpg"
    // const validationLevel = profile
    //   ? profile.getValidationLevel()
    //   : 0
    return (
      <div className={cn(css.root, {
        [css.attention]: !offerSent && offer,
      })}
      >
        <div className={css.workerRow}>
          <div className={css.workerName}>
            <img className={css.icon} src={person.avatar} alt={person.userName} />
            <Link className={css.link} href={`/worker-profile/${person.id}`}>
              <h4>{person.userName}</h4>
              <p>Worker</p>
            </Link>
          </div>
          <div className={css.extraData}>
            <Rating rating={4} />
            <SecurityShield level={person.validationLevel} />
            {/* <WorkerState state={workerProfile.extra.state} /> */}
          </div>
        </div>
        { offerSent ? this.renderFooterOfferSent(offer) : this.renderFooter(offer) }
      </div>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  pushModal (modal) { dispatch(modalsPush(modal)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkerCard)
