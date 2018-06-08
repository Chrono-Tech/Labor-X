import PropTypes from 'prop-types'
import React from 'react'
import uniqid from 'uniqid'
import cn from 'classnames'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { MuiThemeProvider } from 'material-ui/styles'

import css from './Radio.scss'

const iconStyle = {
  marginRight: 5,
}
export default class Radio extends React.Component {
  static LABEL_THEME = {
    WHITE: {
      color: '#fff',
      fontWeight: 500,
      fontSize: 14 ,
    },
    BLACK: {
      color: '#000',
      fontWeight: 500,
      fontSize: 14 ,
    },
  }

  static propTypes = {
    radioButtonClassName: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func,
    input: PropTypes.shape({
      value: PropTypes.string,
      name: PropTypes.string,
      onChange: PropTypes.func,
    }),
    values: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })),
    // eslint-disable-next-line react/forbid-prop-types
    defaultSelected: PropTypes.object,
    onCheck: PropTypes.func,
    name: PropTypes.string,
    material: PropTypes.bool,
    primary: PropTypes.bool,
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

  constructor (...args) {
    super(...args)
    this.renderRadioButtons = this.renderRadioButtons.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange (event, value) {
    this.props.input.onChange(value)
    this.props.onCheck && this.props.onCheck(value)
  }

  renderRadioButtons () {
    const { values, radioButtonClassName, input, primary } = this.props

    return values.map((item) => (
      <RadioButton
        key={uniqid()}
        iconStyle={iconStyle}
        className={cn(radioButtonClassName, primary ? css.primary : css.white)}
        label={item.label}
        value={item.value}
        checked={input.value === item.value}
        labelStyle={primary ? Radio.LABEL_THEME.BLACK : Radio.LABEL_THEME.WHITE}
        checkedIcon={<div className={css.radioWrapperChecked} />}
        uncheckedIcon={<div className={css.radioWrapper} />}
      />
    ))
  }

  render () {
    const { label, name, input, onCheck, material, values, defaultSelected, ...custom } = this.props

    return material ? (
      <MuiThemeProvider>
        <RadioButtonGroup
          {...custom}
          defaultSelected={defaultSelected}
          valueSelected={input.value}
          onChange={this.handleOnChange}
        >
          {this.renderRadioButtons()}
        </RadioButtonGroup>
      </MuiThemeProvider>
    ) : null
  }
}
