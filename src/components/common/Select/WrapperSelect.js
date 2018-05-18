import React from 'react'
import PropTypes from 'prop-types'

import muiThemeable from 'material-ui/styles/muiThemeable'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { MuiThemeProvider } from 'material-ui/styles'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const profileTheme = {
  underlineStyle: {
    bottom: 2,
  },
  underlineFocusStyle: {
    height: 1,
    borderWidth: 1,
    bottom: 2,
  },
  hintStyle: {
    color: '#7F7F7F',
    fontSize: 14,
    fontStyle: 'italic',
  },
  iconStyle: {
    width: 'auto',
    height: 'auto',
    top: 0,
    bottom: 0,
    padding: 0,
  },
}

class WrapperSelect extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      value: PropTypes.string,
      name: PropTypes.string,
    }),
    label: PropTypes.string,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]),
    }),
    children: PropTypes.element,
  }
  
  render () {
    const { input, label, meta, children, ...custom } = this.props
    
    return (
      <SelectField
        floatingLabelText={label}
        errorText={meta.touched && meta.error}
        style={profileTheme.style}
        hintStyle={profileTheme.hintStyle}
        underlineStyle={profileTheme.underlineStyle}
        underlineFocusStyle={profileTheme.underlineFocusStyle}
        iconStyle={profileTheme.iconStyle}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        {...custom}
      />
    )
  }
}

export default muiThemeable()(WrapperSelect)
