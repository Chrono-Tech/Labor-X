import React from 'react';
import {connect} from 'react-redux';

export class Dashboard extends React.Component {
    render() {
        const {address, balance} = this.props;

        return (
            <div>
                <p>Dashboard</p>
                <p>Your address: { address }</p>
                <p>Balance: { balance && balance.toNumber() }</p>
            </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        address: state.user.address,
        balance: state.user.balance,
    }
};

export default connect(mapStateToProps)(Dashboard);
