import React from 'react'
import PropTypes from 'prop-types'
import css from './Select.scss'
import muiThemeable from 'material-ui/styles/muiThemeable'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { MuiThemeProvider } from 'material-ui/styles'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const profileTheme = {
  underlineStyle: {
    bottom: 2
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

const WrapperSelect = (props) => {
  const {input, label, meta, children, muiTheme, ...custom} = props
  // let copyProps = {...props}
  console.log('wrapa', props)
  // const theme = props.muiTheme && props.muiTheme.customStyles || {}
  // delete copyProps.muiTheme
  
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
      children={children}
      {...custom}
    />
  )
}

const CustomSelect = muiThemeable()(WrapperSelect)

export default class Select extends React.Component {
  // static propTypes = {
  //   label: PropTypes.string,
  //   input: PropTypes.shape({
  //     value: PropTypes.string,
  //     name: PropTypes.string,
  //   }),
  //   values: PropTypes.arrayOf(PropTypes.shape({
  //     value: PropTypes.string,
  //     name: PropTypes.string,
  //   })),
  // }
  
  renderMenuItems(){
    const { values } = this.props
    
    return Array.isArray(values) && values.map((item, i) => (
      <MenuItem
        key={i}
        value={item.value}
        primaryText={item.name}
      />
    ))
    
  }

  render () {
    const { className, placeholder, meta, type } = this.props
    console.log('Select props', this.props)
    const styles = getMuiTheme({
      customStyles: {...profileTheme}
    })
    
    return (
      <MuiThemeProvider theme={styles}>
        <CustomSelect {...this.props}>
          { this.renderMenuItems() }
        </CustomSelect>
      </MuiThemeProvider>
    )
  }
}
