import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'

export class App extends Component {
  render () {
    return (
      <div className='App'>
        {this.props.children}
      </div>
    )
  }
}

export default connect()(App)
