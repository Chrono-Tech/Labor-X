import React from 'react'
import { connect } from 'react-redux'
import Link from 'react-router-dom/Link'
import Redirect from 'react-router-dom/Redirect'
import Button from '@material-ui/core/Button'

import {getAccount as getUserAccount} from "../store/reducer/user";
import {getMnemonic} from "../store/reducer/accountPasswordView";
import {done} from "../store/reducer/welcomeView";


var WelcomeView =  (props) => {
    return props.mnemonic ? (
        <div>
            <h1>Welcome to LaborX!</h1>
            <Button variant='contained' onClick={props.done}>Done</Button>
        </div>
    ) : props.userAccount ? <Redirect to='/manage' /> : <Redirect to='/' />
}

const mapStateToProps = (state) => ({
    mnemonic: getMnemonic(state),
    userAccount: getUserAccount(state)
})

const mapDispatchToProps = (dispatch) => ({
    done: () => dispatch(done()),
})

WelcomeView = connect(mapStateToProps, mapDispatchToProps)(WelcomeView)

export default WelcomeView
