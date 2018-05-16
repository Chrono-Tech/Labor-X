import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Router from 'next/router'
import Dialog from 'material-ui/Dialog'

import {
  signIn,
  createAccount,
  changeStep,
  LoginSteps,
  onSubmitMnemonic,
  onSubmitPrivateKey,
  onSelectWallet,
  onSubmitRecoveryAccountForm,
  onConfirmRecoveryPassword,
  navigateToRecoveryPassword,
} from 'src/store'

import { Button } from 'components/common'

import {
  MnemonicForm,
  PrivateKeyForm,
  WalletFileForm,
  SelectOption,
  SelectWallet,
  LoginForm,
  CreateAccount,
  RecoveryAccountForm,
  RecoveryPasswordResetForm,
} from 'components/Login'

import { WalletEntryModel } from 'src/models'

import css from './LoginOptions.scss'

class LoginOptions extends React.Component {
  static propTypes = {
    signIn: PropTypes.func,
    createAccount: PropTypes.func,
    onSubmitPrivateKey: PropTypes.func,
    onSubmitMnemonic: PropTypes.func,
    onSelectWallet: PropTypes.func,
    onChangeStep: PropTypes.func,
    step: PropTypes.string,
    navigateToCreateWallet: PropTypes.func,
    walletsList: PropTypes.arrayOf(PropTypes.instanceOf(WalletEntryModel)),
    selectedWallet: PropTypes.instanceOf(WalletEntryModel),
    selectedWalletRecoveryForm: PropTypes.instanceOf(WalletEntryModel),
  }

  static defaultProps = {
    onChangeStep: () => {},
    step: null,
    onSelectWallet: null,
  }

  constructor (props) {
    super(props)

    this.state = {
      isModalOpen: props.walletsList.length === 0,
    }
  }

  componentWillMount () {
    const { selectedWallet, onChangeStep, step } = this.props

    if (selectedWallet && !step) {
      onChangeStep(LoginSteps.Login)
    }
  }

  handleSubmitSuccess = (signInModel) => this.props.signIn(signInModel)

  closeModal (){
    this.setState({ isModalOpen: false })
  }

  navigateToCreateAccount (){
    Router.push('/create-account')
  }

  renderComponent () {
    const {
      onChangeStep,
      step,
      onSubmitMnemonic,
      onSubmitPrivateKey,
      walletsList,
      onSelectWallet,
      selectedWallet,
      signIn,
      createAccount,
      onSubmitRecoveryAccountForm,
      onConfirmRecoveryPassword,
      navigateToRecoveryPassword,
      selectedWalletRecoveryForm,
    } = this.props

    let component

    switch (step) {
      case LoginSteps.Mnemonic:
        component = (<MnemonicForm onChangeStep={onChangeStep} onSubmitSuccess={onSubmitMnemonic} />)
        break
      case LoginSteps.WalletFile:
        component = (<WalletFileForm onChangeStep={onChangeStep} onSubmitSuccess={signIn} />)
        break
      case LoginSteps.PrivateKey:
        component = (<PrivateKeyForm onChangeStep={onChangeStep} onSubmitSuccess={onSubmitPrivateKey} />)
        break
      case LoginSteps.CreateWallet:
        component = (<CreateAccount onChangeStep={onChangeStep} onSubmitSuccess={createAccount} />)
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
            onSubmitSuccess={signIn}
            onClickForgotPassword={navigateToRecoveryPassword}
          />)
        break
      default:
        component = (<SelectWallet onChangeStep={onChangeStep} walletsList={walletsList} onSelectWallet={onSelectWallet} />)
    }

    return [<div key={step} className={css.componentWrapper}>{component}</div>]
  }

  renderDialog (){
    return (
      <Dialog
        contentClassName={css.dialog}
        open={this.state.isModalOpen}
        title={<h2>LaborX account is not found</h2>}
        titleClassName={css.dialogTitle}
        bodyClassName={css.dialogContent}
        actionsContainerClassName={css.actionWrapper}
        actions={[
          <Button
            label='No'
            onClick={this.closeModal.bind(this)}
            buttonClassName={[css.actionButton, css.actionButtonLeft].join(' ')}
            type={Button.TYPES.SUBMIT}
          />,
          <Button
            label='YES'
            onClick={this.navigateToCreateAccount.bind(this)}
            buttonClassName={css.actionButton}
            type={Button.TYPES.SUBMIT}
          />,
        ]}
      >
        LaborX account with the provided address is not found.
        Would you like to Create a New Account?
      </Dialog>
    )
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
        { this.renderDialog() }
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
        <PersistGate {...gateProps} loading={LoginOptionsLoader} persistor={this.store.__persistor}>
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
    selectedWallet: state.wallet.selectedWallet && new WalletEntryModel(state.wallet.selectedWallet),
    selectedWalletRecoveryForm: state.login.selectedWalletRecoveryForm && new WalletEntryModel(state.login.selectedWalletRecoveryForm),
    step: state.login.step,
    walletsList: state.wallet.walletsList.map((wallet) => new WalletEntryModel(wallet)),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onChangeStep: (step) => dispatch(changeStep(step)),
    signIn: (password) => dispatch(signIn(password)),
    createAccount: ({ walletName, password }) => dispatch(createAccount(walletName, password)),
    onSubmitPrivateKey: (signInModel) => dispatch(onSubmitPrivateKey(signInModel)),
    onSubmitMnemonic: (signInModel) => dispatch(onSubmitMnemonic(signInModel)),
    onSelectWallet: (signInModel) => dispatch(onSelectWallet(signInModel)),
    onSubmitRecoveryAccountForm: (values) => dispatch(onSubmitRecoveryAccountForm(values)),
    onConfirmRecoveryPassword: (values) => dispatch(onConfirmRecoveryPassword(values)),
    navigateToRecoveryPassword: () => dispatch(navigateToRecoveryPassword()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersistWrapper()(LoginOptions))
