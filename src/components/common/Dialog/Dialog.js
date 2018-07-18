import React from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'

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
        <Dialog onClose={onClose} {...other}>
          <div>
            {children}
          </div>
        </Dialog>
    )
  }
}
