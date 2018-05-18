import React from 'react'
import PropTypes from 'prop-types'

import muiThemeable from 'material-ui/styles/muiThemeable'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { MuiThemeProvider } from 'material-ui/styles'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

export default class Select extends React.Component {
  static propTypes = {
    values: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
      name: PropTypes.string,
    })),
  }
  
  renderMenuItems (){
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
    const styles = getMuiTheme({
      customStyles: { ...profileTheme },
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
