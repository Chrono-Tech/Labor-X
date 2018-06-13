import React from 'react'
import css from './Moment.scss'
import PropTypes from 'prop-types'

// TODO @dkchv: in progress

export default class Moment extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
  }

  render () {
    return (
      <div className={this.props.className}>{this.props.value}</div>
    )
  }
}
