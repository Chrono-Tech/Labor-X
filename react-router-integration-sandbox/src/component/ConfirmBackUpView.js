import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Form, Field } from 'redux-form'
import Redirect from 'react-router-dom/Redirect'
import Button from '@material-ui/core/Button'
import TextField from "redux-form-material-ui/lib/TextField";

import {getMnemonic} from "../store/reducer/accountPasswordView";
import {submit} from "../store/reducer/confirmBackUpView";

var ConfirmBackUpView = (props) => {
    return props.mnemonic ? (
        <div>
            <h1>Create New Account</h1>
            <h2>Confirm back-up phrase (mnemonic key)</h2>
            <Form onSubmit={props.handleSubmit}>
                <Field name='mnemonicConfirm' component={TextField} />
                <Button type='submit' variant='contained'>Proceed</Button>
            </Form>
        </div>
    ) : <Redirect to='/account-password' />
}

ConfirmBackUpView = reduxForm({ form: 'ConfirmBackUpView' })(ConfirmBackUpView)

const mapStateToProps = (state) => ({
    mnemonic: getMnemonic(state),
})

const mapDispatchToProps = (dispatch) => ({
    onSubmit: () => dispatch(submit()),
})

ConfirmBackUpView = connect(mapStateToProps, mapDispatchToProps)(ConfirmBackUpView)

export default ConfirmBackUpView
