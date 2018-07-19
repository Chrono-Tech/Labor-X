import React from 'react'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'

import css from './index.scss'
import {
  getSelectInitialPropsLoading,
  selectInitialProps,
  selectMoreTransactions,
  getTransactionHistory,
  getSelectMoreTransactionsLoading,
  getLastBlockNumber,
} from "../../../store/my-wallet";
import type {Transaction} from "../../../api/web3/model/Transaction";
import {JobModel} from "../../../models";

export class MyWalletContent extends React.Component {

  componentDidMount () {
    this.props.selectInitialProps()
  }

  handleMoreClick = () => {
    this.props.selectMoreTransactions()
  }

  renderTransactionLog ({ transaction, job }: { transaction: Transaction, job: JobModel }) {
    return (
      <ListItem key={ transaction.hash } button href={`https://etherchain.parity.tp.ntr1x.com/tx/${ transaction.hash }`} target='_blank' component='a' divider>
        <Grid container>
          <Grid item xs={2}><Avatar src='/static/images/lht-icon.png' /></Grid>
          <Grid item xs={2}><ListItemText primary={`- LHT ${ transaction.value }`} secondary='~$30.00' /></Grid>
          <Grid item xs={8}><ListItemText primary={ job.ipfs.name } secondary={ transaction.hash } /></Grid>
        </Grid>
      </ListItem>
    )
  }

  renderDayTransactionLogs ([ day, transactionLogs ]) {
    return [
      <Divider/>,
      <ListItem><ListItemText primary={ new Date(day).toLocaleDateString() } /></ListItem>,
      <Divider/>,
      ...(transactionLogs.map((transactionLog) => this.renderTransactionLog(transactionLog)))
    ]
  }

  renderContent () {
    const transactionHistory = Object.entries(this.props.transactionHistory)
    return (
      <Card>
        <CardHeader title={ <Typography variant='display1'>Transactions</Typography> } />
        <List>
          {
            transactionHistory.length
              ? transactionHistory.map((dayTransactionLogs) => this.renderDayTransactionLogs(dayTransactionLogs))
              : <ListItem><ListItemText primary='No transactions in loaded blocks' /></ListItem>
          }
          <Divider/>
          <ListItem button onClick={this.handleMoreClick} disabled={this.props.selectMoreTransactionsLoading}>
            <ListItemText primary={ <Typography align="center">More (Block below { this.props.blockNumber })</Typography> } />
          </ListItem>
        </List>
      </Card>
    )
  }

  render () {
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}>My Funds</div>
        </div>
        <div className={css.content}>
          <br/>
          <br/>
          { this.props.selectInitialPropsLoading ? <CircularProgress /> : this.renderContent() }
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  selectInitialPropsLoading: getSelectInitialPropsLoading(state),
  transactionHistory: getTransactionHistory(state),
  blockNumber: getLastBlockNumber(state),
  selectMoreTransactionsLoading: getSelectMoreTransactionsLoading(state),
})

const mapDispatchToProps = dispatch => ({
  selectInitialProps: () => dispatch(selectInitialProps()),
  selectMoreTransactions: () => dispatch(selectMoreTransactions()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyWalletContent)
