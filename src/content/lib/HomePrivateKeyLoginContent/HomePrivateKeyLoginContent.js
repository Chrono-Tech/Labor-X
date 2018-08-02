import React from 'react'
import Link from 'react-router-dom/Link'
import { connect } from 'react-redux'
import Form from 'redux-form/lib/Form'
import Field from 'redux-form/lib/Field'
import reduxForm from 'redux-form/lib/reduxForm'
import TextField from 'redux-form-material-ui-next/lib/TextField'

import WhiteRoundedButton from "src/components/common/buttons/WhiteRoundedButton/WhiteRoundedButton";
import SigninLayout from "src/components/SigninLayout/SigninLayout";
import { FORM } from "src/store/homePrivateKeyLogin/constants";
import { getSubmitLoadingSelector, openAccount404DialogSelector } from "src/store/homePrivateKeyLogin/selectors";
import { resetState, submit, hideAccount404Dialog, handleAccount404DialogConfirm } from "src/store/homePrivateKeyLogin/actions";
import validator from "src/utils/validator";
import Account404Dialog from "src/components/dialogs/Account404Dialog/Account404Dialog";

import css from './HomePrivateKeyLoginContent.pcss'

export class HomePrivateKeyLoginContent extends React.Component {

  componentWillUnmount () {
    this.props.resetState()
  }

  render () {
    return (
      <Form onSubmit={this.props.handleSubmit} className={css.HomePrivateKeyLoginContent}>
        <SigninLayout title='Import Wallet' subtitle='Type or copy your "Private Key" into the box below'>
          <Field
            name='privateKey'
            placeholder='Enter Private Key'
            component={TextField}
            multiline
            rows={2}
            className={css.passwordTextField}
            inputProps={{ className: css.passwordTextFieldInput }}
            InputProps={{ className: css.passwordTextFieldInputComponent }}
            FormHelperTextProps={{ className: css.passwordTextFieldFormHelperText }}
            validate={[ validator.required ]}
          />
          <br/>
          <br/>
          <br/>
          <br/>
          <WhiteRoundedButton type='submit' loader={this.props.submitLoading}>Proceed to Login</WhiteRoundedButton>
          <br/>
          <br/>
          <br/>
          <div className={css.otherActions}>
            or
            <Link to='/home-login-methods' className={css.backButton}>Back</Link>
          </div>
        </SigninLayout>
        <Account404Dialog
          open={this.props.openAccount404Dialog}
          onClose={this.props.hideAccount404Dialog}
          onNoClick={this.props.hideAccount404Dialog}
          onYesClick={this.props.handleAccount404DialogConfirm}
        />
      </Form>
    )
  }
}

HomePrivateKeyLoginContent = reduxForm({ form: FORM })(HomePrivateKeyLoginContent)

const mapStateToProps = (state) => ({
  submitLoading: getSubmitLoadingSelector(state),
  openAccount404Dialog: openAccount404DialogSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  resetState: () => dispatch(resetState()),
  onSubmit: () => dispatch(submit()),
  hideAccount404Dialog: () => dispatch(hideAccount404Dialog()),
  handleAccount404DialogConfirm: () => dispatch(handleAccount404DialogConfirm()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePrivateKeyLoginContent)

