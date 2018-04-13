import { Input, Translate } from 'components/common'
import PropTypes from 'prop-types'
import React from 'react'
import css from './NumberInput.scss'

export default class NumberInput extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    input: PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      name: PropTypes.string,
      onChange: PropTypes.func,
    }),
    max: PropTypes.number,
    min: PropTypes.number,
    subtitle: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
  }

  static defaultProps = {
    className: null,
    input: {
      // TODO @dkchv: !!! for tests
      value: 0,
      name: 'numberInput',
    },
    max: Infinity,
    min: -Infinity,
    title: null,
    subtitle: null,
  }

  handleIncrement = () => {
    this.props.input.onChange(Math.min(
      +this.props.input.value + 1,
      this.props.max,
    ))
  }

  handleDecrement = () => {
    this.props.input.onChange(Math.max(
      +this.props.input.value - 1,
      this.props.min,
    ))
  }

  render () {
    const { input, title, className, subtitle } = this.props
    const classNames = [ css.root ]
    className && classNames.push(className)

    return (
      <div className={classNames.join(' ')}>
        {title && <div className={css.title}><Translate value={title} /></div>}

        <div className={css.content}>
          <div className={css.decrement} onClick={this.handleDecrement}>-</div>
          <div className={css.value}>{+input.value}</div>
          <div className={css.increment} onClick={this.handleIncrement}>+</div>
        </div>

        {subtitle && <div className={css.subtitle}>{subtitle}</div>}

        <input
          className={css.input}
          type={Input.TYPES.TEXT}
          {...this.props.input}
        />

      </div>
    )
  }
}
