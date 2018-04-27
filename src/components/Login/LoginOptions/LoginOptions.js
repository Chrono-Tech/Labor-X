import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import {
  signIn,
  createAccount,
  changeStep,
  LoginSteps,
  onSubmitMnemonic,
  onSubmitPrivateKey,
  onSelectWallet,
} from 'store'

import {
  MnemonicForm,
  PrivateKeyForm,
  WalletFileForm,
  SelectOption,
  CreateAccount,
  SelectWallet,
  LoginForm ,
} from 'components/Login'

import WalletEntryModel from 'models/WalletEntryModel'

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
  }

  static defaultProps = {
    onChangeStep: () => {},
    step: null,
    onSelectWallet: null,
  }

  constructor (props) {
    super(props)
  }

  handleSubmitSuccess = (signInModel) => this.props.signIn(signInModel)

  render () {
    const {
      onChangeStep,
      step,
      createAccount,
      onSubmitMnemonic,
      onSubmitPrivateKey,
      walletsList,
      onSelectWallet,
      selectedWallet,
      signIn,
    } = this.props

    const formProps = {
      onChangeStep,
      onSubmitSuccess: this.handleSubmitSuccess,
    }

    let component

    switch (step) {
      case LoginSteps.Mnemonic:
        component = (<MnemonicForm onChangeStep={onChangeStep} onSubmitSuccess={onSubmitMnemonic} />)
        break
      case LoginSteps.WalletFile:
        component = (<WalletFileForm {...formProps} />)
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
      case LoginSteps.Login:
        component = (<LoginForm onChangeStep={onChangeStep} selectedWallet={selectedWallet} onSubmitSuccess={signIn} />)
        break
      default:
        component = (<CreateAccount onChangeStep={onChangeStep} onSubmitSuccess={createAccount} />)
    }

    return (
      <div className={css.root}>
        {component}
      </div>
    )
  }
}

function mapStateToProps (state) {

  return {
    selectedWallet: state.login.selectedWallet && new WalletEntryModel(state.login.selectedWallet),
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginOptions)
