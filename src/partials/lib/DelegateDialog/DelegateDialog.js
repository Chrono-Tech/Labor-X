import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { connect } from 'react-redux'
import { BoardModel, JobModel } from 'src/models'
import Button from "@material-ui/core/Button"
import { modalsPop } from 'src/store'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import css from './DelegateDialog.scss'

export const FORM_DELEGATE_DIALOG = 'form/delegateDialog'

class DelegateDialog extends React.Component {
  static propTypes = {
    board: PropTypes.instanceOf(BoardModel),
    job: PropTypes.instanceOf(JobModel),
    handleCancel: PropTypes.func
  } 

  handleSumbit = () => {
  }

  render () {
    return (
      <Paper className={css.root}>
        <form
          onSubmit={this.handleSumbit}
        >
          <Grid container spacing={24}>
            <Grid item xs={12}>
              Write your text for the board creator
            </Grid>
          </Grid>

          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Field
                fullWidth
                component={TextField}
                name='delegateDialogText'
                floatingLabelText='Message to board creator'
              />
            </Grid>
          </Grid>

          <Grid container spacing={24}>
            <Grid item xs={12} className={css.gridButtons}> 
              <Button className={css.cancelButton} variant='contained' onClick={this.props.handleCancel}> Cancel </Button>
              <Button className={css.submitButton} variant='contained' color='primary' type='submit'> Submit </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    )
  }
}

function mapStateToProps () {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {
    handleCancel () {
      dispatch(modalsPop())
    },
  }
}

const DialogForm = reduxForm({
  form: FORM_DELEGATE_DIALOG,
})(DelegateDialog)

export default connect(mapStateToProps, mapDispatchToProps)(DialogForm)
