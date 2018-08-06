import React from 'react'
import PropTypes from "prop-types"
import connect from "react-redux/lib/connect/connect"
import { Field, reduxForm, SubmissionError } from 'redux-form'

import { validateWalletName } from 'src/store'
import { CREATE_WALLET_FORM as FORM } from "src/store/auth/import/constants"
import { submitCreateWallet as submit } from "src/store/auth/import/actions"
import SigninLayout from "src/components/layouts/SigninLayout/SigninLayout"
import WhiteRoundedButton from "src/components/common/buttons/WhiteRoundedButton/WhiteRoundedButton"
import { Input } from 'src/components/common'
import { encryptedWalletSelector } from "src/store/auth/import/selectors"

import validate from './validate'

import css from './AuthImportCreateWalletContent.scss'

const onSubmit = ({ walletName, password }, dispatch) => {
  const validateName = dispatch(validateWalletName(walletName))

  if (!validateName){
    throw new SubmissionError({
      walletName: 'Please enter other wallet name',
    })
  }

  return {
    walletName,
    password,
  }
}

export class AuthImportCreateWalletContent extends React.Component {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    encryptedWallet: PropTypes.shape({}),
  }

  render () {
    return (
      <SigninLayout>
        <form className={css.root} name={FORM} onSubmit={this.props.handleSubmit}>
          <div className={css.header}>Create wallet</div>
          <Field
            className={css.row}
            component={Input}
            name='name'
            placeholder='Wallet name'
            autoComplete={false}
            lineEnabled={false}
            mods={css.passwordField}
            errorMods={css.fieldError}
          />
          {
            this.props.encryptedWallet ? null : (
              <div>
                <Field
                  className={css.row}
                  component={Input}
                  name='password'
                  type='password'
                  placeholder='Password'
                  autoComplete={false}
                  lineEnabled={false}
                  mods={css.passwordField}
                />
                <Field
                  className={css.row}
                  component={Input}
                  name='passwordConfirm'
                  type='password'
                  placeholder='Password confirmation'
                  autoComplete={false}
                  lineEnabled={false}
                  mods={css.passwordField}
                />
              </div>
            )
          }
          <WhiteRoundedButton type='submit'>Create a wallet</WhiteRoundedButton>
          <br />
          <br />
          <br />
          <div className={css.otherActions}>
            or
            <button className={css.loginButton}>Use an existing wallet</button>
          </div>
        </form>
      </SigninLayout>
    )
  }

}

AuthImportCreateWalletContent = reduxForm({
  form: FORM,
  validate,
  onSubmit,
})(AuthImportCreateWalletContent)

const mapStateToProps = (state) => ({
  encryptedWallet: encryptedWalletSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: () => dispatch(submit()),
})

AuthImportCreateWalletContent = connect(mapStateToProps, mapDispatchToProps)(AuthImportCreateWalletContent)

export default AuthImportCreateWalletContent
