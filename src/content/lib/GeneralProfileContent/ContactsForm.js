import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, Field } from "redux-form"
import { TextField } from 'redux-form-material-ui'
import { Card, CardHeader, CardText, RaisedButton } from 'material-ui'

import { Icon } from "../../../components/common/index"
import css from './GeneralProfileContent.scss'
import ProfileContactsFormModel from "../../../models/form/ProfileContactsFormModel"
import {
  PROFILE_CONTACTS_FORM as FORM,
  submitProfileContacts as submit,
  getProfileContacts,
  getProfileContactsIsApproved as getIsApproved,
  getProfileContactsIsSubmitted as getIsSubmitted,
  getProfileContactsValidationComment as getValidationComment,
  getProfileContactsFormErrors as getFormErrors,
  getProfileContactsFormMeta as getFormMeta,
  getProfileContactsFormValues as getFormValues,
  getProfileContactsIsEmailConfirmed as getIsEmailConfirmed,
  getProfileContactsIsPhoneConfirmed as getIsPhoneConfirmed,
  showProfileContactsConfirmationDialog as showConfirmationDialog,
  getProfileContactsValidationState as getValidationState,
  VALIDATION_STATE,
} from "../../../store/ui/general-profile-page"

const validationStateTitle = {
  [VALIDATION_STATE.INITIAL]: 'Validate',
  [VALIDATION_STATE.WAITING]: 'Waiting for validation',
  [VALIDATION_STATE.WARNING]: 'Waiting for You',
  [VALIDATION_STATE.SUCCESS]: 'Validated',
}

class ContactsForm extends React.Component {

  static propTypes = {

    dirty: PropTypes.bool.isRequired,
    isSubmitted: PropTypes.bool.isRequired,
    isApproved: PropTypes.bool.isRequired,
    validationComment: PropTypes.bool.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    createNewAvatar: PropTypes.func.isRequired,
    meta: PropTypes.objectOf(PropTypes.shape({
      touched: PropTypes.bool,
    })),
    submitFailed: PropTypes.bool.isRequired,
    errors: PropTypes.objectOf(PropTypes.string),
    pristine: PropTypes.bool.isRequired,
    isEmailConfirmed: PropTypes.bool.isRequired,
    isPhoneConfirmed: PropTypes.bool.isRequired,
    doSubmit: PropTypes.func.isRequired,
    showConfirmationDialog: PropTypes.func.isRequired,
    validationState: PropTypes.string.isRequired,
  }

  handleSubmit = (values) => {
    if (!this.props.isSubmitted || this.props.dirty) return this.props.doSubmit(values)
    if (this.props.isSubmitted && this.props.pristine && (!this.props.isEmailConfirmed || this.props.isPhoneConfirmed)) return this.props.showConfirmationDialog()
  }

  handleResetClick = () => {
    this.props.reset()
  }

  render () {
    return (
      <form className={css.card} onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <div className={css.cardWrapper}>
          <div>
            <div className={css.blockCircle}>
              <Icon className={css.blockCircleIcon} icon={Icon.ICONS.PHONE_EMAIL} />
            </div>
          </div>
          <div>
            <h3 className={css.cardTitle}>Email and Phone</h3>
            <div className={css.flexRow}>
              <Field
                component={TextField}
                name='email'
                hintText='Email'
                className={css.field}
              />
            </div>
            <div className={css.flexRow}>
              <Field
                component={TextField}
                name='phone'
                hintText='Phone'
                className={css.field}
              />
            </div>
            <div className={css.validationComment}>{ this.props.validationComment }</div>
          </div>
        </div>
        <Card className={css.collapseWrapper}>
          <CardHeader
            title={
              <span className={classnames([css.cardActionTitle, css.cardActionTitleSuccess])}>
                <Icon className={css.icon} {...Icon.SETS.SECURITY_CHECK} />
                { validationStateTitle[ this.props.dirty ? VALIDATION_STATE.INITIAL : this.props.validationState ] }
              </span>
            }
            closeIcon={<Icon className={css.openIcon} icon={Icon.ICONS.DROP_1} color={Icon.COLORS.GREY30} />}
            openIcon={<Icon className={css.openIcon} icon={Icon.ICONS.DROP_1} color={Icon.COLORS.GREY30} />}
            actAsExpander
            showExpandableButton
            className={css.collapseHeader}
          />
          <CardText className={css.collapseText} expandable>
            {
              this.props.validationState === VALIDATION_STATE.SUCCESS
                ? 'Great Job! You have successfully passed validation. Note that changing and saving information will require validation re-submit.'
                : 'Validate your email or phone using options below. Note that saving information changes will require re-submit for validation.'
            }
            <br />
            <br />
            <RaisedButton type='submit' label='save & validate' style={{ marginRight: '1rem' }} />
            <RaisedButton type='button' label='reset' onClick={this.handleResetClick} />
          </CardText>
        </Card>
      </form>
    )
  }

}

ContactsForm = reduxForm({ form: FORM })(ContactsForm)

const mapStateToProps = (state) => ({
  initialValues: ProfileContactsFormModel.fromProfileContactsModel(getProfileContacts(state)),
  currentValues: getFormValues(state),
  isSubmitted: getIsSubmitted(state),
  isApproved: getIsApproved(state),
  validationComment: getValidationComment(state),
  errors: getFormErrors(state),
  meta: getFormMeta(state),
  isEmailConfirmed: getIsEmailConfirmed(state),
  isPhoneConfirmed: getIsPhoneConfirmed(state),
  validationState: getValidationState(state),
})

const mapDispatchToProps = dispatch => ({
  doSubmit: (values) => dispatch(submit(values)),
  showConfirmationDialog: () => dispatch(showConfirmationDialog()),
})

ContactsForm = connect(mapStateToProps, mapDispatchToProps)(ContactsForm)

export default ContactsForm
