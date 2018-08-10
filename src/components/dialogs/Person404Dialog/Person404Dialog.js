import React from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from "../../common/Button/Button"

import css from './Person404Dialog.pcss'

const Person404Dialog = (props) => (
  <Dialog
    open={props.open}
    onClose={props.onClose}
  >
    <DialogTitle><h2>LaborX account is not found</h2></DialogTitle>
    <DialogContent>
      LaborX account with the provided address is not found.
      Would you like to Create a New Account?
    </DialogContent>
    <DialogActions style={{ height: '40px' }}>
      <Button
        label='No'
        onClick={props.onClose}
        buttonClassName={[css.actionButton, css.actionButtonLeft].join(' ')}
        type={Button.TYPES.SUBMIT}
      />
      <Button
        label='YES'
        onClick={props.onSubmit}
        buttonClassName={css.actionButton}
        type={Button.TYPES.SUBMIT}
      />
    </DialogActions>
  </Dialog>
)

Person404Dialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default Person404Dialog
