import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, formValueSelector, propTypes } from 'redux-form'
import { TimePicker, DatePicker, TextField } from 'redux-form-material-ui'
import { connect } from 'react-redux'
import { JobModel, FlowTypeModel, FLOW_TYPES  } from 'src/models'
import { modalsPop } from 'src/store'
import { Button } from 'src/components/common'
import css from './MakeOfferDialog.scss'
import validate from './validate'

export const FORM_MAKE_OFFER = 'form/makeOffer'

class MakeOfferDialog extends React.Component {
  static propTypes = {
    ...propTypes,
    totalBudget: PropTypes.number,
    totalHours: PropTypes.number,
    job: PropTypes.instanceOf(JobModel).isRequired,
    handleCancel: PropTypes.func,
  }

  renderHourRate (totalHours, totalBudget) {
    const hourRate = totalHours ? totalBudget / totalHours : 0
    return `${hourRate.toFixed(2)}/h, $${(hourRate * 30).toFixed(2)}`
  }

  renderFlowTM (totalBudget, totalHours) {
    return (
      <div>
        <div className={css.twoColumn}>
          <div>
            <Field
              fullWidth
              component={TextField}
              name='totalBudget'
              floatingLabelText='Total Budget, LHUS'
            />
            <p>USD {totalBudget ? (totalBudget * 30).toFixed(2) : '0.00'}</p>
          </div>
          <div>
            <Field
              fullWidth
              component={TextField}
              name='totalHours'
              floatingLabelText='Total Hours'
            />
            <p>LHUS {this.renderHourRate(totalHours || 0, totalBudget || 0)}</p>
          </div>
        </div>
        <div className={css.twoColumn}>
          <Field
            fullWidth
            name='startDate'
            component={DatePicker}
            floatingLabelText='Start Date'
            // eslint-disable-next-line react/jsx-no-bind
            format={(value) => value === '' ? null : value}
          />
          <Field
            fullWidth
            name='endDate'
            component={DatePicker}
            floatingLabelText='End Date'
            // eslint-disable-next-line react/jsx-no-bind
            format={(value) => value === '' ? null : value}
          />
        </div>
        <Field
          fullWidth
          name='startTime'
          component={TimePicker}
          floatingLabelText='Start Time'
          // eslint-disable-next-line react/jsx-no-bind
          format={(value) => value === '' ? null : value}
        />
        <Field
          fullWidth
          component={TextField}
          name='description'
          hintText='Describe Your Offer'
          multiLine
          rows={2}
        />
      </div>
    )
  }

  render () {
    const { job, totalBudget, totalHours, handleSubmit } = this.props

    return (
      <form
        className={css.root}
        onSubmit={handleSubmit}
      >
        <div className={css.header}>
          <h2>Make Your Offer!</h2>
          <div className={css.headerInfo}>
            Client would like to receive custom offers for this job. Specify your offer details bellow in order to apply for this job.
          </div>
        </div>
        <div className={css.body}>
          { FlowTypeModel.valueOf(job.flowType) === FLOW_TYPES.FIXED_PRICE ? (
            <Field
              fullWidth
              component={TextField}
              name='totalPrice'
              floatingLabelText='Total Price, LHUS'
            />
          ) : (
            this.renderFlowTM(totalBudget, totalHours)
          )}
        </div>
        <div className={css.actions}>
          <Button
            buttonClassName={css.cancelAction}
            type={Button.TYPES.BUTTON}
            onClick={this.props.handleCancel}
            label='CANCEL'
          />
          <Button
            buttonClassName={css.applyAction}
            type={Button.TYPES.SUBMIT}
            label='APPLY'
          />
        </div>
      </form>
    )
  }
}

function mapStateToProps (state) {
  const formSelector = formValueSelector(FORM_MAKE_OFFER)
  return {
    totalBudget: Number(formSelector(state, 'totalBudget')),
    totalHours: Number(formSelector(state, 'totalHours')),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    async onSubmit (values) {
      // eslint-disable-next-line no-console
      console.log('MakeOfferDialog-handleSubmit values', values)
    },
    handleCancel () {
      dispatch(modalsPop())
    },
  }
}

const DialogForm = reduxForm({
  form: FORM_MAKE_OFFER,
  validate,
})(MakeOfferDialog)

export default connect(mapStateToProps, mapDispatchToProps)(DialogForm)
