import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
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

  render () {
    const { signer, pocket } = this.props
    return signer && (
      <Widget
        title='My Funds'
        subtitle='General'
      >
        <div className={css.main}>
          <p className={css.address}>{signer.address}</p>
          <h2>{pocket.token.dao.token.symbol} <BalanceMicro pocket={pocket} /></h2>
          <div className={css.balanceUsd}>$<BalanceMicro toUsd pocket={pocket} /></div>
          <div className={css.actions}>
            <Button className={css.depositAction}>Deposit</Button>
            <Button className={css.withdrawAction}>Withdraw</Button>
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
