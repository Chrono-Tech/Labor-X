import React from 'react'
import { connect } from 'react-redux'
import Link from 'react-router-dom/Link'
import Redirect from 'react-router-dom/Redirect'
import Button from '@material-ui/core/Button'

import { download } from './../store/reducer/yourWalletFileView'
import {getMnemonic} from "../store/reducer/accountPasswordView";

var YourWalletFileView = (props) => {
    return props.mnemonic ? (
        <div>
            <h1>Create New Account</h1>
            <h2>Your Wallet File</h2>
            <Button variant='contained' onClick={props.download}>Download Wallet File</Button>
            <Link to='/welcome'>Finish</Link>
        </div>
    ) : <Redirect to='/account-password' />
}

const mapStateToProps = (state) => ({
    mnemonic: getMnemonic(state),
})

const mapDispatchToProps = (dispatch) => ({
    download: () => dispatch(download())
})

YourWalletFileView = connect(mapStateToProps, mapDispatchToProps)(YourWalletFileView)

export default YourWalletFileView