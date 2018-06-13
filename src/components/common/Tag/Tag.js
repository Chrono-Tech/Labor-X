import PropTypes from 'prop-types'
import React from 'react'
import css from './Tag.scss'

export default class Tag extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
  }

  render () {
    return (
      <div className={css.root}>
        <div className={css.value}>{this.props.value}</div>
      </div>
    )
  }
}
