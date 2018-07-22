import React from 'react'
import { connect } from 'react-redux'
import Link from 'react-router-dom/Link'
import Redirect from 'react-router-dom/Redirect'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import TextField from 'redux-form-material-ui/lib/TextField'
import Form from 'redux-form/lib/Form'
import Field from 'redux-form/lib/Field'
import reduxForm from 'redux-form/lib/reduxForm'
import {getAccount as getUserAccount} from "../store/reducer/user";
import {getAddress} from "../store/reducer/loginView";

var LoginView =  (props) => {
    return props.userAccount ? <Redirect to='/manage' /> : (
        <div>
            <h1>Log In</h1>
            <List>
                <ListItem>
                    <Avatar src='http://test.laborx.io/images/profile-photo.jpg?crc=364076933' />
                    <ListItemText primary='My Account' secondary={props.address} />
                </ListItem>
            </List>
            <Form onSubmit={props.handleSubmit}>
                <Field name='password' component={TextField} />
                <Button type='submit' variant='contained'>Login</Button>
            </Form>
            <Link to='/home-mnemonic-login'>Forgot your Password?</Link>
            <Link to='/crypto-education'>Create an Account</Link>
        </div>
    )
}

LoginView = reduxForm({ form: 'LoginView' })(LoginView)

const mapStateToProps = (state) => ({
    // signinLoading:
    // signinFailure:
    userAccount: getUserAccount(state),
    address: getAddress(state)
})

const mapDispatchToProps = (dispatch) => ({
    onSubmit: () => dispatch(submit())
})

LoginView = connect(mapStateToProps, mapDispatchToProps)(LoginView)

export default LoginView