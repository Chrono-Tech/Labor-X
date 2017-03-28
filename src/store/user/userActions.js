// @flow
import log from 'loglevel';
import {browserHistory} from 'react-router';
import {push} from 'react-router-redux';

export const loginUser = (address: string) => {
    return (dispatch, getState) => {
        log.debug('loginUser action');

        dispatch({
            type: 'USER/LOGIN',
            address: address
        });

        dispatch(getBalance(address));

        // Used a manual redirect here as opposed to a wrapper.
        // This way, once logged in a user can still access the home page.
        const currentLocation = browserHistory.getCurrentLocation();
        if ('redirect' in currentLocation.query) {
            return dispatch(push(decodeURIComponent(currentLocation.query.redirect)));
        }
        return dispatch(push('/dashboard'));
    };
};

export const getBalance = (address: string) => {
    return (dispatch, getState) => {
        const web3 = getState().network.web3;

        web3.eth.getBalance(address, (err, balance) => {
            if (err !== null) {
                log.error("There was an error fetching balance.", err);
                return
            }

            dispatch({
                type: 'USER/RECEIVE_BALANCE',
                address: address,
                balance: balance
            });
        });
    }
};
