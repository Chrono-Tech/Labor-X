import React from 'react'
import AppBar from 'material-ui/AppBar';
import CurrentTx from '../../components/CurrentTx'

class Main extends React.Component {

  render () {
    return (
      <div>
        <AppBar />
        {this.props.children}
        <CurrentTx />
      </div>)
  }
}

export default Main