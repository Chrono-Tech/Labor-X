import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, Field } from "redux-form"
import { TextField } from 'redux-form-material-ui'
import { RaisedButton, Dialog, FlatButton, Divider } from 'material-ui'

import {
  PROFILE_CONTACTS_CONFIRMATION_FORM as FORM,
  getProfileContactsConfirmationDialogOpen as getOpen,
  hideProfileContactsConfirmationDialog as hide,
  resendEmailCode,
  resendPhoneCode,
  confirmProfileContacts as submit,
  getProfileContactsConfirmationDialogConfirmationResults as getConfirmationResults,
  getProfileContactsIsEmailConfirmed,
  getProfileContactsIsPhoneConfirmed,
} from "../../../store/ui/general-profile-page"
import ProfileContactsConfirmationRequestModel from "../../../api/backend/model/ProfileContactsConfirmationRequestModel"

class ContactsForm extends React.Component {

  static propTypes = {
    resendEmailCode: PropTypes.func.isRequired,
    resendPhoneCode: PropTypes.func.isRequired,
    hide: PropTypes.func.isRequired,
    doSubmit: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  handleEmailResend = () => {
    this.props.resendEmailCode()
  }

  handlePhoneResend = () => {
    this.props.resendPhoneCode()
  }

  handleCancel = () => {
    this.props.hide()
  }

  render () {
    return (
      <Dialog
        title='Verify email / phone'
        open={this.props.open}
        contentStyle={{ width: '30rem' }}
      >
        <form onSubmit={this.props.handleSubmit}>
          <h3>Email Validation</h3>
          <p>Check email with validation code to finalize email validation.</p>
          <br />
          <Field
            component={TextField}
            name='emailCode'
            hintText='Email Code'
          />
          <br />
          <br />
          <RaisedButton label='Resend' onClick={this.handleEmailResend} />
          <br />
          <br />
          <br />
          <Divider />
          <br />
          <br />
          <br />
          <h3>Phone Validation</h3>
          <p>Enter the code from the SMS message we&#39;ve sent to provided phone number.</p>
          <br />
          <Field
            component={TextField}
            name='phoneCode'
            hintText='SMS Code'
          />
          <br />
          <br />
          <RaisedButton label='Resend SMS' onClick={this.handlePhoneResend} />
          <br />
          <br />
          <br />
          <Divider />
          <br />
          <br />
          <FlatButton
            label='Cancel'
            primary
            onClick={this.handleCancel}
          />
          <FlatButton
            label='Submit'
            type='submit'
            primary
            onClick={this.handleSubmit}
          />
        </form>
      </Dialog>
    )
  }

}

ContactsForm = reduxForm({ form: FORM })(ContactsForm)

const mapStateToProps = (state) => ({
  open: getOpen(state),
  confirmationResults: getConfirmationResults(state),
  isEmailConfirmed: getProfileContactsIsEmailConfirmed(state),
  isPhoneConfirmed: getProfileContactsIsPhoneConfirmed(state),
})

const mapDispatchToProps = dispatch => ({
  resendEmailCode: () => dispatch(resendEmailCode()),
  resendPhoneCode: () => dispatch(resendPhoneCode()),
  hide: () => dispatch(hide()),
  onSubmit: (values: ProfileContactsConfirmationRequestModel) => dispatch(submit(values)),
})

ContactsForm = connect(mapStateToProps, mapDispatchToProps)(ContactsForm)

export default ContactsForm
