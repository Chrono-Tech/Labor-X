import { Translate } from 'components/common'
import { MnemonicForm, PrivateKeyForm, WalletFileForm, SelectOption, CreateAccount, SelectWallet, LoginForm } from 'components/Login'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { signIn, createAccount, changeStep, LoginSteps, navigateToCreateWallet, onSubmitMnemonic, onSubmitPrivateKey, onSelectWallet } from 'store'
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
    walletsList: PropTypes.array,
    selectedWallet: PropTypes.object,
  }

  static defaultProps = {
    onChangeStep: () => {},
    step: '',
    onSelectWallet: null,
  }

  constructor (props) {
    super(props)
  }

  handleChangeStep = (step) => this.setState({ step: step || SelectOption.STEP })

  handleSubmitSuccess = (signInModel) => this.props.signIn(signInModel)

  handleBackClick = () => this.handleChangeStep(null)

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
        component = (<SelectWallet onChangeStep={onChangeStep} walletsList={walletsList} onSelectWallet={onSelectWallet} />)
      // component = (<CreateAccount onChangeStep={onChangeStep} onSubmitSuccess={createAccount} />)
        // component = <SelectOption onChangeStep={onChangeStep} />
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
    selectedWallet: state.login.selectedWallet,
    step: state.login.step,
    walletsList: state.wallet.walletsList,
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
