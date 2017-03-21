import React, {Component} from 'react';
import {connect} from 'react-redux';

import './App.css';

export class App extends Component {

    render() {
        const accounts = this.props.accounts || [];
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Welcome to Labor X</h2>
                </div>

                <div className="App-intro">
                    {
                        accounts && accounts.map(a => (
                            <p key={a}><code>{a}</code></p>
                        ))
                    }
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

export default connect(mapStateToProps)(App);
