import React from 'react'
import withRedux from 'next-redux-wrapper'
import PropTypes from 'prop-types'
import { bootstrap } from 'store/bootstrap'
import initialStore from '../src/store'

class App extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  static getInitialProps ({ store }) {
    store.dispatch(bootstrap())
  }

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default withRedux(initialStore)(App)
