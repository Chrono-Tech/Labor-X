import React from 'react'
import { Checkbox } from 'redux-form-material-ui-next'
import css from './ValidatedCheckbox.scss'

export default class ValidatedCheckbox extends Checkbox {
  render () {
    const { meta: { touched, error } } = this.props
    return (
      <div>
        {super.render()}
        {touched && error && <span className={css.error}>{error}</span>}
      </div>
    )
  }
}
