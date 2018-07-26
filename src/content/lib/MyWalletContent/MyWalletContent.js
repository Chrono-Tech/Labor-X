// @flow

import React from 'react'
import PropTypes from 'prop-types'
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
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import BigNumber from 'bignumber.js'
import Form from 'redux-form/lib/Form'
import Field from 'redux-form/lib/Field'
import reduxForm from 'redux-form/lib/reduxForm'
import TextField from 'redux-form-material-ui-next/lib/TextField'
import FormLabel from '@material-ui/core/FormLabel'
import QRCode from 'qrcode.react'
import web3 from 'web3'

import SliderField from 'src/components/SliderField'
import Transaction, { DIRECTION, propTypes as TransactionPropTypes } from "src/api/web3/model/Transaction"
import { currentAddressSelector } from "src/store"

import {
  WITHDRAW_FORM,
  DIALOG_TRANSITION_DURATION,
} from "src/store/my-wallet/constants"
import {
  getSelectInitialPropsLoading,
  getTransactionLogs,
  getSelectMoreTransactionsLoading,
  getLastBlockNumber,
  getWithdrawValues,
  getOpenDepositWarningDialog,
  getOpenDepositDialog,
  getOpenWithdrawDialog,
  getOpenWithdrawConfirmDialog,
  getGasLimit,
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
} from 'src/store/my-wallet/selectors'
import {
  selectInitialProps,
  selectMoreTransactions,
  showDepositWarningDialog,
  hideDepositWarningDialog,
  showWithdrawDialog,
  hideDepositDialog,
  hideWithdrawDialog,
  hideWithdrawConfirmDialog,
  depositWarningDialogSubmit,
  withdrawDialogSubmit,
  withdrawConfirmDialogSubmit,
  estimateGas,
  depositDialogCopyAddress,
} from 'src/store/my-wallet/actions'

import css from './index.scss'
import css2 from './MyWalletContent.css'

export class MyWalletContent extends React.Component {

