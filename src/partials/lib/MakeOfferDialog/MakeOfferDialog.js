import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'src/components/common'
import { JobModel } from 'src/models'
import css from './MakeOfferDialog.scss'

class MakeOfferDialog extends React.Component {
  static propTypes = {
    job: PropTypes.instanceOf(JobModel).isRequired,
  }

  handleCancel () {
    // eslint-disable-next-line no-console
    console.log('MakeOfferDialog-handleCancel')
  }

  handleApply () {
    // eslint-disable-next-line no-console
    console.log('MakeOfferDialog-handleApply')
  }

  render () {
    return (
      <div className={css.root}>
        <div className={css.header}>
          <h2>Make Your Offer!</h2>
          <div className={css.headerInfo}>
            Client would like to receive custom offers for this job. Specify your offer details bellow in order to apply for this job.
          </div>
        </div>
        <div className={css.body}>
          MakeOfferBody
        </div>
        <div className={css.actions}>
          <Button
            buttonClassName={css.cancelAction}
            type={Button.TYPES.BUTTON}
            onClick={this.handleCancel}
            label='CANCEL'
          />
          <Button
            buttonClassName={css.applyAction}
            type={Button.TYPES.BUTTON}
            onClick={this.handleApply}
            label='APPLY'
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps () {
  return {

  }
}

export default connect(mapStateToProps)(MakeOfferDialog)
