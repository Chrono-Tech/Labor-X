import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import { Button, Link } from 'src/components/common'
import { JobModel } from 'src/models'
import ProfileModel from 'src/api/backend/model/ProfileModel'

import css from './PayInvoiceDialog.scss'
import { pay, decline } from "../../../store"

const dateFormat = 'DD.MM.YYYY'

class PayInvoiceDialog extends React.Component {
  static propTypes = {
    job: PropTypes.instanceOf(JobModel),
    worker: PropTypes.instanceOf(ProfileModel),
    pay: PropTypes.func.isRequired,
    decline: PropTypes.func.isRequired,
    cancelJob: PropTypes.func.isRequired,
  }

  handlePay = () => {
    this.props.pay()
  }

  handleDecline = () => {
    this.props.decline()
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
            <p>{job.ipfs.budget.award && `LHUS ${job.ipfs.budget.award.toFixed(2)}`}</p>
          </div>
          <div className={css.invoiceRow}>
            <p>Gas Tubes</p>
            <p>$10.00</p>
          </div>
          <div className={css.totalRow}>
            <strong>Total</strong>
            <div className={css.totalPrice}>
              <strong>{job.ipfs.budget.award && `LHUS ${job.ipfs.budget.award.toFixed(2)}`}</strong>
              <p>{`$${job.ipfs.budget.awardUSD && job.ipfs.budget.awardUSD.toString()}`}</p>
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

const mapDispatchToProps = (dispatch, ownProps) => ({
  pay: () => dispatch(pay(ownProps.job.ipfs.budget.flowType , ownProps.job.id)),
  decline: () => dispatch(decline(ownProps.job.ipfs.budget.flowType , ownProps.job.id)),
})

export default connect(null, mapDispatchToProps)(PayInvoiceDialog)
