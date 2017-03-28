
const onUserLogin = (state, action) => {
    if (action.type === 'USER/LOGIN') {
        return {logged: true};
    }
    return state;
};

export const userReducers = (state = {}, action) => {
    state = onUserLogin(state, action);
    return state;
};
