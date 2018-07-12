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
      <Dialog open={this.props.open} onClose={this.handleRequestClose} >
        <DialogTitle>Validate Email</DialogTitle>
        <DialogContent>
          <Form onSubmit={this.props.handleSubmit} >
            <p>Enter the code from message we&#39;ve sent to the provided email address.</p>
            <Field name='emailCode' component={TextField} label='Email Code' />
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
