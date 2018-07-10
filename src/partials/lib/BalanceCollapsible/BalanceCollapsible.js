import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { formatMoney, formatNumber } from 'accounting'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Image } from 'components/common'
import { PocketModel, BalanceModel, CurrencyModel } from 'src/models'
import { signerSelector, ethPocketSelector, balanceByPocket, currencySelector } from 'src/store'

import css from './BalanceCollapsible.scss'

class BalanceCollapsible extends React.Component {
  static propTypes = {
    pocket: PropTypes.instanceOf(PocketModel).isRequired,
    balance: PropTypes.instanceOf(BalanceModel),
    currencyLHR: PropTypes.instanceOf(CurrencyModel),
  }

  getBalanceSum (){
    const { balance, currencyLHR } = this.props

    const lhrCurrency = currencyLHR && currencyLHR.value && currencyLHR.value.multipliedBy(balance.value) || 0

    return formatMoney(lhrCurrency, "$", 2, ",", ".")
  }

  getBalance (){
    const { balance } = this.props

    return formatNumber(balance.value)
  }

  render (){
    const { pocket } = this.props

    return (
      <ExpansionPanel style={{ width:'100%', marginTop:0 }}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={css.myFundsHeader}>
            <span>My Funds</span>
            <span className={css.myFundsSum}>≈ { this.getBalanceSum() }</span>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div>
            <div className={css.tokenBlock}>
              <div className={[css.flexRow, css.flexRowTokenName].join(' ')}>
                <Image className={css.tokenImage} href={Image.TOKENS.LHR} />
                <div className={css.tokenName}>{pocket.token.dao.token.name}</div>
              </div>
              <div className={[css.flexRow, css.flexRowTokenBalance].join(' ')}>
                <div className={css.tokenBalance}>{ this.getBalance() }</div>
                <span className={css.myFundsSum}>{ this.getBalanceSum() }</span>
              </div>
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

const mapStateToProps = (state) => {
  const signer = signerSelector()(state)
  const pocket = ethPocketSelector(signer.address)(state)
  const balance = balanceByPocket(pocket)(state)
  const currencyLHR = currencySelector('lhr')(state)

  return {
    pocket,
    balance,
    currencyLHR,
  }
}

export default connect(mapStateToProps)(BalanceCollapsible)
