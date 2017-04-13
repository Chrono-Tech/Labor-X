import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'

import {method} from '../../store/targetContract/actions';

export class Dashboard extends React.Component {

  handleClick = () => {
    this.props.dispatch(method());
  }

  render () {
    const {address, balance} = this.props

    return (
      <div>
        <p>Dashboard</p>
        <p>Your address: { address }</p>
        <p>Balance: { balance && balance.toNumber() }</p>
        <RaisedButton
          label='Call Target Contract'
          primary={ true }
          fullWidth={ true }
          onTouchTap={ this.handleClick }
          />
      </div>)
  }
}

const mapStateToProps = (state) => {
  return {
    address: state.user.address,
    balance: state.user.balance
  }
}

export default connect(mapStateToProps)(Dashboard)
