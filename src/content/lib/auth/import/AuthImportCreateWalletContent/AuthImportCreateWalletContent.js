import React from 'react'
import PropTypes from "prop-types"
import connect from "react-redux/lib/connect/connect"
import { Field, reduxForm } from 'redux-form'
import TextField from 'redux-form-material-ui-next/lib/TextField'

import { CREATE_WALLET_FORM as FORM } from "src/store/auth/import/constants"
import { submitCreateWallet as submit } from "src/store/auth/import/actions"
import SigninLayout from "src/components/layouts/SigninLayout/SigninLayout"
import WhiteRoundedButton from "src/components/common/buttons/WhiteRoundedButton/WhiteRoundedButton"
import { encryptedWalletSelector } from "src/store/auth/import/selectors"

import validate from './validate'

import css from './AuthImportCreateWalletContent.scss'

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
            component={TextField}
            fullwidth
            name='name'
            placeholder='Wallet name'
            FormHelperTextProps={{ classes: { root: css.fieldHelper } }}
            InputProps={{ disableUnderline: true, classes: { input: css.fieldInput } }}
          />
          {
            this.props.encryptedWallet ? null : (
              <div className={css.passwordsColumn}>
                <Field
                  className={css.row}
                  component={TextField}
                  name='password'
                  type='password'
                  placeholder='Password'
                  FormHelperTextProps={{ classes: { root: css.fieldHelper } }}
                  InputProps={{ disableUnderline: true, classes: { input: css.fieldInput } }}
                />

                <Field
                  className={css.row}
                  component={TextField}
                  name='passwordConfirm'
                  type='password'
                  placeholder='Password confirmation'
                  FormHelperTextProps={{ classes: { root: css.fieldHelper } }}
                  InputProps={{ disableUnderline: true, classes: { input: css.fieldInput } }}
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
  // onSubmit,
})(AuthImportCreateWalletContent)

const mapStateToProps = (state) => ({
  encryptedWallet: encryptedWalletSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: () => dispatch(submit()),
})

AuthImportCreateWalletContent = connect(mapStateToProps, mapDispatchToProps)(AuthImportCreateWalletContent)

export default AuthImportCreateWalletContent
