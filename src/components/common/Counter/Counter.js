import PropTypes from 'prop-types'
import React from 'react'
import css from './Counter.scss'

export default class Counter extends React.Component {
  static propTypes = {
    // className: PropTypes.string,
    value: PropTypes.number,
    isPercent: PropTypes.bool,
  }

  getAttributes (value, isPercent) {
    let validatedValue = +value
    let className

    if (Number.isNaN(validatedValue) || !Number.isFinite(validatedValue)) {
      className = css.error
    } else {
      if (!isPercent) {
        if (validatedValue === 0) {
          className = css.zero
        } else {
          className = css.positive
          validatedValue = `+${validatedValue}`
        }
      } else {
        className = (validatedValue === 0) ? css.zeroPercent : css.positivePercent
        validatedValue = `${validatedValue}%`
      }
    }

    return { className, value: validatedValue }
  }

  render () {
    const { value, isPercent } = this.props
    let validatedValue = +value
    let className

    if (Number.isNaN(validatedValue) || !Number.isFinite(validatedValue)) {
      return null
    } else {
      if (!isPercent) {
        if (validatedValue > 0) {
          className = css.positive
          validatedValue = `+${validatedValue}`
        } else {
          return null
        }
      } else {
        className = (validatedValue === 0) ? css.zeroPercent : css.positivePercent
        validatedValue = `${validatedValue}%`
      }
    }

    return (
      <div className={[ css.root, className ].join(' ')}>{validatedValue}</div>
    )
  }
}
