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
        subtitle='General'
      >
        <div className={css.main}>
          <p>{signer.address}</p>
          <h3><BalanceMicro pocket={pocket} /></h3>
          <b>{pocket.token.dao.token.symbol}</b>
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
