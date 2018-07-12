import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, Field, Form } from "redux-form"
import TextField from 'redux-form-material-ui-next/lib/TextField'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'

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
      <Dialog open={this.props.open} onClose={this.handleRequestClose} >
        <DialogTitle>Validate Phone</DialogTitle>
        <DialogContent>
          <Form onSubmit={this.props.handleSubmit} >
            <p>Enter the code from the SMS message we&#39;ve sent to the provided phone number.</p>
            <Field name='phoneCode' component={TextField} label='SMS Code' />
            <br /><br />
          </Form>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' type='submit' style={{ marginRight: '1rem' }} >OK</Button>
          <Button variant='contained' onClick={this.handleResendClick} >RESEND</Button>
        </DialogActions>
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
