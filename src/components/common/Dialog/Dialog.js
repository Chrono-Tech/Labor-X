import React from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import { MuiThemeProvider } from 'material-ui/styles'

export default class DialogComponent extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node), PropTypes.string]),
    onClose: PropTypes.func,
    open: PropTypes.bool,
  }

  static defaultProps = {
    onClose: () => {},
    open: false,
  }

  render (){
    const { children, onClose, ...other } = this.props

    return (
      <MuiThemeProvider>
        <Dialog onClose={onClose} {...other}>
          <div>
            {children}
          </div>
        </Dialog>
      </MuiThemeProvider>
    )
  }
}
