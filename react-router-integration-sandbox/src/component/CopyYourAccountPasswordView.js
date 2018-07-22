import React from 'react'
import { connect } from 'react-redux'
import Link from 'react-router-dom/Link'
import Redirect from 'react-router-dom/Redirect'
import Form from 'redux-form/lib/Form'
import reduxForm from 'redux-form/lib/reduxForm'
import Field from 'redux-form/lib/Field'
import FormGroup from '@material-ui/core/FormGroup'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from "redux-form-material-ui/lib/Checkbox";

import { getMnemonic } from './../store/reducer/accountPasswordView'
import { submit } from './../store/reducer/copyYourAccountPassword'

var CopyYourAccountPassword = (props) => {
    return props.mnemonic ? (
        <div>
            <h1>Create New Account</h1>
            <h2>Write down back-up phrase</h2>
            <Form onSubmit={props.handleSubmit}>
                <FormGroup>
                    <FormControlLabel control={<Field name='agree' component={Checkbox} />} label="I have read QA and will follow security guidelines given on this page" />
                </FormGroup>
                <Button type='submit' variant='contained'>Proceed</Button>
            </Form>
        </div>
    ) : <Redirect to='/account-password' />
}

CopyYourAccountPassword = reduxForm({ form: 'CopyYourAccountPassword' })(CopyYourAccountPassword)

const mapStateToProps = (state) => ({
    mnemonic: getMnemonic(state),
})

const mapDispatchToProps = (dispatch) => ({
    onSubmit: () => dispatch(submit()),
})

CopyYourAccountPassword = connect(mapStateToProps, mapDispatchToProps)(CopyYourAccountPassword)

export default CopyYourAccountPassword
