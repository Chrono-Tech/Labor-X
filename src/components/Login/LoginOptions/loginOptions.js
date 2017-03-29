import React, {PropTypes} from 'react';
import {RaisedButton, Paper} from 'material-ui';
import styles from './styles';


export class LoginOptions extends React.Component {
    render() {
        return (
            <Paper style={ styles.paper }>
                <div style={ styles.buttonsDiv }>
                    <RaisedButton label="MetaMask"
                                  primary={ true }
                                  fullWidth={ true }
                                  onTouchTap={ this.props.onMetaMaskLogin }/>

                </div>
                <div style={ styles.buttonsDiv }>
                    <RaisedButton label="Mnemonic on INFURA"
                                  primary={ true }
                                  fullWidth={ true }
                                  onTouchTap={ this.props.onMnemonicLogin }/>

                </div>
                <div style={ styles.buttonsDiv }>
                    <RaisedButton label="Local"
                                  primary={ true }
                                  fullWidth={ true }
                                  onTouchTap={ this.props.onLocalLogin }/>

                </div>
            </Paper>)
    }
}

LoginOptions.propTypes = {
    onMetaMaskLogin: PropTypes.func,
    onMnemonicLogin: PropTypes.func,
    onLocalLogin: PropTypes.func
};

export default LoginOptions;
