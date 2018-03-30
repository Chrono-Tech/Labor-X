import PropTypes from 'prop-types'
import React from 'react'
import { Translate as TranslateI18n } from 'react-redux-i18n'

export default class Translate extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  }

  render () {
    return this.props.value instanceof String
      ? <TranslateI18n {...this.props} />
      : <TranslateI18n {...this.props} {...this.props.value} />
  }
}
