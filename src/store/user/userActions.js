// @flow
import log from 'loglevel';
import {browserHistory} from 'react-router';

export const loginUser = (address: string) => {
    return (dispatch) => {
        log.debug('loginUser action');
        dispatch({
            type: 'USER/LOGIN',
            address: address
        });

        // Used a manual redirect here as opposed to a wrapper.
        // This way, once logged in a user can still access the home page.
        const currentLocation = browserHistory.getCurrentLocation();
        if ('redirect' in currentLocation.query) {
            return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
        }
        return browserHistory.push('/dashboard')
    };
};
