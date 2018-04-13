import { Image, Translate } from 'components/common'
import PropTypes from 'prop-types'
import React from 'react'
import css from './Checkbox.scss'

export default class Checkbox extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func,
    input: PropTypes.shape({
      value: PropTypes.string,
      name: PropTypes.string,
    }),
  }

  static defaultProps = {
    label: null,
    input: {
      value: '',
      checked: false,
      name: 'checkbox',
    },
  }

  // TODO @dkchv: must be input.onChange
  handleClick = () => this.props.input.onClick && this.props.onClick()

  render () {
    const { className, label, input } = this.props
    const classNames = [ css.root ]
    className && classNames.push(className)

    console.log('--Checkbox#render', input.value, input.checked)

    return (
      <div className={classNames} onClick={this.handleClick}>
        <Image className={css.icon} icon={Image.ICONS.CHECKBOX_OFF} />
        {label && <div className={css.label}><Translate value={label} /></div>}

        <checkbox className={css.checkbox} />
      </div>
    )
  }
}
