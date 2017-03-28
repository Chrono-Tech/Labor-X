import React from 'react';
import {connect} from 'react-redux';
import {SelectField, MenuItem, RaisedButton, Paper} from 'material-ui';

import {loginUser} from '../../store/user/userActions';

import styles from './styles';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedAccount: null };
    }

    handleChange = (event, index, value) => this.setState({selectedAccount: value});

    handleClick = () => {
        this.props.login(this.state.selectedAccount);
    };

    render() {
        const accounts = this.props.accounts || [];
        const { selectedAccount } = this.state;

        return (
            <div style={ styles.loginContainer }>
                <Paper style={ styles.paper }>
                    <SelectField
                        floatingLabelText="Ethereum account"
                        value={ selectedAccount }
                        onChange={ this.handleChange }
                        fullWidth={ true }>
                        { accounts.map(a => <MenuItem key={a} value={a} primaryText={a}/>) }
                    </SelectField>

                    <RaisedButton label="Login"
                                  primary={ true }
                                  fullWidth={ true }
                                  onTouchTap={ this.handleClick }
                                  disabled={ this.state.selectedAccount === null }
                                  style={ styles.loginBtn }/>
                </Paper>

                <div style={ styles.buttonsDiv }>
                    {/*<FlatButton*/}
                    {/*label="Access problems?"*/}
                    {/*href="/"*/}
                    {/*style={styles.flatButton}*/}
                    {/*icon={<Help />}/>*/}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        accounts: state.network.accounts
    }
};

const mapDispatchToProps = (dispatch) => ({
    login: (address) => dispatch(loginUser(address))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
