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

// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormLabel from '@material-ui/core/FormLabel';
// import FormControl from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormLabel';


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
  showDepositWarningDialog,
  hideDepositWarningDialog,
  showWithdrawDialog,
  hideDepositDialog,
  hideWithdrawDialog,
  hideWithdrawConfirmDialog,
  depositWarningDialogSubmit,
  withdrawDialogSubmit,
  withdrawConfirmDialogSubmit,
  getOpenDepositWarningDialog,
  getOpenDepositDialog,
  getOpenWithdrawDialog,
  getOpenWithdrawConfirmDialog,
  WITHDRAW_FORM,
  getEstimatedGas,
  estimateGas,
  getGasLimit,
  getWithdrawFormValues,
  depositDialogCopyAddress,

  getWithdrawValueView,
  getWithdrawValueUsdView,

  getWithdrawFeeView,
  getWithdrawFeeUsdView,

  getWithdrawTotalView,
  getWithdrawTotalUsdView,

  getWithdrawBalanceAfterView,
  getWithdrawBalanceAfterUsdView,

  getBalanceView,
  getBalanceUsdView,

  DIALOG_TRANSITION_DURATION,

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
  dialogPaper: {
    width: '340px',
  },
  dialogTitle: {
    backgroundColor: '#0088C3',
    color: 'white',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '30px',
    paddingTop: '15px',
    paddingBottom: '15px',
  },
  withdrawDialogTextField: {
    width: '100%',
  }
}

export class MyWalletContent extends React.Component {

  // componentDidMount () {
  //   this.props.selectInitialProps()
  // }

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

