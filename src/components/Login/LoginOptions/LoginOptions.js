import { Translate } from 'components/common'
import { MnemonicForm, PrivateKeyForm, WalletFileForm, SelectOption, LoginSteps } from 'components/Login'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { signIn, changeStep } from 'store/login/actions'
import css from './LoginOptions.scss'

class LoginOptions extends React.Component {
  static propTypes = {
    signIn: PropTypes.func,
    onChangeStep: PropTypes.func,
    step: PropTypes.string,
  }
  
  static defaultProps = {
    onChangeStep: () => {},
    step: '',
  }

  constructor () {
    super(...arguments)
    this.state = {
      step: SelectOption.STEP,
    }
  }

  handleChangeStep = (step) => this.setState({ step: step || SelectOption.STEP })

  handleSubmitSuccess = (signInModel) => this.props.signIn(signInModel)

  handleBackClick = () => this.handleChangeStep(null)

  render () {
    const { onChangeStep, step } = this.props
    
    const formProps = {
      onChangeStep,
      onSubmitSuccess: this.handleSubmitSuccess
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
        component = (<SelectOption onChangeStep={onChangeStep} />)
    }

    return (
      <div className={css.root}>
        {component}
      </div>
    )
  }
}

function mapStateToProps (state) {
  console.log('step', state)
  return {
    step: state.login.step,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onChangeStep: (step) => dispatch(changeStep(step)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginOptions)
