import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { JobModel, JobOfferModel, ProfileModel } from 'src/models'
import { modalsPop } from 'src/store'
import { Button } from 'src/components/common'
import css from './ReviewOfferDialog.scss'

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
          <h2>Make Your Offer!</h2>
          <div className={css.headerInfo}>
            Client would like to receive custom offers for this job. Specify your offer details bellow in order to apply for this job.
          </div>
        </div>
        <div className={css.body}>
          body
        </div>
        <div className={css.actions}>
          <Button
            buttonClassName={css.cancelAction}
            type={Button.TYPES.BUTTON}
            mode={Button.MODES.FLAT}
            onClick={this.handleCancel}
            label='CANCEL'
          />
          <Button
            buttonClassName={css.declineAction}
            type={Button.TYPES.BUTTON}
            onClick={this.handleDecline}
            label='DECLINE'
          />
          <Button
            buttonClassName={css.acceptAction}
            type={Button.TYPES.BUTTON}
            onClick={this.handleAccept}
            label='ACCEPT'
          />
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
