import React from 'react'
import Redirect from 'react-router-dom/Redirect'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'

import {getAccount as getUserAccount} from "../store/reducer/user";
import {logout} from "../store/reducer/manageView";

var ManageView = (props) => {
    return props.userAccount ? (
        <div>
            <h1>Dashboard</h1>
            <p>Your address: { props.userAccount.address.toLowerCase() }</p>
            <Button variant='contained' onClick={props.logout}>Log out</Button>
        </div>
    ) : <Redirect to='/login' />
}

const mapStateToProps = (state) => ({
    userAccount: getUserAccount(state),
})

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
})


ManageView = connect(mapStateToProps, mapDispatchToProps)(ManageView)

export default ManageView
