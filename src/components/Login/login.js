import React from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';

import {loginUser} from '../../store/user/userActions';

class Login extends React.Component {
    render() {
        const accounts = this.props.accounts || [];

        return (
            <div>
                <div className="App-intro">
                    {
                        accounts && accounts.map(a => (
                            <p key={a}><code>{a}</code></p>
                        ))
                    }
                </div>
                <FlatButton
                    onClick={ this.props.login }>
                    Login</FlatButton>
            </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        accounts: state.network.accounts
    }
};

const mapDispatchToProps = (dispatch) => ({
    login: () => dispatch(loginUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
