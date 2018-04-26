import { Translate } from 'components/common'
import { MnemonicForm, PrivateKeyForm, WalletFileForm, SelectOption, LoginSteps } from 'components/Login'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { signIn, changeStep, submitMnemonic, submitPrivateKey } from 'store'
import css from './LoginOptions.scss'

class LoginOptions extends React.Component {
  static propTypes = {
    signIn: PropTypes.func,
    onChangeStep: PropTypes.func,
    step: PropTypes.string,
    submitPrivateKey: PropTypes.func,
    submitMnemonic: PropTypes.func,
  }

  static defaultProps = {
    onChangeStep: () => {},
    step: '',
  }

  constructor (props) {
    super(props)
  }

  handleChangeStep = (step) => this.setState({ step: step || SelectOption.STEP })

  handleSubmitSuccess = (signInModel) => this.props.signIn(signInModel)

  handleBackClick = () => this.handleChangeStep(null)

  render () {
    const { onChangeStep, step, submitMnemonic, submitPrivateKey } = this.props

    const formProps = {
      onChangeStep,
      onSubmitSuccess: this.handleSubmitSuccess,
    }

    let component

    switch (step) {
      case LoginSteps.Mnemonic:
        component = (<MnemonicForm {...formProps} />)
        break
      case LoginSteps.WalletFile:
        component = (<WalletFileForm {...formProps}/>)
        break
      case LoginSteps.PrivateKey:
        component = (<PrivateKeyForm {...formProps}/>)
        break
      default:
        component = <SelectOption onChangeStep={onChangeStep} />
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
    step: state.login.step,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onChangeStep: (step) => dispatch(changeStep(step)),
    signIn: (signInModel) => dispatch(signIn(signInModel)),
    submitMnemonic: (mnemonic) => dispatch(submitMnemonic(mnemonic)),
    submitPrivateKey: (privateKey) => dispatch(submitPrivateKey(privateKey)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginOptions)
