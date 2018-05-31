import React from 'react'
import PropTypes from 'prop-types'

import MenuItem from 'material-ui/MenuItem'
import { MuiThemeProvider } from 'material-ui/styles'

import WrapperSelect from './WrapperSelect'

export default class Select extends React.Component {
  static propTypes = {
    values: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
      name: PropTypes.string,
    })),
    profileTheme: PropTypes.object,
  }

  static defaultProps = {
    profileTheme: {},
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

    return (
      <MuiThemeProvider>
        <WrapperSelect {...this.props}>
          { this.renderMenuItems() }
        </WrapperSelect>
      </MuiThemeProvider>
    )
  }
}
