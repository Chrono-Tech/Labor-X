import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
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
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import BigNumber from 'bignumber.js'
import Form from 'redux-form/lib/Form'
import Field from 'redux-form/lib/Field'
import reduxForm from 'redux-form/lib/reduxForm'
import TextField from 'redux-form-material-ui-next/lib/TextField'
import SliderField from './../../../components/SliderField'


import web3 from 'web3'
var QRCode = require('qrcode.react');

import css from './index.scss'

import css2 from './MyWalletContent.css'

import {
  getSelectInitialPropsLoading,
  selectInitialProps,
  selectMoreTransactions,
  getTransactionLogs,
  getSelectMoreTransactionsLoading,
  getLastBlockNumber,
  showDepositDialog,
  hideDepositDialog,
  showWithdrawDialog,
  hideWithdrawDialog,
  getOpenDepositDialog,
  getOpenWithdrawDialog,
  WITHDRAW_FORM,
  getEstimatedGas,
  estimateGas,
  getGasLimit,
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
  },
  withdrawDialogPaper: {
    width: '340px',
  },
  withdrawDialogTitle: {
    backgroundColor: '#0088C3',
    color: 'white',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '30px',
    paddingTop: '15px',
    paddingBottom: '15px',
  },
  withdrawDialogTitleImg: {
    width: '30px',
    verticalAlign: 'middle',
    position: 'relative',
    top: '-2px',
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
                <Button variant="outlined" color="primary" className={this.props.classes.balanceCardButton} onClick={this.props.showDepositDialog}>Deposit</Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classNames(this.props.classes.balanceCardButton, this.props.classes.balanceCardButtonWithdraw)}
                  onClick={this.props.showWithdrawDialog}>Withdraw</Button>
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

  renderDepositDialog () {
    return (
      <Dialog open={this.props.openDepositDialog}>
        <DialogTitle id="simple-dialog-title">Deposit LHT</DialogTitle>
        <DialogContent>
          <p>IMPORTANT!</p>
          <p>You should deposit only LHT to the address on next screen.</p>
          <p>Depositing any other currency will make your deposit loss.</p>
          <p>Click Proceed to get address for funds deposit and give the address to your sender.</p>
          <QRCode value={this.props.userAddress} />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.hideDepositDialog} color="primary">Cancel</Button>
          <Button onClick={this.handleClose} color="primary">Proceed</Button>
        </DialogActions>
      </Dialog>
    )
  }

  renderWithdrawDialog () {
    return (
      <Dialog open={this.props.openWithdrawDialog} classes={{ paper: this.props.classes.withdrawDialogPaper }}>
        <DialogTitle className={this.props.classes.withdrawDialogTitle} disableTypography>
          <img src='/static/images/lht-icon.png' className={this.props.classes.withdrawDialogTitleImg} />
          &nbsp;
          &nbsp;
          Withdraw LHT
        </DialogTitle>
        <DialogContent>
          <Form>
            <br/>
            <Field name='to' component={TextField} label='Recipient Address' />
            <br/>
            <br/>
            <Field name='value' component={TextField} label='Amount' />
            <br/>
            <br/>
            <Field name='comment' component={TextField} label='Comment (optional)' />
            <br/>
            <br/>
            <br/>
            <Grid container>
              <Grid item xs='6'>Lower Fee</Grid>
              <Grid item xs='6' style={{ textAlign: 'right' }}>Faster Transfer</Grid>
            </Grid>
            <Field name='gas' component={SliderField} min={21000} max={this.props.gasLimit} />
            <br/>
            <br/>
            <p>Fee: LHT {this.props.estimatedGas}</p>
            <br/>
          </Form>
        </DialogContent>
        <Divider/>
        <DialogActions>
          <Button onClick={this.props.hideWithdrawDialog} color="primary">Cancel</Button>
          <Button onClick={this.handleClose} color="primary">Proceed</Button>
        </DialogActions>
      </Dialog>
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
        {this.renderDepositDialog()}
        {this.renderWithdrawDialog()}
      </div>
    )
  }

}

MyWalletContent = withStyles(styles)(MyWalletContent)

MyWalletContent = reduxForm({
  form: WITHDRAW_FORM,
  onChange: (values, dispatch, props) => props.estimateGas(),
})(MyWalletContent)

const mapStateToProps = state => ({
  userAddress: currentAddressSelector()(state),
  selectInitialPropsLoading: getSelectInitialPropsLoading(state),
  transactionLogs: getTransactionLogs(state),
  lastBlockNumber: getLastBlockNumber(state),
  selectMoreTransactionsLoading: getSelectMoreTransactionsLoading(state),
  openDepositDialog: getOpenDepositDialog(state),
  openWithdrawDialog: getOpenWithdrawDialog(state),
  estimatedGas: getEstimatedGas(state),
  gasLimit: getGasLimit(state),
})

const mapDispatchToProps = dispatch => ({
  selectInitialProps: () => dispatch(selectInitialProps()),
  selectMoreTransactions: () => dispatch(selectMoreTransactions()),
  showDepositDialog: () => dispatch(showDepositDialog()),
  hideDepositDialog: () => dispatch(hideDepositDialog()),
  showWithdrawDialog: () => dispatch(showWithdrawDialog()),
  hideWithdrawDialog: () => dispatch(hideWithdrawDialog()),
  estimateGas: () => dispatch(estimateGas())
})

export default connect(mapStateToProps, mapDispatchToProps)(MyWalletContent)
