import React from 'react'
import { connect } from 'react-redux'
import { MnemonicWeb3 } from '../../mnemonicWeb3'
import { uport } from '../../uport';

import { setupWeb3, loadAccounts } from '../../store/network/networkActions'
import { loginUser } from '../../store/user/userActions'
import LoginOptions from './LoginOptions'
import AddressSelect from './AddressSelect'

import styles from './styles'

const STEP_LOGIN_OPTIONS = 'LOGIN_OPTIONS'
const STEP_SELECT_ADDRESS = 'SELECT_ADDRESS'

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

  render () {
    const currentStep = this.state.step
    if (currentStep === STEP_LOGIN_OPTIONS) {
      return (
        <div style={ styles.loginContainer }>
          <LoginOptions
            onMetaMaskLogin={ this.handleMetaMaskLogin }
            onMnemonicLogin={ this.handleMnemonicLogin }
            onLocalLogin={ this.handleLocalLogin }
            onUportLogin={ this.handleUportLogin }
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
    } else {
      return (
        <div style={ styles.loginContainer }>
          <AddressSelect
            accounts={ this.props.accounts }
            onAddressSelected={ this.handleAddressSelection }
          />
        </div>)
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
    const instance = new MnemonicWeb3(mnemonic).createInstance()

    dispatch(setupWeb3(instance))
    dispatch(loadAccounts())
  },
  loginLocal: () => {
    dispatch(setupWeb3(null))
    dispatch(loadAccounts())
  },
  loginUport: () => {
    dispatch(setupWeb3(uport.getWeb3()))
    dispatch(loadAccounts())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
