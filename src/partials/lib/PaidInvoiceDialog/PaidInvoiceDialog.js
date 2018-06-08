import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from 'redux-form-material-ui'
import { MuiThemeProvider } from 'material-ui/styles'
import { Button, Rating } from 'src/components/common'
import { JobModel, ProfileModel } from 'src/models'
import css from './PaidInvoiceDialog.scss'

export default class PaidInvoiceDialog extends React.Component {
  static propTypes = {
    job: PropTypes.instanceOf(JobModel),
    worker: PropTypes.instanceOf(ProfileModel),
    recruiter: PropTypes.instanceOf(ProfileModel),
  }

  handleOk () {
    // eslint-disable-next-line no-console
    console.log('PaidInvoiceDialog-handleOk')
  }

  render () {
    const { job, worker, recruiter } = this.props
    return job && worker && recruiter ? (
      <MuiThemeProvider>
        <div className={css.root}>
          <div className={css.header}>
            <h2>Payment has been done</h2>
            <div className={css.headerInfo}>
              You payment has been successfully completed. The job will be moved to Job Archive.
            </div>
          </div>
          <div className={css.body}>
            <div className={css.feedbackGroup}>
              <div className={css.profileRow}>
                <div className={css.worker}>
                  <img src={worker.ipfs.logo} alt={worker.ipfs.name} />
                  <div>
                    <p className={css.infoString}>Feedback For</p>
                    <p className={css.infoString}>{worker.ipfs.name}</p>
                  </div>
                </div>
                <div>
                  <p className={css.infoString}>Completed Job</p>
                  <p className={css.infoString}>{job.ipfs.name}</p>
                </div>
              </div>
              <Rating rating={4} starSize={44} />
              <TextField
                fullWidth
                floatingLabelText='Write your feedback'
              />
            </div>
            <div className={css.feedbackGroup}>
              <div className={css.profileRow}>
                <div className={css.worker}>
                  <img src={recruiter.ipfs.logo} alt={recruiter.ipfs.name} />
                  <div>
                    <p className={css.infoString}>Feedback For</p>
                    <p className={css.infoString}>{recruiter.ipfs.name}</p>
                  </div>
                </div>
              </div>
              <Rating rating={3} starSize={44} />
              <TextField
                fullWidth
                floatingLabelText='Write your feedback'
              />
            </div>
          </div>
          <div className={css.actions}>
            <Button
              buttonClassName={css.okAction}
              type={Button.TYPES.BUTTON}
              onClick={this.handleOk}
              label='OK'
            />
          </div>
        </div>
      </MuiThemeProvider>
    ) : null
  }
}
