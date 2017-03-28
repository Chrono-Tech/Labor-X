import React from 'react';
import {connect} from 'react-redux';

export class Dashboard extends React.Component {
    render() {
        const {address} = this.props;
        return (
            <div>
                <p>Dashboard</p>
                <p>Your address: { address }</p>
            </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        address: state.user.address
    }
};

export default connect(mapStateToProps)(Dashboard);
