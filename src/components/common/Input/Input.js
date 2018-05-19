import PropTypes from 'prop-types'
import React from 'react'
import { I18n } from 'react-redux-i18n'
import TextField from 'material-ui/TextField'
import { MuiThemeProvider } from 'material-ui/styles'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import muiThemeable from 'material-ui/styles/muiThemeable'

import { Translate } from 'components/common'

import css from './Input.scss'

const materialInputStyles = {
  underlineStyle: {
    borderColor: '#A8EAFF',
    bottom: 0,
    height: 1,
  },
  underlineFocusStyle: {
    borderColor: '#fff',
    height: 1,
    borderBottomWidth: 1,
  },
  floatingLabelStyle: {
    color: '#A8EAFF',
    fontStyle: 'italic',
    left: 0,
    right: 0,
    top: 23,
    transformOrigin: 'center top',
  },
  floatingLabelFocusStyle: {
    color: '#A8EAFF',
    left: 0,
    right: 0,
    transformOrigin: 'center top',
  },
  inputStyle: {
    padding: '10px 0',
    textAlign: 'center',
    color: '#fff',
  },
  errorStyle: {
    left: 0,
    right: 0,
    bottom: -17,
    position: 'absolute',
  },
}

const profileInputStyles = {
  underlineStyle: {
    bottom: 2,
  },
  underlineFocusStyle: {
    bottom: 2,
    borderColor: '#00A0D2',
    borderBottomWidth: 1,
  },
  inputStyle: {
    fontSize: 14,
  },
  floatingLabelStyle: {
    top: 39,
    color: '#333',
    fontSize: 14,
    fontWeight: 300,
  },
}

const WrapperInput = (props) => {
  const theme = props.muiTheme && props.muiTheme.customStyles || {}

  return (
    <TextField
      floatingLabelText={props.label}
      placeholder={props.placeholder}
      className={props.className}
      margin='normal'
      type={props.type}
      {...theme}
      {...props.input}
      {...props.styles}
    />
  )
}

const CustomInput = muiThemeable()(WrapperInput)

export default class Input extends React.Component {
  static MATERIAL_THEME = {
    DEFAULT: 'default',
    LOGIN: 'login',
    PROFILE: 'profile',
  }

  static propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    invert: PropTypes.bool,
    disabled: PropTypes.bool,
    lineEnabled: PropTypes.bool,
    input: PropTypes.shape({
      value: PropTypes.string,
      name: PropTypes.string,
    }),
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]),
    }),
    autoComplete: PropTypes.bool,
    mods: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    inputMods: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    errorMods: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    materialInput: PropTypes.bool,
    materialTheme: PropTypes.oneOf([
      Input.MATERIAL_THEME.DEFAULT,
      Input.MATERIAL_THEME.LOGIN,
      Input.MATERIAL_THEME.PROFILE,
    ]),
    materialInputStyles: PropTypes.object,
  }

  static TYPES = {
    TEXT: 'text',
    PASSWORD: 'password',
  }

  static MODS = {
    INVERT: css.invert,
    HUGE: css.huge,
    BOXED: css.boxed,
    ALIGN_LEFT: css.alignLeft,
  }

  static defaultProps = {
    disabled: false,
    input: {
      value: '',
      name: 'input',
    },
    type: Input.TYPES.TEXT,
    meta: {
      touched: false,
      error: null,
    },
    placeholder: '',
    autoComplete: true,
    // TODO @dkchv: add normal as default mod
    mods: [],
    lineEnabled: false,
    materialInput: false,
    materialInputStyles: {},
  }

  getMaterialInputTheme (){
    const { materialTheme } = this.props

    let theme

    switch(materialTheme){
      case Input.MATERIAL_THEME.DEFAULT:
        theme = {}
        break

      case Input.MATERIAL_THEME.LOGIN:
        theme = materialInputStyles
        break

      case Input.MATERIAL_THEME.PROFILE:
        theme = profileInputStyles
        break

      default:
        theme = {}
    }

    return getMuiTheme({
      customStyles: { ...theme },
    })
  }

  render () {
    const { className, placeholder, type, input, label, meta, disabled, inputMods, errorMods, lineEnabled, autoComplete,
      mods, materialInput, materialInputStyles } = this.props
    const classNames = [ css.root ].concat(mods)
    const inputModsArray = [css.input ].concat(inputMods)
    const errorClassNames = [css.error].concat(errorMods)

    const materialStyles = this.getMaterialInputTheme()

    className && classNames.push(className)
    meta.touched && meta.error && classNames.push(css.invalid)
    input.autoComplete = autoComplete ? 'on' : 'off'

    return (
      <div className={materialInput ? '' : classNames.join(' ')}>
        {label && !materialInput && <div className={css.label}><Translate value={label} /></div>}
        {
          materialInput ? (
            <MuiThemeProvider muiTheme={materialStyles}>
              <CustomInput
                label={label}
                placeholder={I18n.t(placeholder)}
                className={className}
                type={type}
                input={input}
                styles={materialInputStyles}
                errorText={meta.touched && meta.error}
              />
            </MuiThemeProvider>
          ) : (
            <input
              className={inputModsArray.join(' ')}
              placeholder={I18n.t(placeholder)}
              type={type}
              disabled={disabled}
              {...input}
            />
          )
        }
        { lineEnabled ? <div className={css.line} /> : false }
        {!materialInput && meta.touched && meta.error && <div className={errorClassNames.join(' ')}><Translate value={meta.error} /></div>}
      </div>
    )
  }
}
