import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { formatNumber } from 'accounting'
import { PocketModel, BalanceModel } from 'src/models'
import { balanceByPocket } from 'src/store'
import css from './BalanceMicro.scss'

export class BalanceMicro extends React.Component {
  static propTypes = {
    pocket: PropTypes.instanceOf(PocketModel).isRequired,
    balance: PropTypes.instanceOf(BalanceModel),
    children: PropTypes.func,
    toUsd: PropTypes.bool,
  }

  render () {
    const { pocket, balance, children, toUsd } = this.props
    return pocket && (
      <div className={css.main}>
        {balance && balance.isLoaded
          ? (
            children != null
              ? children(balance)
              : toUsd
                ? formatNumber(balance.amount.times(30), 2)
                : formatNumber(balance.amount, 2)
          )
          : null
        }
      </div>
    )
  }
}

function mapStateToProps (state, op) {
  const balance = balanceByPocket(op.pocket)(state)
  return {
    balance,
  }
}

export default connect(mapStateToProps)(BalanceMicro)
