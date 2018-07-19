import React from 'react'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import withStyles from '@material-ui/core/styles/withStyles'

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

const styles = () => ({
  balanceCardRoot: {
    position
  },
  balanceListItem: {
    padding: '40px 30px'
  },
  balanceListItemAvatar: {
    height: '50px',
    width: '50px',
  },
  balanceListItemTextPrimary: {
    fontSize: '35px',
    lineHeight: '42px',
    fontWeight: 500,
    color: '#333333',
  }
})


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
          <Card className={this.props.classes.balanceCardRoot}>
            <CardHeader
              avatar={ <Avatar src='/static/images/lht-icon.png' className={this.props.classes.balanceListItemAvatar} /> }
              action={ <div><Button>Deposit</Button><Button>Withdraw</Button></div>}
              title="Shrimp and Chorizo Paella"
              subheader="September 14, 2016"
            />
            <ListItem className={this.props.classes.balanceListItem} component='div'>
              <Avatar src='/static/images/lht-icon.png' className={this.props.classes.balanceListItemAvatar} />
              <ListItemText primary='162.00' secondary='$4,860.00' classes={{ primary: this.props.classes.balanceListItemTextPrimary }} />
              <ListItemSecondaryAction>
                <Button>Deposit</Button>
                <Button>Withdraw</Button>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider/>
            <CardActions>
              <Button component='a' href='https://chronobank.io/' target='_blank'>Manage funds in ChronoWallet</Button>
            </CardActions>
          </Card>
          <br/>
          <br/>
          { this.props.selectInitialPropsLoading ? <CircularProgress /> : this.renderContent() }
        </div>
      </div>
    )
  }

}

MyWalletContent = withStyles(styles)(MyWalletContent)

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

MyWalletContent = connect(mapStateToProps, mapDispatchToProps)(MyWalletContent)

export default MyWalletContent
