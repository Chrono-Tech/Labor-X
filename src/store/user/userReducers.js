
const onUserLogin = (state, action) => {
    if (action.type === 'USER/LOGIN') {
        return {
            logged: true,
            address: action.address
        };
    }
    return state;
};

const onReceiveBalance = (state, action) => {
    if (action.type === 'USER/RECEIVE_BALANCE') {
        return {
            ...state,
            balance: action.balance
        };
    }
    return state;
};

export const userReducers = (state = {}, action) => {
    state = onUserLogin(state, action);
    state = onReceiveBalance(state, action);
    return state;
};
