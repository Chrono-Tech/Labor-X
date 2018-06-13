import PropTypes from 'prop-types'
import React from 'react'
import css from './Chip.scss'

export default class Chip extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onRemove: PropTypes.func,
  }

  handleRemove = () => this.props.onRemove && this.props.onRemove(this.props.value)

  render () {
    return (
      <div className={css.root}>
        <div className={css.value}>{this.props.value}</div>
        <div className={css.remove} onClick={this.handleRemove}>x</div>
      </div>
    )
  }
}
