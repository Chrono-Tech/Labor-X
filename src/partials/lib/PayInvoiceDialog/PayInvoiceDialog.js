import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Button, Link } from 'src/components/common'
import { JobModel, ProfileModel } from 'src/models'
import css from './PayInvoiceDialog.scss'

const dateFormat = 'DD.MM.YYYY'

export default class PayInvoiceDialog extends React.Component {
  static propTypes = {
    job: PropTypes.instanceOf(JobModel),
    worker: PropTypes.instanceOf(ProfileModel),
  }

  handlePay () {
    // eslint-disable-next-line no-console
    console.log('PayInvoiceDialog-handlePay')
  }

  handleDecline () {
    // eslint-disable-next-line no-console
    console.log('PayInvoiceDialog-handleDecline')
  }

  render () {
    const { job, worker } = this.props
    return job && worker ? (
      <div className={css.root}>
        <div className={css.header}>
          <h2>Invoice #1/{moment().format(dateFormat)}</h2>
          <div className={css.headerInfo}>
            <div className={css.worker}>
              <img src={worker.ipfs.logo} alt={worker.ipfs.name} />
              <div>
                <strong className={css.infoString}>Pay To</strong>
                <p className={css.infoString}>{worker.ipfs.name}</p>
              </div>
            </div>
            <div>
              <strong className={css.infoString}>Completed Job</strong>
              <p className={css.infoString}>{job.ipfs.name}</p>
            </div>
            <div>
              <strong className={css.infoString}>Status</strong>
              <p className={css.infoString}>{job.state.name}</p>
            </div>
          </div>
        </div>
        <div className={css.body}>
          <div className={css.invoiceRow}>
            <p>Install 10 Gas Ovens</p>
            <p>LHUS 76.00</p>
          </div>
          <div className={css.invoiceRow}>
            <p>Gas Tubes</p>
            <p>$10.00</p>
          </div>
          <div className={css.totalRow}>
            <strong>Total</strong>
            <div className={css.totalPrice}>
              <strong>LHUS 76.25</strong>
              <p>$3,050</p>
            </div>
          </div>
        </div>
        <div className={css.notice}>
          <span>Your </span>
          <Link href='/currency' className={css.link}>LHUS Account</Link>
          <span> has insufficient funds (LHUS 69.45). Deposit funds to your account and pay the invoice.</span>
        </div>
        <div className={css.actions}>
          <Button
            buttonClassName={css.declineAction}
            type={Button.TYPES.BUTTON}
            onClick={this.handleDecline}
            label='DECLINE'
          />
          <Button
            buttonClassName={css.payAction}
            type={Button.TYPES.BUTTON}
            onClick={this.handlePay}
            label='PAY'
          />
        </div>
      </div>
    ) : null
  }
}
