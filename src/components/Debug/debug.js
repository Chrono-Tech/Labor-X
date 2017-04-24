import React from  'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import log from 'loglevel';

/**
 * For development and debug only, will be removed in the future
 */
class Debug extends React.Component {

  constructor(props) {
    super(props)
    this.state = {hash:''}
  }

  handleReadHashClick = () => {
    this.props.ipfs.client.getObj(this.state.hash).then(result => {
      log.info(result);
    });
  }

  updateInputHash = (event) => {
    this.setState({hash: event.target.value})
  }

  render() {
    return (
      <div>
        <input onChange={this.updateInputHash} value={this.state.hash} />
        <RaisedButton
          label='Read from OrbitDb'
          primary={ true }
          fullWidth={ true }
          onTouchTap={ this.handleReadHashClick }
        />

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ipfs: state.ipfs,
  }
}

export default connect(mapStateToProps, null)(Debug)