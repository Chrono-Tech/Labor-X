import PropTypes from 'prop-types'
import React from 'react'
import { Translate as TranslateI18n } from 'react-redux-i18n'

export default class Translate extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    className: PropTypes.string,
  }

  render () {
    let value = this.props.value
    let additional = null

    if (typeof this.props.value === 'object') {
      value = this.props.value.value
      additional = {
        ...this.props.value,
      }
      delete additional.value
    }

    return (
      <TranslateI18n
        className={this.props.className}
        value={value}
        {...additional}
      />
    )
  }
}
