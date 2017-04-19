import React from  'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'

/**
 * For development and debug only, will be removed in the future
 */
class Debug extends React.Component {

  constructor(props) {
    super(props)
    this.state = {hash:''}
  }

  handleReadHashClick = () => {
    const result = this.props.db.get(this.state.hash);
    console.log('db.get = ' + JSON.stringify(result));

    this.props.daemon.object.get(this.state.hash, { enc: 'base58'}).then(res => {
      console.log('res:'+JSON.stringify(res))

    }).catch(e => console.error('object.get: '+e));
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
    db: state.ipfs.db,
    daemon: state.ipfs.daemon
  }
}

export default connect(mapStateToProps, null)(Debug)