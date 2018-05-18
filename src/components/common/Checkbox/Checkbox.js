import PropTypes from 'prop-types'
import React from 'react'
import MaterialCheckbox from 'material-ui/Checkbox'
import SvgIcon from 'material-ui/SvgIcon'
import { MuiThemeProvider } from 'material-ui/styles'

import { Image, Translate, Icon } from 'components/common'
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
    materialCheckbox: PropTypes.bool,
  }

  static defaultProps = {
    label: null,
    input: {
      value: '',
      checked: false,
      name: 'checkbox',
    },
    materialCheckbox: false,
  }

  // TODO @dkchv: must be input.onChange
  handleClick = () => this.props.input.onClick && this.props.onClick()

  render () {
    const {className, label, input, onCheck, materialCheckbox} = this.props
    const classNames = [css.root]
    className && classNames.push(className)

    console.log('--Checkbox#render', input)

    return materialCheckbox ? (
      <MuiThemeProvider>
        <MaterialCheckbox
          label={label}
          checkedIcon={<div><Icon size={14} {...Icon.SETS.CHECK}/></div>}
          checked={input.checked}
          {...input}
          onCheck={(event, value) => {
            input.onChange(value)
            onCheck && onCheck(value)
          }}
        />
      </MuiThemeProvider>
    ) : (
      <div className={classNames} onClick={this.handleClick}>
        <Image className={css.icon} icon={Image.ICONS.CHECKBOX_OFF}/>
        {label && <div className={css.label}><Translate value={label}/></div>}
        <input type='checkbox' className={css.checkbox}/>
      </div>
    )
  }
}