  renderDepositWarningDialog () {
    return (
      <Dialog open={this.props.openDepositWarningDialog} classes={{ paper: css2.dialogPaper }} transitionDuration={DIALOG_TRANSITION_DURATION}>
        <DialogTitle className={css2.dialogTitle} disableTypography>Deposit LHT</DialogTitle>
        <DialogContent className={css2.depositWarningDialogContent}>
          <div className={css2.depositWarningDialogContentImportantTitle}>IMPORTANT!</div>
          <p className={css2.depositWarningDialogContentParagraph}>You should deposit only <span className={css2.depositWarningDialogContentParagraphLht}>LHT</span> to the address on next screen.</p>
          <p className={css2.depositWarningDialogContentParagraph}>Depositing any other currency will make your deposit loss.</p>
          <p className={css2.depositWarningDialogContentParagraph}>Click Proceed to get address for funds deposit and give the address to your sender.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.hideDepositWarningDialog} color="primary">Cancel</Button>
          <Button onClick={this.props.depositWarningDialogSubmit} color="primary">Proceed</Button>
        </DialogActions>
      </Dialog>
    )
  }

  renderDepositDialog () {
    return (
      <Dialog open={this.props.openDepositDialog} classes={{ paper: css2.dialogPaper }} transitionDuration={DIALOG_TRANSITION_DURATION}>
        <DialogTitle className={css2.dialogTitle} disableTypography>Deposit LHT</DialogTitle>
        <DialogContent>
          <br/>
          <br/>
          <FormLabel>Your Address to Receive Funds</FormLabel>
          <br/>
          <br/>
          <div>{this.props.userAddress}</div>
          <br/>
          <br/>
          <FormLabel>Your Address QR Code</FormLabel>
          <br/>
          <br/>
          <QRCode value={this.props.userAddress} />
          <br/>
          <br/>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.hideDepositDialog} color="primary">Cancel</Button>
          <Button onClick={this.props.depositDialogCopyAddress} color="primary">Copy Address</Button>
        </DialogActions>
      </Dialog>
    )
  }

  renderWithdrawDialog () {
    return (
      <Dialog open={this.props.openWithdrawDialog} classes={{ paper: css2.dialogPaper }} transitionDuration={DIALOG_TRANSITION_DURATION}>
        <DialogTitle className={css2.dialogTitle} disableTypography>Withdraw LHT</DialogTitle>
        <DialogContent>
          <Form>
            <br/>
            <Field name='to' component={TextField} label='Recipient Address' className={this.props.classes.withdrawDialogTextField} />
            <br/>
            <br/>
            <Field name='value' component={TextField} label='Amount' className={this.props.classes.withdrawDialogTextField} />
            <br/>
            <br/>
            <Field name='comment' component={TextField} label='Comment (optional)' className={this.props.classes.withdrawDialogTextField} />
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
            <div>Fee: LHT {this.props.withdrawFeeView}</div>
            <div>≈${this.props.withdrawFeeUsdView}</div>
          </Form>
        </DialogContent>
        <Divider/>
        <DialogActions>
          <Button onClick={this.props.hideWithdrawDialog} color="primary">Cancel</Button>
          <Button onClick={this.props.withdrawDialogSubmit} color="primary">Proceed</Button>
        </DialogActions>
      </Dialog>
    )
  }

  renderWithdrawConfirmDialog () {
    return (
      <Dialog open={this.props.openWithdrawConfirmDialog} classes={{ paper: css2.dialogPaper }} transitionDuration={DIALOG_TRANSITION_DURATION}>
        <DialogTitle className={css2.dialogTitle} disableTypography>Confirm Withdraw</DialogTitle>
        <DialogContent>
          <br/>
          <FormLabel>Recipient Address</FormLabel>
          <br/>
          <br/>
          <div>{this.props.withdrawFormValues.to}</div>
          <br/>
          <FormLabel>Amount</FormLabel>
          <br/>
          <br/>
          <Grid container>
            <Grid item xs='6' className={css2.withdrawConfirmDialogValue}>LHT {this.props.withdrawValueView}</Grid>
            <Grid item xs='6' className={css2.withdrawConfirmDialogUsdValue}>≈${this.props.withdrawValueUsdView}</Grid>
          </Grid>
          <br/>
          <FormLabel>Fee</FormLabel>
          <br/>
          <br/>
          <Grid container>
            <Grid item xs='6'>LHT {this.props.withdrawFeeView}</Grid>
            <Grid item xs='6' className={css2.withdrawConfirmDialogUsdValue}>≈${this.props.withdrawFeeUsdView}</Grid>
          </Grid>
          <br/>
          <br/>
          <FormLabel>Total</FormLabel>
          <br/>
          <br/>
          <Grid container>
            <Grid item xs='6'>LHT {this.props.withdrawTotalView}</Grid>
            <Grid item xs='6' className={css2.withdrawConfirmDialogUsdValue}>≈${this.props.withdrawTotalUsdView}</Grid>
          </Grid>
          <br/>
          <br/>
          <FormLabel>Balance After</FormLabel>
          <br/>
          <br/>
          <Grid container>
            <Grid item xs='6'>LHT {this.props.withdrawBalanceAfterView}</Grid>
            <Grid item xs='6' className={css2.withdrawConfirmDialogUsdValue}>≈${this.props.withdrawBalanceAfterUsdView}</Grid>
          </Grid>
          <br/>
        </DialogContent>
        <Divider/>
        <DialogActions>
          <Button onClick={this.props.hideWithdrawConfirmDialog} color="primary">Cancel</Button>
          <Button onClick={this.props.withdrawConfirmDialogSubmit} color="primary">Confirm</Button>
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
            {/*<Grid container>*/}
              {/*<Grid item xs='4'>*/}
                {/*<h3 className={classNames(css2.headerMoneyHeader, css2.headerMoneyHeaderBold)}><Icon icon={Icon.ICONS.LHT_BOLD} />&nbsp;166.7</h3>*/}
                {/*<h5 className={classNames(css2.headerMoneySubheader, css2.headerMoneySubheaderBold)}>Total ($5,000.00)</h5>*/}
              {/*</Grid>*/}
              {/*<Grid item xs='4'>*/}
                {/*<h3 className={css2.headerMoneyHeader}><Icon icon={Icon.ICONS.LHT_LIGHT} />&nbsp;166.7</h3>*/}
                {/*<h5 className={css2.headerMoneySubheader}>Received ($5,000.00)</h5>*/}
              {/*</Grid>*/}
              {/*<Grid item xs='4'>*/}
                {/*<h3 className={css2.headerMoneyHeader}><Icon icon={Icon.ICONS.LHT_LIGHT} />&nbsp;166.7</h3>*/}
                {/*<h5 className={css2.headerMoneySubheader}>Withdrawn ($5,000.00)</h5>*/}
              {/*</Grid>*/}
            {/*</Grid>*/}
          </div>
        </div>
        <div className={css.content}>
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
                    <Button variant="outlined" color="primary" className={this.props.classes.balanceCardButton} onClick={this.props.showDepositWarningDialog}>Deposit</Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classNames(this.props.classes.balanceCardButton, this.props.classes.balanceCardButtonWithdraw)}
                      onClick={this.props.showWithdrawDialog}>Withdraw</Button>
                  </div>
                }
                title={this.props.balanceView}
                subheader={`$${this.props.balanceUsdView}`}
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
        </div>
        {this.renderDepositWarningDialog()}
        {this.renderDepositDialog()}
        {this.renderWithdrawDialog()}
        {this.renderWithdrawConfirmDialog()}
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
  openDepositWarningDialog: getOpenDepositWarningDialog(state),
  openDepositDialog: getOpenDepositDialog(state),
  openWithdrawDialog: getOpenWithdrawDialog(state),
  openWithdrawConfirmDialog: getOpenWithdrawConfirmDialog(state),
  estimatedGas: getEstimatedGas(state),
  gasLimit: getGasLimit(state),
  withdrawFormValues: getWithdrawFormValues(state),

  withdrawValueView: getWithdrawValueView(state),
  withdrawValueUsdView: getWithdrawValueUsdView(state),
  withdrawFeeView: getWithdrawFeeView(state),
  withdrawFeeUsdView: getWithdrawFeeUsdView(state),
  withdrawTotalView: getWithdrawTotalView(state),
  withdrawTotalUsdView: getWithdrawTotalUsdView(state),
  withdrawBalanceAfterView: getWithdrawBalanceAfterView(state),
  withdrawBalanceAfterUsdView: getWithdrawBalanceAfterUsdView(state),

  balanceView: getBalanceView(state),
  balanceUsdView: getBalanceUsdView(state),
})

const mapDispatchToProps = dispatch => ({
  showDepositWarningDialog: () => dispatch(showDepositWarningDialog()),
  showWithdrawDialog: () => dispatch(showWithdrawDialog()),
  hideDepositWarningDialog: () => dispatch(hideDepositWarningDialog()),
  hideDepositDialog: () => dispatch(hideDepositDialog()),
  hideWithdrawDialog: () => dispatch(hideWithdrawDialog()),
  hideWithdrawConfirmDialog: () => dispatch(hideWithdrawConfirmDialog()),
  selectInitialProps: () => dispatch(selectInitialProps()),
  selectMoreTransactions: () => dispatch(selectMoreTransactions()),
  estimateGas: () => dispatch(estimateGas()),
  depositWarningDialogSubmit: () => dispatch(depositWarningDialogSubmit()),
  depositDialogCopyAddress: () => dispatch(depositDialogCopyAddress()),
  withdrawDialogSubmit: () => dispatch(withdrawDialogSubmit()),
  withdrawConfirmDialogSubmit: () => dispatch(withdrawConfirmDialogSubmit()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyWalletContent)
