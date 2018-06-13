import React from 'react'
import PropTypes from 'prop-types'
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
        subtitle='Account'
      >
        <div className={css.main}>
          <span>{signer.address}</span>&nbsp;
          <b>{pocket.token.dao.token.symbol} <BalanceMicro pocket={pocket} /></b>
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

function mapDispatchToProps (/*dispatch*/) {
  return {
    // stack: state.modals.stack,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyFundsWidget)
