import React from 'react'
import connect from 'react-redux/lib/connect/connect'
import Redirect from 'react-router-dom/Redirect'
import Route from 'react-router-dom/Route'
import { userSelector } from "src/store/user/selectors";

export const AuthRoute = (props) => props.user ? <Redirect to='/dashboard' /> : <Route {...props}>{props.children}</Route>

const mapStateToProps = (state) => ({ user: userSelector()(state) })

export default connect(mapStateToProps)(AuthRoute)