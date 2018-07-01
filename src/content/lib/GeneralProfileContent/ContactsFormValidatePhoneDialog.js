import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, Field, Form } from "redux-form"
import { TextField } from 'redux-form-material-ui'
import { RaisedButton, Dialog } from 'material-ui'

import {
  getOpenValidatePhoneDialog as getOpen,
  hideValidatePhoneDialog as hide,
  FORM_CONTACTS_PHONE_CODE as FORM,
  resendPhoneCode as resend,
  submitEmailCode as submit,
} from './../../../store/general-profile'

class ContactsFormValidatePhoneDialog extends React.Component {

  static propTypes = {
    open: PropTypes.bool,
    resend: PropTypes.func,
    hide: PropTypes.func,
    handleSubmit: PropTypes.func,
  }

  handleResendClick = () => {
    this.props.resend()
  }

  handleRequestClose = () => {
    this.props.hide()
  }

  render () {
    return (
      <Dialog title='Validate Phone' open={this.props.open} contentStyle={{ width: '30rem' }} onRequestClose={this.handleRequestClose} >
        <Form onSubmit={this.props.handleSubmit} >
          <p>Enter the code from the SMS message we&#39;ve sent to the provided phone number.</p>
          <Field name='phoneCode' component={TextField} hintText='Enter SMS Code' />
          <br /><br />
          <RaisedButton label='OK' type='submit' style={{ marginRight: '1rem' }} />
          <RaisedButton label='RESEND' onClick={this.handleResendClick} />
        </Form>
      </Dialog>
    )
  }

}

ContactsFormValidatePhoneDialog = reduxForm({ form: FORM })(ContactsFormValidatePhoneDialog)

const mapStateToProps = (state) => ({
  open: getOpen(state),
})

const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => dispatch(submit(values)),
  resend: () => dispatch(resend()),
  hide: () => dispatch(hide()),
})

ContactsFormValidatePhoneDialog = connect(mapStateToProps, mapDispatchToProps)(ContactsFormValidatePhoneDialog)

export default ContactsFormValidatePhoneDialog
