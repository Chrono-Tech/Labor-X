import React from 'react'
import connect from 'react-redux/lib/connect/connect'
import Redirect from 'react-router-dom/Redirect'
import Route from 'react-router-dom/Route'
import { userSelector } from "src/store/user/selectors";

export const UserRoute = (props) => props.user ? <Route {...props}>{props.children}</Route> : <Redirect to='/my-accounts' />

const mapStateToProps = (state) => ({ user: userSelector()(state) })

export default connect(mapStateToProps)(UserRoute)