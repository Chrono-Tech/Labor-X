import PropTypes from 'prop-types'
import React from 'react'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { MuiThemeProvider } from 'material-ui/styles'

import css from './Radio.scss'

const iconStyle = {
  marginRight: 5,
}
export default class Radio extends React.Component {
  static propTypes = {
    radioButtonClassName: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func,
    input: PropTypes.shape({
      value: PropTypes.string,
      name: PropTypes.string,
    }),
    values: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })),
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
    values: [],
  }

  renderRadioButtons () {
    const { values, radioButtonClassName, input } = this.props

    return values.map((item, i) => (
      <RadioButton
        key={i}
        iconStyle={iconStyle}
        className={radioButtonClassName}
        label={item.label}
        value={item.value}
        checked={input.value === item.value}
        labelStyle={{ color: '#fff', fontWeight: 500, fontSize: 14 }}
        checkedIcon={<div className={css.radioWrapperChecked} />}
        uncheckedIcon={<div className={css.radioWrapper} />}
      />
    ))
  }

  render () {
    const { label, name, input, onCheck, material, values, defaultSelected, ...custom } = this.props

    console.log('--Radio#render', this.props, custom)

    return material ? (
      <MuiThemeProvider>
        <RadioButtonGroup
          {...input}
          defaultSelected={defaultSelected}
          valueSelected={input.value}
          onChange={(event, value) => {
            input.onChange(value)
            onCheck && onCheck(value)
          }}
        >
          {this.renderRadioButtons()}
        </RadioButtonGroup>
      </MuiThemeProvider>
    ) : null
  }
}
