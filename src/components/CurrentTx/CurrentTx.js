import React from 'react';
import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar'
import CircularProgress from 'material-ui/CircularProgress';

class CurrentTx extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoHideDuration: 0,
      message: 'Event added to your calendar',
      open: true,
    };
  }

  handleRequestClose = (reason) => {
    this.setState({
      open: true,
    });
  }

  render() {
    const {currentTx} = this.props;
    const open = (currentTx.tx !== null);

    return (
      <Snackbar
        bodyStyle={{ backgroundColor: 'teal', color: 'coral' }}
        open={open}
        onRequestClose={this.handleRequestClose}
        message={this.renderCurrentTx()}
      />
    );
  }

  renderCurrentTx() {
    return (<div>
      <p>Current TX details 1</p>
      <p>Current TX details 2</p>
      <CircularProgress size={80} thickness={5} color="red" />
    </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    currentTx: state.transaction
  }
}

export default connect(mapStateToProps, null)(CurrentTx);

