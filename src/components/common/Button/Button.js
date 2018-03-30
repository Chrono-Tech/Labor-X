import PropTypes from 'prop-types'
import React from 'react'
import css from './Button.scss'

export default class Button extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    type: PropTypes.string,
    onClick: PropTypes.func,
  }

  static TYPES = {
    BUTTON: 'button',
    SUBMIT: 'submit',
    RESET: 'reset',
  }

  static defaultProps = {
    type: Button.TYPES.BUTTON,
  }

  handleClick = () => this.props.onClick
    ? this.props.onClick()
    : true

  render () {
    const className = [css.root]
    this.props.className && className.push(this.props.className)

    return (
      <button
        className={className.join(' ')}
        onClick={this.handleClick}
        type={this.props.type}
      >
        {this.props.label}
      </button>
    )
  }
}
