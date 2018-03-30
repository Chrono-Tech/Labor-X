import { Translate } from 'components/common'
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
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]),
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
    meta: {
      touched: false,
      error: null,
    },
  }

  render () {
    const { invert, className, placeholder, type, input, meta } = this.props
    const classNames = [ invert ? css.rootInvert : css.root ]
    className && classNames.push(className)
    meta.touched && meta.error && classNames.push(css.invalid)

    return (
      <div className={classNames.join(' ')}>
        <input
          className={css.input}
          placeholder={placeholder}
          type={type}
          {...input}
        />
        <div className={css.line} />
        {meta.touched && meta.error && <div className={css.error}><Translate value={meta.error} /></div>}
      </div>
    )
  }
}
