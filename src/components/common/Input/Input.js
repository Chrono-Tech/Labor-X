import PropTypes from 'prop-types'
import React from 'react'
import css from './Input.scss'

export default class Input extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    invert: PropTypes.bool,
    input: PropTypes.shape({
      value: PropTypes.string,
      name: PropTypes.string,
    }),
  }

  static TYPES = {
    TEXT: 'text',
  }

  static defaultProps = {
    input: {
      value: '',
      name: 'input',
    },
    type: Input.TYPES.TEXT,
  }

  render () {
    const className = [ this.props.invert ? css.rootInvert : css.root ]
    this.props.className && className.push(this.props.className)
    return (
      <div className={className.join(' ')}>
        <input
          className={css.input}
          placeholder={this.props.placeholder}
          type={this.props.type}
          {...this.props.input}
        />
        <div className={css.line} />
      </div>
    )
  }
}