  static propTypes = {
    userAddress: PropTypes.string.isRequired,
    selectInitialPropsLoading: PropTypes.bool.isRequired,
    transactionLogs: PropTypes.objectOf(PropTypes.arrayOf(TransactionPropTypes)),
    lastBlockNumber: PropTypes.string.isRequired,
    selectMoreTransactionsLoading: PropTypes.bool.isRequired,
    openDepositWarningDialog: PropTypes.bool.isRequired,
    openDepositDialog: PropTypes.bool.isRequired,
    openWithdrawDialog: PropTypes.bool.isRequired,
    openWithdrawConfirmDialog: PropTypes.bool.isRequired,
    gasLimit: PropTypes.string.isRequired,
    withdrawValues: PropTypes.string.isRequired,
    withdrawValueView: PropTypes.string.isRequired,
    withdrawValueUsdView: PropTypes.string.isRequired,
    withdrawFeeView: PropTypes.string.isRequired,
    withdrawFeeUsdView: PropTypes.string.isRequired,
    withdrawTotalView: PropTypes.string.isRequired,
    withdrawTotalUsdView: PropTypes.string.isRequired,
    withdrawBalanceAfterView: PropTypes.string.isRequired,
    withdrawBalanceAfterUsdView: PropTypes.string.isRequired,
    balanceView: PropTypes.string.isRequired,
    balanceUsdView: PropTypes.string.isRequired,
    showDepositWarningDialog: PropTypes.func.isRequired,
    showWithdrawDialog: PropTypes.func.isRequired,
    hideDepositWarningDialog: PropTypes.func.isRequired,
    hideDepositDialog: PropTypes.func.isRequired,
    hideWithdrawDialog: PropTypes.func.isRequired,
    hideWithdrawConfirmDialog: PropTypes.func.isRequired,
    selectInitialProps: PropTypes.func.isRequired,
    selectMoreTransactions: PropTypes.func.isRequired,
    estimateGas: PropTypes.func.isRequired,
    depositWarningDialogSubmit: PropTypes.func.isRequired,
    depositDialogCopyAddress: PropTypes.func.isRequired,
    withdrawDialogSubmit: PropTypes.func.isRequired,
    withdrawConfirmDialogSubmit: PropTypes.func.isRequired,
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
      return <div className={css2.transactionValue}>LHT {value}</div>
    } else {
      switch (direction) {
        case DIRECTION.FROM:
          // return <div className={classNames(css2.transactionValue, css2.transactionValueFrom)}>- LHT {value.dividedBy(Math.pow(10, 18)).toFixed(18)}</div>
          return <div className={classNames(css2.transactionValue, css2.transactionValueFrom)}>- LHT {web3.utils.fromWei(value, 'ether')}</div>
        case DIRECTION.TO:
          // return <div className={classNames(css2.transactionValue, css2.transactionValueTo)}>+ LHT {value.dividedBy(Math.pow(10, 18)).toFixed(18)}</div>
          return <div className={classNames(css2.transactionValue, css2.transactionValueTo)}>+ LHT {web3.utils.fromWei(value, 'ether')}</div>
      }
    }
  }

  renderTransactionFee (transaction, direction) {
    const fee = new BigNumber(transaction.receipt.gasUsed).multipliedBy(transaction.gasPrice).toString()
    return direction === DIRECTION.FROM ? <div className={css2.transactionGasUsed}>- LHT {web3.utils.fromWei(fee, 'ether')}</div> : ''
  }

  renderTransaction (transaction: Transaction) {
    const direction = Transaction.getDirection(transaction, this.props.userAddress)
    const invertedDirection = Transaction.invertDirection(direction)
    return (
      <ListItem key={transaction.hash} button href={`https://etherchain.parity.tp.ntr1x.com/tx/${ transaction.hash }`} target='_blank' component='a' divider>
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
      <Divider />,
      <ListItem><ListItemText primary={new Date(day).toLocaleDateString()} /></ListItem>,
      <Divider />,
      ...(transactions.map((transaction) => this.renderTransaction(transaction))),
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
          <Button onClick={this.props.hideDepositWarningDialog} color='primary'>Cancel</Button>
          <Button onClick={this.props.depositWarningDialogSubmit} color='primary'>Proceed</Button>
        </DialogActions>
      </Dialog>
    )
  }

  renderDepositDialog () {
    return (
      <Dialog open={this.props.openDepositDialog} classes={{ paper: css2.dialogPaper }} transitionDuration={DIALOG_TRANSITION_DURATION}>
        <DialogTitle className={css2.dialogTitle} disableTypography>Deposit LHT</DialogTitle>
        <DialogContent>
          <br />
          <br />
          <FormLabel>Your Address to Receive Funds</FormLabel>
          <br />
          <br />
          <div>{this.props.userAddress}</div>
          <br />
          <br />
          <FormLabel>Your Address QR Code</FormLabel>
          <br />
          <br />
          <QRCode value={this.props.userAddress} />
          <br />
          <br />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.hideDepositDialog} color='primary'>Cancel</Button>
          <Button onClick={this.props.depositDialogCopyAddress} color='primary'>Copy Address</Button>
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
            <br />
            <Field name='to' component={TextField} label='Recipient Address' className={css2.withdrawDialogTextField} />
            <br />
            <br />
            <Field name='value' component={TextField} label='Amount' className={css2.withdrawDialogTextField} />
            <br />
            <br />
            <Field name='comment' component={TextField} label='Comment (optional)' className={css2.withdrawDialogTextField} />
            <br />
            <br />
            <br />
            <Grid container>
              <Grid item xs='6'>Lower Fee</Grid>
              <Grid item xs='6' style={{ textAlign: 'right' }}>Faster Transfer</Grid>
            </Grid>
            <Field name='gas' component={SliderField} min={21000} max={this.props.gasLimit} />
            <br />
            <br />
            <div>Fee: LHT {this.props.withdrawFeeView}</div>
            <div>≈${this.props.withdrawFeeUsdView}</div>
          </Form>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={this.props.hideWithdrawDialog} color='primary'>Cancel</Button>
          <Button onClick={this.props.withdrawDialogSubmit} color='primary'>Proceed</Button>
        </DialogActions>
      </Dialog>
    )
  }

  renderWithdrawConfirmDialog () {
    return (
      <Dialog open={this.props.openWithdrawConfirmDialog} classes={{ paper: css2.dialogPaper }} transitionDuration={DIALOG_TRANSITION_DURATION}>
        <DialogTitle className={css2.dialogTitle} disableTypography>Confirm Withdraw</DialogTitle>
        <DialogContent>
          <br />
          <FormLabel>Recipient Address</FormLabel>
          <br />
          <br />
          <div>{this.props.withdrawValues.to}</div>
          <br />
          <FormLabel>Amount</FormLabel>
          <br />
          <br />
          <Grid container>
            <Grid item xs='6' className={css2.withdrawConfirmDialogValue}>LHT {this.props.withdrawValueView}</Grid>
            <Grid item xs='6' className={css2.withdrawConfirmDialogUsdValue}>≈${this.props.withdrawValueUsdView}</Grid>
          </Grid>
          <br />
          <FormLabel>Fee</FormLabel>
          <br />
          <br />
          <Grid container>
            <Grid item xs='6'>LHT {this.props.withdrawFeeView}</Grid>
            <Grid item xs='6' className={css2.withdrawConfirmDialogUsdValue}>≈${this.props.withdrawFeeUsdView}</Grid>
          </Grid>
          <br />
          <br />
          <FormLabel>Total</FormLabel>
          <br />
          <br />
          <Grid container>
            <Grid item xs='6'>LHT {this.props.withdrawTotalView}</Grid>
            <Grid item xs='6' className={css2.withdrawConfirmDialogUsdValue}>≈${this.props.withdrawTotalUsdView}</Grid>
          </Grid>
          <br />
          <br />
          <FormLabel>Balance After</FormLabel>
          <br />
          <br />
          <Grid container>
            <Grid item xs='6'>LHT {this.props.withdrawBalanceAfterView}</Grid>
            <Grid item xs='6' className={css2.withdrawConfirmDialogUsdValue}>≈${this.props.withdrawBalanceAfterUsdView}</Grid>
          </Grid>
          <br />
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={this.props.hideWithdrawConfirmDialog} color='primary'>Cancel</Button>
          <Button onClick={this.props.withdrawConfirmDialogSubmit} color='primary'>Confirm</Button>
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
            <Card className={css2.balanceCard}>
              <CardHeader
                classes={{
                  root: css2.balanceCardHeader,
                  title: css2.balanceCardHeaderTitle,
                  subheader: css2.balanceCardHeaderSubheader,
                  action: css2.balanceCardAction,
                }}
                className={css2.balanceCardHeader}
                avatar={<Avatar src='/static/images/lht-icon.png' className={css2.balanceCardHeaderAvatar} />}
                action={
                  <div>
                    <Button variant='outlined' color='primary' className={css2.balanceCardButton} onClick={this.props.showDepositWarningDialog}>Deposit</Button>
                    <Button
                      variant='contained'
                      color='primary'
                      className={classNames(css2.balanceCardButton, css2.balanceCardButtonWithdraw)}
                      onClick={this.props.showWithdrawDialog}
                    >Withdraw
                    </Button>
                  </div>
                }
                title={this.props.balanceView}
                subheader={`$${this.props.balanceUsdView}`}
              />
              <Divider />
              <CardActions>
                <Button size='small' color='primary'>Manage funds in ChronoWallet </Button>
              </CardActions>
            </Card>
            <Card>
              <CardHeader title='Transactions' classes={{ title: css2.transactionsCardHeaderTitle }} />
              <List>
                {
                  Object.keys(this.props.transactionLogs).length
                    ? Object.entries(this.props.transactionLogs).map((dayTransactions) => this.renderDayTransactions(dayTransactions))
                    : [ <Divider />, <ListItem><ListItemText primary='No transactions in loaded blocks' /></ListItem> ]
                }
                <Divider />
                <ListItem button onClick={this.handleMoreClick} disabled={this.props.selectMoreTransactionsLoading}>
                  <ListItemText primary={<Typography align='center'>More (Block below { this.props.lastBlockNumber })</Typography>} />
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
  gasLimit: getGasLimit(state),
  withdrawValues: getWithdrawValues(state),
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
