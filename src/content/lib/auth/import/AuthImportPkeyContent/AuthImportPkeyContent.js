import React from 'react'
import connect from 'react-redux/lib/connect/connect'
import Link from 'react-router-dom/Link'
import PropTypes from "prop-types"
import { Field, reduxForm } from 'redux-form'
import TextField from 'redux-form-material-ui-next/lib/TextField'

import SigninLayout from "src/components/layouts/SigninLayout/SigninLayout"
import WhiteRoundedButton from "src/components/common/buttons/WhiteRoundedButton/WhiteRoundedButton"
import Person404Dialog from 'src/components/dialogs/Person404Dialog/Person404Dialog'
import {
  openPerson404DialogSelector,
  submitPkeyLoadingSelector as submitLoadingSelector,
} from "src/store/auth/import/selectors"
import {
  hidePerson404Dialog,
  submitPkey as submit,
  submitPkeyPerson404 as submitPerson404,
} from "src/store/auth/import/actions"
import { PKEY_FORM as FORM } from 'src/store/auth/import/constants'

import validate from './validate'

import css from './AuthImportPkeyContent.scss'

export class AuthImportPkeyContent extends React.Component {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitPerson404: PropTypes.func.isRequired,
    hidePerson404Dialog: PropTypes.func.isRequired,
    submitLoading: PropTypes.bool.isRequired,
    openPerson404Dialog: PropTypes.bool.isRequired,
  }

  render () {
    return (
      <SigninLayout>
        <form className={css.root} name={FORM} onSubmit={this.props.handleSubmit}>
          <h3 className={css.header}>Private key form</h3>
          <Field
            component={TextField}
            name='privateKey'
            placeholder='Enter private key'
            className={css.input}
            FormHelperTextProps={{ classes: { root: css.fieldHelper } }}
            InputProps={{ disableUnderline: true, classes: { input: css.fieldInput } }}
          />
          <WhiteRoundedButton type='submit' loader={this.props.submitLoading}>Proceed to Login</WhiteRoundedButton>
          <br />
          <br />
          <br />
          <div className={css.otherActions}>
            or
            <Link to='/auth/import/select-method'><button className={css.backButton}>back</button></Link>
          </div>
        </form>
        <Person404Dialog
          open={this.props.openPerson404Dialog}
          onClose={this.props.hidePerson404Dialog}
          onSubmit={this.props.submitPerson404}
        />
      </SigninLayout>
    )
  }

}

AuthImportPkeyContent = reduxForm({
  form: FORM,
  destroyOnUnmount: false,
  validate,
})(AuthImportPkeyContent)

const mapStateToProps = (state) => ({
  openPerson404Dialog: openPerson404DialogSelector(state),
  submitLoading: submitLoadingSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  hidePerson404Dialog: () => dispatch(hidePerson404Dialog()),
  onSubmit: () => dispatch(submit()),
  submitPerson404: () => dispatch(submitPerson404()),
})

AuthImportPkeyContent = connect(mapStateToProps, mapDispatchToProps)(AuthImportPkeyContent)

export default AuthImportPkeyContent
