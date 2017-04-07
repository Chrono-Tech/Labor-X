import React from 'react'
import { connect } from 'react-redux'
import { Web3Util } from '../../web3util'
import { uport } from '../../uport';
import { setupWeb3, loadAccounts } from '../../store/network/networkActions'
import { loginUser } from '../../store/user/userActions'
import LoginOptions from './LoginOptions'
import AddressSelect from './AddressSelect'
import PrivateKeyInput from './PrivateKeyInput';

import styles from './styles'

const STEP_LOGIN_OPTIONS = 'LOGIN_OPTIONS'
const STEP_SELECT_ADDRESS = 'SELECT_ADDRESS'
const STEP_INPUT_PRIVATE_KEY = 'INPUT_PRIVATE_KEY';

export class Login extends React.Component {

  constructor (props) {
    super(props)
    this.state = {step: STEP_LOGIN_OPTIONS}
  }

  handleAddressSelection = (address) => {
    this.props.login(address)
  }

  handleMetaMaskLogin = () => {
    this.props.loginMetaMask()
    this.setState({step: STEP_SELECT_ADDRESS})
  }

  handleLocalLogin = () => {
    this.props.loginLocal()
    this.setState({step: STEP_SELECT_ADDRESS})
  }

  handleMnemonicLogin = () => {
    this.props.loginMnemonic()
    this.setState({step: STEP_SELECT_ADDRESS})
  }

  handleUportLogin = () => {
    this.props.loginUport()
    this.setState({step: STEP_SELECT_ADDRESS})
  }

  handlePrivateKeyLogin = () => {
    this.setState({step: STEP_INPUT_PRIVATE_KEY})
  }

  proceedPrivateKeyLogin = (privateKey) => {
    this.props.loginPrivateKey(privateKey)
    this.setState({step: STEP_SELECT_ADDRESS})
  }

  render () {
    const currentStep = this.state.step
    if (currentStep === STEP_LOGIN_OPTIONS) {
      return (
        <div style={ styles.loginContainer }>
          <LoginOptions
            onMetaMaskLogin={ window.web3 != null ? this.handleMetaMaskLogin : null }
            onMnemonicLogin={ this.handleMnemonicLogin }
            onLocalLogin={ this.handleLocalLogin }
            onUportLogin={ this.handleUportLogin }
            onPrivateKeyLogin={this.handlePrivateKeyLogin}
          />
          <div style={ styles.buttonsDiv }>
            {/*<FlatButton*/}
            {/*label="Access problems?"*/}
            {/*href="/"*/}
            {/*style={styles.flatButton}*/}
            {/*icon={<Help />}/>*/}
          </div>
        </div>
      )
    } else if (currentStep === STEP_SELECT_ADDRESS) {
      return (
        <div style={ styles.loginContainer }>
          <AddressSelect
            accounts={ this.props.accounts }
            onAddressSelected={ this.handleAddressSelection }
          />
        </div>)
    } else if (currentStep === STEP_INPUT_PRIVATE_KEY) {
      return (
        <div style={ styles.loginContainer }>
          <PrivateKeyInput onProceed={this.proceedPrivateKeyLogin} />
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    accounts: state.network.accounts
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (address) => dispatch(loginUser(address)),

  loginMetaMask: () => {
    dispatch(setupWeb3(window.web3))
    dispatch(loadAccounts())
  },
  loginMnemonic: () => {
    const mnemonic = 'couch solve unique spirit wine fine occur rhythm foot feature glory away'

    dispatch(setupWeb3(Web3Util.createFromMnemonic(mnemonic)))
    dispatch(loadAccounts())
  },
  loginLocal: () => {
    dispatch(setupWeb3(null))
    dispatch(loadAccounts())
  },
  loginUport: () => {
    dispatch(setupWeb3(uport.getWeb3()))
    dispatch(loadAccounts())
  },
  loginPrivateKey: (privateKey) => {
    dispatch(setupWeb3(Web3Util.createFromPrivateKey(privateKey)))
    dispatch(loadAccounts())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
