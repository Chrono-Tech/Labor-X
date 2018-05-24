import React from 'react'
import {oneOfType,func,bool,node,arrayOf,string} from 'prop-types'
import Dialog from 'material-ui/Dialog'
import { MuiThemeProvider } from 'material-ui/styles'

export default class DialogComponent extends React.Component {
  static propTypes = {
    children: oneOfType([node, arrayOf(node), string]),
    onClose: func,
    open: bool,
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
