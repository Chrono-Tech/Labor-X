import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { formatNumber } from 'accounting'
import { Action, Image } from 'components/common'
import { BalanceMicro } from 'src/micros'
import { SignerModel, PocketModel } from 'src/models'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import { MuiThemeProvider } from 'material-ui/styles'
import { signerSelector, ethPocketSelector, balanceByPocket } from 'src/store'

import css from './BalanceCollapsible.scss'
import { BalanceModel } from 'src/models'

class BalanceCollapsible extends React.Component {
  static propTypes = {
    pocket: PropTypes.instanceOf(PocketModel).isRequired,
    balance: PropTypes.instanceOf(BalanceModel),
  }

  getBalance (){
    const { balance } = this.props

    const lhrCurrency = 25

    return formatNumber(balance.amount * lhrCurrency, 2)
  }
  render (){
    const { pocket, balance } = this.props

    return (
      <MuiThemeProvider>
        <Card className={css.collapseWrapper} style={{ boxShadow: 'none' }} initiallyExpanded>
          <CardHeader
            style={{ padding: '8px 9px 21px 21px', borderBottom: '1px solid #F0F0F0' }}
            titleStyle={{ padding: 0 }}
            actAsExpander
          >
            <div className={css.myFundsHeader}>
              <span>My Funds</span>
              <span className={css.myFundsSum}>≈ { this.getBalance() }</span>
            </div>
          </CardHeader>
          <CardText className={css.collapseText} style={{ padding: 0 }} expandable>
            <div className={css.tokenBlock}>
              <div className={css.flexRow}>
                <Image className={css.tokenImage} href={Image.TOKENS.LHR} />
                <div className={css.tokenName}>{pocket.token.dao.token.name}</div>
              </div>
              <div className={css.flexRow}>
                <div className={css.tokenBalance}><BalanceMicro pocket={pocket} /></div>
                <span className={css.myFundsSum}>${ this.getBalance() }</span>
              </div>
            </div>
          </CardText>
        </Card>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = (state, op) => {
  const signer = signerSelector()(state)
  const pocket = ethPocketSelector(signer.address)(state)
  const balance = balanceByPocket(pocket)(state)

  return {
    signer,
    pocket,
    balance,
  }
}

export default connect(mapStateToProps)(BalanceCollapsible)
