// @flow

import React from 'react'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

import { searchTransaction } from 'src/store/myWallet/actions'
import {getSearchTransactionLoading, getTransactions} from "../../../store/myWallet/selectors";
import { Transaction } from "../../../api/web3/model/Transaction";
import type {TransactionReceipt} from "../../../api/web3/model/TransactionReceipt";

import scConfig from 'config/sc-config.json'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Icon} from "../../../components/common";
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

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
    // if (this.props.searchTransactionLoading) return <CircularProgress />
    // return this.props.transactions.length
    //   ?  <List>{ this.props.transactions.map(transaction => this.renderTransaction(transaction)) }</List>
    //   : 'No transactions'
    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="display4" gutterBottom>
              My Funds
            </Typography>
          </Grid>
          <br/>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardHeader title='Transactions' />
              <Divider/>
              20 Dec, 2017
              <Divider/>
              <List>
                <Divider/>
                <ListItem>
                  <Avatar src='/static/images/lht-icon.png' />
                  <ListItemText primary={ 'test' } secondary={ `To contract` } />
                  <ListItemText
                    primary={ event || 'Unknown event name' }
                    secondary={
                      <a href={`https://etherchain.parity.tp.ntr1x.com/tx/${ 111 }`} target="_blank"/>
                    }
                  />
                </ListItem>
              </List>
            </Card>
          </Grid>
          <br/>
        </Grid>
      </div>
    )
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