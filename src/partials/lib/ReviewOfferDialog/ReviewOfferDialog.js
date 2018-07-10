import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import cn from 'classnames'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { modalsPop } from 'src/store'
import { JobModel, JobOfferModel, ProfileModel } from 'src/models'
import { Link } from 'src/components/common'
import css from './ReviewOfferDialog.scss'

const dateFormat = 'DD MMM YYYY'
const timeFormat = 'h:mm A'
const fullFormat = `${dateFormat} ${timeFormat}`

class ReviewOfferDialog extends React.Component {
  static propTypes = {
    job: PropTypes.instanceOf(JobModel).isRequired,
    offer: PropTypes.instanceOf(JobOfferModel).isRequired,
    worker: PropTypes.instanceOf(ProfileModel).isRequired,
    closeModal: PropTypes.func.isRequired,
  }

  handleCancel = () => {
    this.props.closeModal()
  }

  handleDecline = () => {
    this.props.closeModal()
  }

  handleAccept = () => {
    this.props.closeModal()
  }

  render () {
    const { job, offer, worker } = this.props

    return (
      <div className={css.root}>
        <div className={css.header}>
          <h2>Review Offer</h2>
          <div className={css.headerInfo}>
            {moment(offer.ipfs.appliedDate).format(fullFormat)}
          </div>
        </div>
        <div className={css.body}>
          <div className={css.workerRow}>
            <div className={css.workerName}>
              {worker.ipfs.logo != null && (
                <img className={css.workerImage} src={worker.ipfs.logo} alt={worker.ipfs.name} />
              )}
              <Link className={css.link} href={`/worker-profile/${worker.id}`}>
                <h4>{worker.ipfs.name}</h4>
                <p>Worker</p>
              </Link>
            </div>
          </div>
          { offer.ipfs.message == null ? null : <p className={css.messageRow}>{offer.ipfs.message}</p> }
          <div className={cn(css.twoColumn, css.infoRow)}>
            <div className={css.twoColumn}>
              <div>
                <p><strong>Total</strong></p>
                <h3>LHUS: {offer.rate.times(offer.estimate).toFixed(2)}</h3>
                <p>${offer.rate.times(offer.estimate).times(30).toFixed(2)}</p>
              </div>
              <div>
                <p><strong>Hours</strong></p>
                <h3>{offer.estimate.toFixed(1)}</h3>
                <p>LHT {offer.rate.div(offer.estimate).toFixed(2)}/h (${offer.rate.div(offer.estimate).times(30).toFixed(2)})</p>
              </div>
            </div>
            <div className={css.twoColumn}>
              <div>
                <p><strong>Start Date</strong></p>
                <h3>{moment(job.ipfs.period.since).format(dateFormat)}</h3>
              </div>
              <div>
                <p><strong>Start Time</strong></p>
                <h3>{moment(job.ipfs.period.since).format(timeFormat)}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className={css.actions}>
          <Button className={css.buttonCancel} onClick={this.handleCancel}>CANCEL</Button>
          <Button className={css.buttonDecline} onClick={this.handleDecline} variant='contained'>DECLINE</Button>
          <Button className={css.buttonAccept} onClick={this.handleAccept} variant='contained'>ACCEPT</Button>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    closeModal () {
      dispatch(modalsPop())
    },
  }
}

export default connect(null, mapDispatchToProps)(ReviewOfferDialog)
