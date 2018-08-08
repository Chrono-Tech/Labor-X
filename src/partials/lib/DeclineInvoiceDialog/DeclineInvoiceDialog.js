import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { TextField } from 'redux-form-material-ui-next'
import { Button, Image, Radio } from 'src/components/common'
import { JobModel, ProfileModel } from 'src/models'
import css from './DeclineInvoiceDialog.scss'

const dateFormat = 'DD.MM.YYYY'

export default class DeclineInvoiceDialog extends React.Component {
  static propTypes = {
    job: PropTypes.instanceOf(JobModel),
    worker: PropTypes.instanceOf(ProfileModel),
    recruiter: PropTypes.instanceOf(ProfileModel),
  }

  handleProceed () {
    // eslint-disable-next-line no-console
    console.log('DeclineInvoiceDialog-handleProceed')
  }

  handleCancel () {
    // eslint-disable-next-line no-console
    console.log('DeclineInvoiceDialog-handleCancel')
  }

  handleRadioChange () {
    // eslint-disable-next-line no-console
    console.log('DeclineInvoiceDialog-handleRadioChange')
  }

  render () {
    const { job, worker, recruiter } = this.props
    return job && worker && recruiter ? (
      <div className={css.root}>
        <div className={css.header}>
          <h2>Decline Invoice #1/{moment().format(dateFormat)}</h2>
          <div className={css.headerInfo}>
            <div className={css.worker}>
              <img src={worker.ipfs.logo} alt={worker.ipfs.name} />
              <div>
                <strong className={css.infoString}>Billed by</strong>
                <p className={css.infoString}>{worker.ipfs.name} (Worker)</p>
              </div>
            </div>
            <div>
              <strong className={css.infoString}>Completed Job</strong>
              <p className={css.infoString}>{job.ipfs.name}</p>
            </div>
            <div>
              <strong className={css.infoString}>Amount</strong>
              <p className={css.infoString}>LHUS 76.25</p>
            </div>
          </div>
        </div>
        <div className={css.body}>
          <TextField
            fullWidth
            label='Describe reason(s) you do decline the invoice'
          />
          <div className={css.upload}>
            <div className={css.uploadIcon}>
              <Image
                icon={Image.ICONS.UPLOAD_FILE_SELECT}
                color={Image.COLORS.BLUE}
              />
            </div>
            <div className={css.uploadLabel}>Upload Image(s)</div>
          </div>
          <div className={css.delegate}>
            <h4>Delegate management to</h4>
            <Radio
              primary
              name='handle'
              radioButtonClassName={css.radio}
              input={{
                onChange: this.handleRadioChange,
              }}
              material
              values={[
                {
                  value: '1',
                  label: 'I\'ll handle myself',
                },
                {
                  value: '2',
                  label: `Recruiter (${recruiter.ipfs.name})`,
                },
                {
                  value: '3',
                  label: 'LaborX team for refund',
                },
              ]}
            />
          </div>
        </div>
        <div className={css.actions}>
          <Button
            buttonClassName={css.cancelAction}
            type={Button.TYPES.BUTTON}
            onClick={this.handleCancel}
            label='CANCEL'
          />
          <Button
            buttonClassName={css.proceedAction}
            type={Button.TYPES.BUTTON}
            onClick={this.handleProceed}
            label='PROCEED'
          />
        </div>
      </div>
    ) : null
  }
}
