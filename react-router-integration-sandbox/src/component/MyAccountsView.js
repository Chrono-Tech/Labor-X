import React from 'react'
import { connect } from 'react-redux'
import Link from 'react-router-dom/Link'
import Redirect from 'react-router-dom/Redirect'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import Avatar from '@material-ui/core/Avatar'
import { select } from "../store/reducer/myAccountsView";
import {getAccount as getUserAccount, getEncryptedAccounts} from "../store/reducer/user";

var MyAccountsView =  (props) => {
    return props.userAccount ? <Redirect to='/manage' /> : (
        <div>
            <h1>My Accounts</h1>
            <List>
                {
                    props.encryptedAccounts.length ? props.encryptedAccounts.map(x => (
                        <ListItem button onClick={() => props.select(x.address)}>
                            <Avatar src='http://test.laborx.io/images/profile-photo.jpg?crc=364076933' />
                            <ListItemText primary='My Account' secondary={x.address} />
                        </ListItem>
                    )) : <ListItem>Sorry, there are no accounts to display</ListItem>
                }
            </List>
            <Link to='/home-login-methods'>Add an existing LaborX account</Link>
            <Link to='/crypto-education'>Create an Account</Link>
        </div>
    )
}

const mapStateToProps = (state) => ({
    userAccount: getUserAccount(state),
    encryptedAccounts: getEncryptedAccounts(state),
})

const mapDispatchToProps = (dispatch) => ({
    select: (address) => dispatch(select(address))
})

MyAccountsView = connect(mapStateToProps, mapDispatchToProps)(MyAccountsView)

export default MyAccountsView