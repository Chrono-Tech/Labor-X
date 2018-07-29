import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { Widget } from 'src/components/common'
import { BalanceMicro } from 'src/micros'
import { SignerModel, PocketModel } from 'src/models'
import { signerSelector, ethPocketSelector } from 'src/store'
import css from './MyFundsWidget.scss'

export class MyFundsWidget extends React.Component {
  static propTypes = {
    signer: PropTypes.instanceOf(SignerModel).isRequired,
    pocket: PropTypes.instanceOf(PocketModel).isRequired,
  }

  handleDeposit = () => {
    // eslint-disable-next-line no-console
    console.log('MyFundsWidget--handleDeposit')
  }

  handleWithdraw = () => {
    // eslint-disable-next-line no-console
    console.log('MyFundsWidget--handleWithdraw')
  }

  render () {
    const { signer, pocket } = this.props
    return signer && (
      <Widget
        title='My Funds'
        subtitle='General'
      >
        <div className={css.main}>
          <p className={css.address}>{signer.address}</p>
          <div className={css.balance}>{pocket.token.dao.token.symbol} <BalanceMicro pocket={pocket} /></div>
          <div className={css.balanceUsd}>$<BalanceMicro toUsd pocket={pocket} /></div>
          <div className={css.actions}>
            <Button className={css.actionDeposit} onClick={this.handleDeposit}>Deposit</Button>
            <Button className={css.actionWithdraw} onClick={this.handleWithdraw}>Withdraw</Button>
          </div>
        </div>
      </Widget>
    )
  }
}

function mapStateToProps (state) {
  const signer = signerSelector()(state)
  const pocket = ethPocketSelector(signer.address)(state)
  return {
    signer,
    pocket,
  }
}

export default connect(mapStateToProps, null)(MyFundsWidget)
