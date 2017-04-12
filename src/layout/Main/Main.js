import React from 'react';
import CurrentTx from '../../components/CurrentTx';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      {this.props.children}
      <CurrentTx />
    </div>)
  }
}

export default Main;