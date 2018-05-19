import PropTypes from 'prop-types'
import React from 'react'
import MaterialCheckbox from 'material-ui/Checkbox'
import { MuiThemeProvider } from 'material-ui/styles'

import { Image, Translate, Icon } from 'components/common'
import css from './Checkbox.scss'

const iconStyle = {
  marginRight: 5
}

export default class Checkbox extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func,
    input: PropTypes.shape({
      value: PropTypes.string,
      name: PropTypes.string,
    }),
    material: PropTypes.bool,
  }

  static defaultProps = {
    label: null,
    input: {
      value: '',
      checked: false,
      name: 'checkbox',
    },
    material: false,
  }

  // TODO @dkchv: must be input.onChange
  handleClick = () => this.props.input.onClick && this.props.onClick()

  render () {
    const {className, label, input, onCheck, material} = this.props
    const classNames = [css.root]
    className && classNames.push(className)

    console.log('--Checkbox#render', input)

    return material ? (
      <MuiThemeProvider>
        <MaterialCheckbox
          label={label}
          iconStyle={iconStyle}
          className={classNames.join(' ')}
          checkedIcon={
            <div className={[css.iconWrapper, css.checkedIconWrapper].join(' ')}>
              <Icon className={css.checkedIcon} size={14} {...Icon.SETS.CHECK} />
            </div>
          }
          uncheckedIcon={
            <div className={[css.iconWrapper].join(' ')} />
          }
          {...input}
          checked={input.value}
          labelStyle={{ color: '#fff', fontWeight: 500, fontSize: 14 }}
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
