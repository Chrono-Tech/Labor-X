import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Router from 'src/routes'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'

import {
  signIn,
  createAccount,
  changeStep,
  LoginSteps,
  onSubmitMnemonic,
  onSubmitMnemonicSuccess,
  onSubmitMnemonicFail,
  onSubmitPrivateKey,
  // onSubmitPrivateKeySuccess,
  // onSubmitPrivateKeyFail,
  onSelectWallet,
  onSubmitRecoveryAccountForm,
  onConfirmRecoveryPassword,
  navigateToRecoveryPassword,
  onSignInSuccess,
  onSignInFail,
  navigateToLoginForm,
} from 'src/store'

import { Button } from 'components/common'

import {
  MnemonicForm,
  PrivateKeyForm,
  WalletFileForm,
  SelectOption,
  SelectWallet,
  LoginForm,
  CreateWallet,
  RecoveryAccountForm,
  RecoveryPasswordResetForm,
} from 'components/Login'

import { WalletEntryModel } from 'src/models'

import {
  hideAccount404Dialog,
  handleAccount404DialogYesClick,
} from 'src/store/login/actions'

import { getOpenAccount404Dialog } from 'src/store/login/selectors'

import css from './LoginOptions.scss'

class LoginOptions extends React.Component {

  static propTypes = {
    signIn: PropTypes.func,
    onSignInSuccess: PropTypes.func,
    onSignInFail: PropTypes.func,
    createAccount: PropTypes.func,
    onSubmitPrivateKey: PropTypes.func,
    // onSubmitPrivateKeySuccess: PropTypes.func,
    // onSubmitPrivateKeyFail: PropTypes.func,
    onSubmitMnemonic: PropTypes.func,
    onSubmitMnemonicSuccess: PropTypes.func,
    onSubmitMnemonicFail: PropTypes.func,
    onSelectWallet: PropTypes.func,
    onChangeStep: PropTypes.func,
    navigateToLoginForm: PropTypes.func,
    hideAccount404Dialog: PropTypes.func,
    handleAccount404DialogYesClick: PropTypes.func,
    onSubmitRecoveryAccountForm: PropTypes.func,
    onConfirmRecoveryPassword: PropTypes.func,
    navigateToRecoveryPassword: PropTypes.func,
    step: PropTypes.string,
    prevStep: PropTypes.string,
    navigateToCreateWallet: PropTypes.func,
    walletsList: PropTypes.arrayOf(PropTypes.instanceOf(WalletEntryModel)),
    selectedWallet: PropTypes.instanceOf(WalletEntryModel),
    selectedWalletRecoveryForm: PropTypes.instanceOf(WalletEntryModel),
    fetchSignIn: PropTypes.bool,
    openAccount404Dialog: PropTypes.bool,
  }

  static defaultProps = {
    onChangeStep: () => {},
    step: null,
    onSelectWallet: null,
  }

  componentWillMount () {
    const { selectedWallet, onChangeStep, step } = this.props

    if (selectedWallet && !step) {
      onChangeStep(LoginSteps.Login)
    }
  }

  componentDidMount () {
    window.onpopstate = this.onBackButtonEvent
  }

  handleAccount404DialogNoClick = () => {
    this.props.hideAccount404Dialog()
  }

  handleAccount404DialogYesClick = () => {
    this.props.handleAccount404DialogYesClick()
  }

  handleSubmitSuccess = (signInModel) => this.props.signIn(signInModel)

  onBackButtonEvent = (e) => {
    const { prevStep, onChangeStep } = this.props
    onChangeStep(prevStep)
    e.preventDefault()
  }

  navigateToCreateAccount (){
    Router.pushRoute('/create-account')
  }

  renderComponent () {
    const {
      onChangeStep,
      step,
      onSubmitMnemonic,
      onSubmitMnemonicSuccess,
      onSubmitMnemonicFail,
      onSubmitPrivateKey,
      // onSubmitPrivateKeySuccess,
      // onSubmitPrivateKeyFail,
      walletsList,
      onSelectWallet,
      selectedWallet,
      signIn,
      onSignInSuccess,
      onSignInFail,
      createAccount,
      navigateToLoginForm,
      onSubmitRecoveryAccountForm,
      onConfirmRecoveryPassword,
      navigateToRecoveryPassword,
      selectedWalletRecoveryForm,
      fetchSignIn,
    } = this.props

    let component

    switch (step) {
      case LoginSteps.Mnemonic:
        component = (
          <MnemonicForm
            onChangeStep={onChangeStep}
            onSubmit={onSubmitMnemonic}
            onSubmitSuccess={onSubmitMnemonicSuccess}
            onSubmitFail={onSubmitMnemonicFail}
          />)
        break
      case LoginSteps.WalletFile:
        component = (<WalletFileForm onChangeStep={onChangeStep} onSubmitSuccess={onSelectWallet} />)
        break
      case LoginSteps.PrivateKey:
        component = (
          <PrivateKeyForm
            onChangeStep={onChangeStep}
            onSubmit={onSubmitPrivateKey}
            // onSubmitSuccess={onSubmitPrivateKeySuccess}
            // onSubmitFail={onSubmitPrivateKeyFail}
          />)
        break
      case LoginSteps.CreateWallet:
        component = (<CreateWallet onChangeStep={onChangeStep} onSubmitSuccess={createAccount} />)
        break
      case LoginSteps.SelectLoginMethod:
        component = (<SelectOption onChangeStep={onChangeStep} />)
        break
      case LoginSteps.SelectWallet:
        component = (<SelectWallet onChangeStep={onChangeStep} walletsList={walletsList} onSelectWallet={onSelectWallet} />)
        break
      case LoginSteps.RecoveryPassword:
        component = (
          <RecoveryAccountForm
            onChangeStep={onChangeStep}
            navigateToLoginForm={navigateToLoginForm}
            walletsList={walletsList}
            selectedWallet={selectedWalletRecoveryForm}
            onSubmitSuccess={onSubmitRecoveryAccountForm}
          />)
        break
      case LoginSteps.RecoveryPasswordReset:
        component = (
          <RecoveryPasswordResetForm
            onChangeStep={onChangeStep}
            walletsList={walletsList}
            selectedWallet={selectedWalletRecoveryForm}
            onSubmitSuccess={onConfirmRecoveryPassword}
          />)
        break
      case LoginSteps.Login:
        component = (
          <LoginForm
            onChangeStep={onChangeStep}
            walletsList={walletsList}
            selectedWallet={selectedWallet}
            onSubmit={signIn}
            onSubmitSuccess={onSignInSuccess}
            onSubmitFail={onSignInFail}
            onClickForgotPassword={navigateToRecoveryPassword}
            fetchSignIn={fetchSignIn}
          />)
        break
      default:
        component = (<SelectWallet onChangeStep={onChangeStep} walletsList={walletsList} onSelectWallet={onSelectWallet} />)
    }

    return [<div key={step} className={css.componentWrapper}>{component}</div>]
  }

