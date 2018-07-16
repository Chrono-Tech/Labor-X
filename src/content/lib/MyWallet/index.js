// @flow

import React from 'react'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

import { searchTransaction } from 'src/store/myWallet/actions'
import {getSearchTransactionLoading, getTransactions} from "../../../store/myWallet/selectors";
import { Transaction } from "../../../models/web3/Transaction";
import type {TransactionReceipt} from "../../../models/web3/TransactionReceipt";

import scConfig from 'config/sc-config.json'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const TRANSACTION_DIRECTION = {
  ACCOUNT_TO_CONTRACT: 'ACCOUNT_TO_CONTRACT',
  CONTRACT_TO_ACCOUNT: 'CONTRACT_TO_ACCOUNT',
}

type TransactionDirection = $Keys<typeof TRANSACTION_DIRECTION>

class MyWalletContent extends React.Component {

  componentDidMount () {
    this.props.searchTransaction()
  }

  renderTransaction ({ transaction: { from, to, value, hash }, transactionReceipt }: { transaction: Transaction, transactionReceipt: TransactionReceipt }) {

    const fromLowerCased = from.toLowerCase()
    const toLowerCased = to.toLowerCase()

    const direction = scConfig.hasOwnProperty(fromLowerCased) ? TRANSACTION_DIRECTION.CONTRACT_TO_ACCOUNT : TRANSACTION_DIRECTION.ACCOUNT_TO_CONTRACT

    switch (direction) {

      case TRANSACTION_DIRECTION.CONTRACT_TO_ACCOUNT:

        return (
          <ListItem>
            <Avatar src='/static/images/lht-icon.png' />
            <ListItemText primary={ value } secondary={ value } />
            <ListItemText primary={ `From contract ${ scConfig[fromLowerCased].name }` } secondary={ hash } />
          </ListItem>
        )

      case TRANSACTION_DIRECTION.ACCOUNT_TO_CONTRACT:

        const event = transactionReceipt.logs.length
          ? transactionReceipt.logs.map(log => log.topics[0]).map(sign => scConfig[toLowerCased].events[sign]).find(x => x).name
          : null

        return (
          <ListItem>
            <Avatar src='/static/images/lht-icon.png' />
            <ListItemText primary={ value } secondary={ `To contract ${ scConfig[toLowerCased].name }` } />
            <ListItemText
              primary={ event || 'Unknown event name' }
              secondary={
                <a href={`https://etherchain.parity.tp.ntr1x.com/tx/${ hash }`} target="_blank"/>
              }
            />
          </ListItem>
        )


    }

  }

  render () {
    if (this.props.searchTransactionLoading) return <CircularProgress />
    return this.props.transactions.length
      ?  <List>{ this.props.transactions.map(transaction => this.renderTransaction(transaction)) }</List>
      : 'No transactions'
  }

}

const mapStateToProps = state => ({
  searchTransactionLoading: getSearchTransactionLoading(state),
  transactions: getTransactions(state) || [],
})

const mapDispatchToProps = (dispatch) => ({
  searchTransaction: () => dispatch(searchTransaction())
})

export default connect(mapStateToProps, mapDispatchToProps)(MyWalletContent)