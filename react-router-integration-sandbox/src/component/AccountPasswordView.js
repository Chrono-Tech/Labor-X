import React from 'react'
import { connect } from 'react-redux'
import Link from 'react-router-dom/Link'
import Redirect from 'react-router-dom/Redirect'
import { reduxForm } from 'redux-form'
import Checkbox from 'redux-form-material-ui/lib/Checkbox'
import TextField from 'redux-form-material-ui/lib/TextField'
import Form from 'redux-form/lib/Form'
import Field from 'redux-form/lib/Field'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import {STATE, submit} from "../store/reducer/accountPasswordView";
import {getAccount as getUserAccount} from "../store/reducer/user";

var AccountPasswordView = (props) => {
    return props.userAccount ? <Redirect to='/manage' /> : (
        <div>
            <h1>Create New Account</h1>
            <h2>Select Account Type</h2>
            <Form onSubmit={props.handleSubmit}>
                <FormGroup>
                    <FormControlLabel control={<Field name='accountTypes.isRecruiter' component={Checkbox} />} label="Recruiter" />
                    <FormControlLabel control={<Field name='accountTypes.isWorker' component={Checkbox} />} label="Worker" />
                    <FormControlLabel control={<Field name='accountTypes.isClient' component={Checkbox} />} label="Client" />
                    <Field name='password' component={TextField} label='Password' />
                    <Button variant='contained' type="submit">Create an Account</Button>
                </FormGroup>
            </Form>
            <Link to='/authorization-methods'>Use another Authorization Method</Link>
        </div>
    )
}

AccountPasswordView = reduxForm({ form: 'AccountPasswordView' })(AccountPasswordView)

const mapStateToProps = (state) => ({
    userAccount: getUserAccount(state)
})

const mapDispatchToProps = (dispatch) => ({
    initialValues: { accountTypes: { ...STATE.accountTypes } },
    onSubmit: (values) => dispatch(submit(values)),
})

AccountPasswordView = connect(mapStateToProps, mapDispatchToProps)(AccountPasswordView)

export default AccountPasswordView