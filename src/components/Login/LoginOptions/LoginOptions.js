import { LoginWithMnemonic, LoginWithPrivateKey, LoginWithWallet, SelectOption } from 'components/Login/index'
import React from 'react'
import css from './LoginOptions.scss'

class LoginOptions extends React.Component {

  constructor () {
    super(...arguments)
    this.state = {
      step: SelectOption.STEP,
    }
  }

  handleChangeStep = (step) => this.setState({ step: step || SelectOption.STEP })

  render () {
    console.log('--LoginOptions#render', this.state.step)
    let component

    switch (this.state.step) {
      case LoginWithMnemonic.STEP:
        component =  (
          <LoginWithMnemonic
            onChangeStep={this.handleChangeStep}
          />
        )
        break
      case LoginWithWallet.STEP:
        component = (
          <LoginWithWallet
            onChangeStep={this.handleChangeStep}
          />
        )
        break
      case LoginWithPrivateKey.STEP:
        component = (
          <LoginWithPrivateKey
            onChangeStep={this.handleChangeStep}
          />
        )
        break
      default:
        component = (
          <SelectOption
            onChangeStep={this.handleChangeStep}
          />
        )
    }

    return (
      <div className={css.root}>
        <div className={css.content}>
          {component}
        </div>
      </div>
    )
  }
}

// export default connect(mapStateToProps)(LoginOptions)
export default LoginOptions
