import React from 'react'
import PropTypes from 'prop-types'
import Dialog, { DialogTitle } from 'material-ui/Dialog'

export default class DialogComponent extends React.Component {
  static propTypes = {
    title: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
    ]),
    onClose: PropTypes.func,
    open: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
    ])
  }
  
  static defaultProps = {
    title: '',
    onClose: () => {},
    open: false,
  }
  
  render (){
    const { title, children, onClose, ...other } = this.props
    
    return (
      <Dialog onClose={onClose} {...other}>
        <DialogTitle>{ title }</DialogTitle>
        <div>
          {children}
        </div>
      </Dialog>
    )
  }
}
