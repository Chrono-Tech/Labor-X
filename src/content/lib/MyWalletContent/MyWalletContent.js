import React from 'react'
import classNames from 'classnames'
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
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import BigNumber from 'bignumber.js'
import web3 from 'web3'

import css from './index.scss'

import css2 from './MyWalletContent.css'

import {
  getSelectInitialPropsLoading,
  selectInitialProps,
  selectMoreTransactions,
  getTransactionLogs,
  getSelectMoreTransactionsLoading,
  getLastBlockNumber,
} from "../../../store/my-wallet";
import Transaction, { DIRECTION } from "../../../api/web3/model/Transaction";
import {Icon} from "../../../components/common";
import {currentAddressSelector} from "../../../store";

const styles = {
  balanceCard: {
    position: 'relative',
    top: '-30px',
  },
  balanceCardHeader: {
    padding: '40px 30px'
  },
  balanceCardHeaderAvatar: {
    height: '50px',
    width: '50px',
  },
  balanceCardHeaderTitle: {
    fontSize: '35px',
    lineHeight: '42px',
    fontWeight: '500',
    color: '#333333'
  },
  balanceCardAction: {
    alignSelf: 'center',
    margin: 0
  },
  balanceCardHeaderSubheader: {
    color: '#7F7F7F',
    fontWeight: 300,
  },
  balanceCardButton: {
    borderRadius: '18px',
  },
  balanceCardButtonWithdraw: {
    marginLeft: '20px',
  },
  transactionsCard: {

  },
  transactionsCardHeaderTitle: {
    lineHeight: '24px',
    color: '#333333',
    fontSize: '20px',
    fontWeight: 500,
  },
  transactionValue: {
    color: '#333',
    fontWeight: 700,
    textAlign: 'right',
  },
  transactionValueTo: {
    color: '#68cc8e',
  },
  transactionValueFrom: {
    color: '#c25451',
  },
  transactionGasUsed: {
    color: '#c25451',
    textAlign: 'right',
  }
}

export class MyWalletContent extends React.Component {

  componentDidMount () {
    this.props.selectInitialProps()
  }

  handleMoreClick = () => {
    this.props.selectMoreTransactions()
  }

  renderTransactionDirection (direction) {
    switch (direction) {
      case DIRECTION.FROM:
        return 'Sent To'
      case DIRECTION.TO:
        return 'Received from'
    }
  }

  renderTransactionValue ({ value }, direction) {
    if (value === '0') {
      return <div className={this.props.classes.transactionValue}>LHT {value}</div>
    } else {
      switch (direction) {
        case DIRECTION.FROM:
          // return <div className={classNames(this.props.classes.transactionValue, this.props.classes.transactionValueFrom)}>- LHT {value.dividedBy(Math.pow(10, 18)).toFixed(18)}</div>
          return <div className={classNames(this.props.classes.transactionValue, this.props.classes.transactionValueFrom)}>- LHT {web3.utils.fromWei(value, 'ether')}</div>
        case DIRECTION.TO:
          // return <div className={classNames(this.props.classes.transactionValue, this.props.classes.transactionValueTo)}>+ LHT {value.dividedBy(Math.pow(10, 18)).toFixed(18)}</div>
          return <div className={classNames(this.props.classes.transactionValue, this.props.classes.transactionValueTo)}>+ LHT {web3.utils.fromWei(value, 'ether')}</div>
      }
    }
  }

  renderTransactionFee (transaction, direction) {
    const fee = new BigNumber(transaction.receipt.gasUsed).multipliedBy(transaction.gasPrice).toString()
    return direction === DIRECTION.FROM ? <div className={this.props.classes.transactionGasUsed}>- LHT {web3.utils.fromWei(fee, 'ether')}</div> : ''
  }

  renderTransaction (transaction: Transaction) {
    const direction = Transaction.getDirection(transaction, this.props.userAddress)
    const invertedDirection = Transaction.invertDirection(direction)
    return (
      <ListItem key={ transaction.hash } button href={`https://etherchain.parity.tp.ntr1x.com/tx/${ transaction.hash }`} target='_blank' component='a' divider>
        <Grid container>
          <Grid item xs={2}><Avatar src='/static/images/lht-icon.png' /></Grid>
          <Grid item xs={6}><ListItemText primary={this.renderTransactionDirection(direction)} secondary={transaction[invertedDirection.toLowerCase()]} /></Grid>
          <Grid item xs={4}><ListItemText primary={this.renderTransactionValue(transaction, direction)}  secondary={this.renderTransactionFee(transaction, direction)} /></Grid>
        </Grid>
      </ListItem>
    )
  }

