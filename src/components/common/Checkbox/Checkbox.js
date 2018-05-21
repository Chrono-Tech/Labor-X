import PropTypes from 'prop-types'
import React from 'react'
import MaterialCheckbox from 'material-ui/Checkbox'
import { MuiThemeProvider } from 'material-ui/styles'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import { Image, Translate, Icon } from 'components/common'
import css from './Checkbox.scss'
import muiThemeable from 'material-ui/styles/muiThemeable'


const theme = {
  customStyles: {
    iconStyle: {
      marginRight: 5,
    },
    checkedIcon: (
      <div className={[css.iconWrapper, css.checkedIconWrapper].join(' ')}>
        <Icon className={css.checkedIcon} size={14} {...Icon.SETS.CHECK} />
      </div>
    ),
    uncheckedIcon: (<div className={[css.iconWrapper].join(' ')} />),
    labelStyle: {
      color: '#fff',
      fontWeight: 500,
      fontSize: 14,
    },
  },
}

const WrapperCheckbox = (props) => {
  const theme = props.muiTheme && props.muiTheme.customStyles || {}

  return (
    <MaterialCheckbox
      label={props.label}
      className={props.className}
      {...props.input}
      checked={props.input.value}
      onCheck={props.onCheck}
      {...theme}
    />
  )
}

const CustomCheckbox = muiThemeable()(WrapperCheckbox)

export default class Checkbox extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func,
    input: PropTypes.object,
    material: PropTypes.bool,
    defaultTheme: PropTypes.bool,
  }

  static defaultProps = {
    label: null,
    input: {
      value: '',
      checked: false,
      name: 'checkbox',
    },
    material: false,
    defaultTheme: true,
  }

  // TODO @dkchv: must be input.onChange
  handleClick = () => this.props.input.onClick && this.props.onClick()

  render () {
    const { className, label, input, onCheck, defaultTheme } = this.props
    const classNames = [css.root]
    className && classNames.push(className)

    const checkboxTheme = defaultTheme ? getMuiTheme({}) : getMuiTheme({ customStyles : theme.customStyles })

    return (
      <MuiThemeProvider muiTheme={checkboxTheme} >
        <CustomCheckbox
          label={<Translate value={label} />}
          className={classNames.join(' ')}
          input={input}
          onCheck={(event, value) => {
            input.onChange(value)
            onCheck && onCheck(value)
          }}
        />
      </MuiThemeProvider>
    )
  }

}
