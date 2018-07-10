import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, Field, Form } from "redux-form"
import { TextField } from 'redux-form-material-ui'
import { RaisedButton, Dialog } from 'material-ui'

import {
  getOpenValidateEmailDialog as getOpen,
  hideValidateEmailDialog as hide,
  FORM_CONTACTS_EMAIL_CODE as FORM,
  resendEmailCode as resend,
  submitEmailCode as submit,
} from './../../../store/general-profile'

class ContactsFormValidateEmailDialog extends React.Component {

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
      <Dialog title='Validate Email' open={this.props.open} contentStyle={{ width: '30rem' }} onRequestClose={this.handleRequestClose} >
        <Form onSubmit={this.props.handleSubmit} >
          <p>Enter the code from message we&#39;ve sent to the provided email address.</p>
          <Field fullWidth name='emailCode' component={TextField} label='Email Code' />
          <br /><br />
          <RaisedButton label='OK' type='submit' style={{ marginRight: '1rem' }} />
          <RaisedButton label='RESEND' onClick={this.handleResendClick} />
        </Form>
      </Dialog>
    )
  }

}

ContactsFormValidateEmailDialog = reduxForm({ form: FORM })(ContactsFormValidateEmailDialog)

const mapStateToProps = (state) => ({
  open: getOpen(state),
})

const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => dispatch(submit(values)),
  resend: () => dispatch(resend()),
  hide: () => dispatch(hide()),
})

ContactsFormValidateEmailDialog = connect(mapStateToProps, mapDispatchToProps)(ContactsFormValidateEmailDialog)

export default ContactsFormValidateEmailDialog
