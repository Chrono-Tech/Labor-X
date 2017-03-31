import React, { Component } from 'react'
import { connect } from 'react-redux'

import './App.css'

export class App extends Component {
  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>Welcome to Labor X</h2>
        </div>

        {this.props.children}
      </div>
    )
  }
}

export default connect()(App)