  renderDayTransactions ([ day, transactions ]) {
    return [
      <Divider/>,
      <ListItem><ListItemText primary={ new Date(day).toLocaleDateString() } /></ListItem>,
      <Divider/>,
      ...(transactions.map((transaction) => this.renderTransaction(transaction)))
    ]
  }

  renderContent () {
    return (
      <div>
        <Card className={this.props.classes.balanceCard}>
          <CardHeader
            classes={{
              root: this.props.classes.balanceCardHeader,
              title: this.props.classes.balanceCardHeaderTitle,
              subheader: this.props.classes.balanceCardHeaderSubheader,
              action: this.props.classes.balanceCardAction,
            }}
            className={this.props.classes.balanceCardHeader}
            avatar={ <Avatar src='/static/images/lht-icon.png' className={this.props.classes.balanceCardHeaderAvatar} /> }
            action={
              <div>
                <Button variant="outlined" color="primary" className={this.props.classes.balanceCardButton}>Deposit</Button>
                <Button variant="contained" color="primary" className={classNames(this.props.classes.balanceCardButton, this.props.classes.balanceCardButtonWithdraw)}>Withdraw</Button>
              </div>
            }
            title='162.00'
            subheader='$4,860.00'
          />
          <Divider/>
          <CardActions>
            <Button size="small" color="primary">Manage funds in ChronoWallet </Button>
          </CardActions>
        </Card>
        <Card>
          <CardHeader title='Transactions' classes={{ title: this.props.classes.transactionsCardHeaderTitle }} />
          <List>
            {
              Object.keys(this.props.transactionLogs).length
                ? Object.entries(this.props.transactionLogs).map((dayTransactions) => this.renderDayTransactions(dayTransactions))
                : [ <Divider/>, <ListItem><ListItemText primary='No transactions in loaded blocks' /></ListItem> ]
            }
            <Divider/>
            <ListItem button onClick={this.handleMoreClick} disabled={this.props.selectMoreTransactionsLoading}>
              <ListItemText primary={ <Typography align="center">More (Block below { this.props.lastBlockNumber })</Typography> } />
            </ListItem>
          </List>
        </Card>
      </div>
    )
  }

  render () {
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css2.headerInner}>
            <h1 className={css2.title}>My Funds</h1>
            <Grid container>
              <Grid item xs='4'>
                <h3 className={classNames(css2.headerMoneyHeader, css2.headerMoneyHeaderBold)}><Icon icon={Icon.ICONS.LHT_BOLD} />&nbsp;166.7</h3>
                <h5 className={classNames(css2.headerMoneySubheader, css2.headerMoneySubheaderBold)}>Total ($5,000.00)</h5>
              </Grid>
              <Grid item xs='4'>
                <h3 className={css2.headerMoneyHeader}><Icon icon={Icon.ICONS.LHT_LIGHT} />&nbsp;166.7</h3>
                <h5 className={css2.headerMoneySubheader}>Received ($5,000.00)</h5>
              </Grid>
              <Grid item xs='4'>
                <h3 className={css2.headerMoneyHeader}><Icon icon={Icon.ICONS.LHT_LIGHT} />&nbsp;166.7</h3>
                <h5 className={css2.headerMoneySubheader}>Withdrawn ($5,000.00)</h5>
              </Grid>
            </Grid>
          </div>
        </div>
        <div className={css.content}>

          { this.props.selectInitialPropsLoading ? <CircularProgress /> : this.renderContent() }
        </div>
      </div>
    )
  }

}

MyWalletContent = withStyles(styles)(MyWalletContent)

const mapStateToProps = state => ({
  userAddress: currentAddressSelector()(state),
  selectInitialPropsLoading: getSelectInitialPropsLoading(state),
  transactionLogs: getTransactionLogs(state),
  lastBlockNumber: getLastBlockNumber(state),
  selectMoreTransactionsLoading: getSelectMoreTransactionsLoading(state),
})

const mapDispatchToProps = dispatch => ({
  selectInitialProps: () => dispatch(selectInitialProps()),
  selectMoreTransactions: () => dispatch(selectMoreTransactions()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyWalletContent)
