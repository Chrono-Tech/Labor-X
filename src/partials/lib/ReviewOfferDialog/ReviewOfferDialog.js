import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, formValueSelector, propTypes } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { connect } from 'react-redux'
import { JobModel, FlowTypeModel, FLOW_TYPES } from 'src/models'
import { modalsPop } from 'src/store'
import { Button } from 'src/components/common'
import css from './ReviewOfferDialog.scss'
import validate from './validate'

export const FORM_MAKE_OFFER = 'form/makeOffer'

class ReviewOfferDialog extends React.Component {
  static propTypes = {
    ...propTypes,
    totalBudget: PropTypes.number,
    totalHours: PropTypes.number,
    job: PropTypes.instanceOf(JobModel).isRequired,
    makeOfferApply: PropTypes.func,
    handleCancel: PropTypes.func,
  }

  handleSumbit = (e) => {
    e.preventDefault()
    const { hourlyRate, totalHours, fixedPrice } = this.props
    this.props.makeOfferApply({ hourlyRate, totalHours, fixedPrice })
    this.props.handleCancel()
  }

  renderHourRate (totalHours, totalBudget) {
    const hourRate = totalHours ? totalBudget / totalHours : 0
    return `${hourRate.toFixed(2)}/h, $${(hourRate * 30).toFixed(2)}`
  }

  renderFlowTM (hourlyRate, totalHours) {
    return (
      <div>
        <div className={css.twoColumn}>
          <div>
            <Field
              fullWidth
              component={TextField}
              name='hourlyRate'
              floatingLabelText='One hour cost'
            />
            <p>USD {hourlyRate}</p>
          </div>
          <div>
            <Field
              fullWidth
              component={TextField}
              name='totalHours'
              floatingLabelText='Total Hours'
            />
            <p>LHUS {totalHours}</p>
          </div>
        </div>
      </div>
    )
  }

  render () {
    const { job, hourlyRate, totalHours } = this.props

    return (
      <form
        className={css.root}
        onSubmit={this.handleSumbit}
      >
        <div className={css.header}>
          <h2>Make Your Offer!</h2>
          <div className={css.headerInfo}>
            Client would like to receive custom offers for this job. Specify your offer details bellow in order to apply for this job.
          </div>
        </div>
        <div className={css.body}>
          {FlowTypeModel.valueOf(job.flowType).index === FLOW_TYPES.FIXED_PRICE.index ? (
            <Field
              fullWidth
              component={TextField}
              name='fixedPrice'
              floatingLabelText='Total Price, LHUS'
            />
          ) : (
            this.renderFlowTM(hourlyRate, totalHours)
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
  const hourlyRate = Number(formSelector(state, 'hourlyRate'))
  const totalHours = Number(formSelector(state, 'totalHours'))
  const fixedPrice = Number(formSelector(state, 'fixedPrice'))
  return {
    hourlyRate: isNaN(hourlyRate) ? 0 : hourlyRate,
    totalHours: isNaN(totalHours) ? 0 : totalHours,
    fixedPrice: isNaN(fixedPrice) ? 0 : fixedPrice,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    handleCancel () {
      dispatch(modalsPop())
    },
  }
}

const DialogForm = reduxForm({
  form: FORM_MAKE_OFFER,
  validate,
})(ReviewOfferDialog)

export default connect(mapStateToProps, mapDispatchToProps)(DialogForm)