  render () {

    return (
      <div className={css.root}>
        <ReactCSSTransitionGroup
          transitionName='slides'
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={2000}
          transitionAppear={false}
          transitionEnter
          transitionLeave={false}
        >
          {this.renderComponent()}
        </ReactCSSTransitionGroup>
        <Dialog
          open={this.props.openAccount404Dialog}
          onClose={this.handleAccount404DialogNoClick}
        >
          <DialogTitle><h2>LaborX account is not found</h2></DialogTitle>
          <DialogContent>
            LaborX account with the provided address is not found.
            Would you like to Create a New Account?
          </DialogContent>
          <DialogActions>
            <Button
              label='No'
              onClick={this.handleAccount404DialogNoClick}
              buttonClassName={[css.actionButton, css.actionButtonLeft].join(' ')}
              type={Button.TYPES.SUBMIT}
            />
            <Button
              label='YES'
              onClick={this.handleAccount404DialogYesClick}
              buttonClassName={css.actionButton}
              type={Button.TYPES.SUBMIT}
            />
          </DialogActions>
        </Dialog>
      </div>
    )
  }

}

export const PersistWrapper = (gateProps = {}) => (WrappedComponent) => (

  class WithPersistGate extends React.Component {

    static displayName = `withPersistGate(${WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component'})`;

    static contextTypes = {
      store: PropTypes.object.isRequired,
    }

    constructor (props, context) {
      super(props, context)
      this.store = context.store
    }

    render () {
      return (
        <PersistGate {...gateProps} loading={LoginOptionsLoader} persistor={this.store["__persistor"]}>
          <WrappedComponent {...this.props} />
        </PersistGate>
      )
    }

  }

)

const LoginOptionsLoader = (
  <div className={css.loadingMessage}>
    <div className={css.loadingMessageHeader}>Log In</div>
    <img src='/static/images/gif/spinningwheel-1.gif' width='24' height='24' alt='' />
  </div>
)

function mapStateToProps (state) {

  return {
    fetchSignIn: state.login.fetchSignIn ,
    selectedWallet: state.wallet.selectedWallet && new WalletEntryModel(state.wallet.selectedWallet),
    selectedWalletRecoveryForm: state.login.selectedWalletRecoveryForm && new WalletEntryModel(state.login.selectedWalletRecoveryForm),
    step: state.login.step,
    prevStep: state.login.prevStep,
    walletsList: (state.wallet.walletsList || []).map((wallet) => new WalletEntryModel(wallet)),
    openAccount404Dialog: getOpenAccount404Dialog(state),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onChangeStep: (step) => dispatch(changeStep(step)),
    signIn: (password) => dispatch(signIn(password)),
    onSignInSuccess: () => dispatch(onSignInSuccess()),
    onSignInFail: () => dispatch(onSignInFail()),
    createAccount: ({ walletName, password }) => dispatch(createAccount(walletName, password)),
    onSubmitPrivateKey: (values) => dispatch(onSubmitPrivateKey(values)),
    // onSubmitPrivateKeySuccess: (values) => dispatch(onSubmitPrivateKeySuccess(values)),
    // onSubmitPrivateKeyFail: (values) => dispatch(onSubmitPrivateKeyFail(values)),
    onSubmitMnemonic: (values) => dispatch(onSubmitMnemonic(values)),
    onSubmitMnemonicSuccess: (values) => dispatch(onSubmitMnemonicSuccess(values)),
    onSubmitMnemonicFail: (values) => dispatch(onSubmitMnemonicFail(values)),
    onSelectWallet: (walletEntry) => dispatch(onSelectWallet(walletEntry)),
    onSubmitRecoveryAccountForm: (values) => dispatch(onSubmitRecoveryAccountForm(values)),
    onConfirmRecoveryPassword: (values) => dispatch(onConfirmRecoveryPassword(values)),
    navigateToRecoveryPassword: () => dispatch(navigateToRecoveryPassword()),
    navigateToLoginForm: () => dispatch(navigateToLoginForm()),
    hideAccount404Dialog: () => dispatch(hideAccount404Dialog()),
    handleAccount404DialogYesClick: () => dispatch(handleAccount404DialogYesClick()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersistWrapper()(LoginOptions))
