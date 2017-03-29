import { UserAuthWrapper } from 'redux-auth-wrapper'
import { routerActions } from 'react-router-redux'

export const UserIsAuthenticated = UserAuthWrapper({
    authSelector: state => state.user,
    redirectAction: routerActions.replace,
    failureRedirectPath: 'login', // '/login' by default.
    wrapperDisplayName: 'UserIsAuthenticated'
});
