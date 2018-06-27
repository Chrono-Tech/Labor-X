import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, Field } from "redux-form"
import { DatePicker, TextField } from 'redux-form-material-ui'
import { Card, CardHeader, CardText, RaisedButton } from 'material-ui'

import { Icon } from "../../../components/common/index"
import css from './GeneralProfileContent.scss'
import ProfilePersonalVerificationRequestModel from "../../../api/backend/model/ProfilePersonalVerificationRequestModel"
import ProfilePersonalModel from "../../../api/backend/model/ProfilePersonalModel"
import ProfilePersonalFormModel from "../../../models/form/ProfilePersonalFormModel"
import {
  PROFILE_PERSONAL_FORM,
  createNewAvatar,
  resetProfilePersonalForm,
  submitProfilePersonal,
  getAvatarUrl,
  getProfilePersonal,
  getProfilePersonalIsApproved,
  getProfilePersonalIsSubmitted,
  getProfilePersonalValidationComment,
  getProfilePersonalFormErrors,
  getProfilePersonalFormMeta,
} from "../../../store/ui/general-profile-page"

const required = value => value ? null : 'Required'

class PersonalForm extends React.Component {

  static propTypes = {
    profile: PropTypes.instanceOf(ProfilePersonalModel).isRequired,
    dirty: PropTypes.bool.isRequired,
    isSubmitted: PropTypes.bool.isRequired,
    isApproved: PropTypes.bool.isRequired,
    validationComment: PropTypes.bool.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    createNewAvatar: PropTypes.func.isRequired,
    meta: PropTypes.objectOf(PropTypes.shape({
      touched: PropTypes.bool,
    })),
    submitFailed: PropTypes.bool.isRequired,
    errors: PropTypes.objectOf(PropTypes.string),
  }

  handleResetClick = () => {
    this.props.resetForm()
  }

  handleAvatarChange = (e) => {
    const file = e.currentTarget.files[0]
    if (file) {
      this.props.createNewAvatar(file)
    }
  }

  isTouched = (field) => this.props.meta[field] && this.props.meta[field].touched

  isShowSaveAndValidateButton () {
    if (this.props.validationComment) return true
    if (this.props.dirty || (!this.props.isSubmitted && !this.props.isApproved)) return true
    if (this.props.isSubmitted) return true
    if (this.props.isApproved) return false
  }

  renderFieldErrorText = field => (this.props.submitFailed || this.isTouched(field)) && this.props.errors[field]

  renderTitleText () {
    if (this.props.validationComment) return 'Waiting for You'
    if (this.props.dirty || (!this.props.isSubmitted && !this.props.isApproved)) return 'Validate'
    if (this.props.isSubmitted) return 'Waiting for validation'
    if (this.props.isApproved) return 'Validated'
  }

  renderText () {
    const setupText = 'Setup your public profile. Your name and your avatar would be available for all users.'
    const finalText = 'Great Job! You have successfully passed validation. Note that changing and saving information will require validation re-submit.'
    if (this.props.validationComment) return setupText
    if (this.props.dirty || (!this.props.isSubmitted && !this.props.isApproved)) return setupText
    if (this.props.isSubmitted) return setupText
    if (this.props.isApproved) return finalText
  }

  render () {
    return (
      <form className={css.card} onSubmit={this.props.handleSubmit}>
        <Field component='input' type='hidden' name='avatar' validate={[required]} />
        <div className={css.cardWrapper}>
          <div>
            <label className={css.avatarBlock}>
              <input type='file' style={{ display: 'none' }} onChange={this.handleAvatarChange} multiple={false} />
              <img src={this.props.avatarUrl} alt='' />
              <div className={css.avatarUploadButton}>
                <Icon className={css.avatarUploadIcon} icon={Icon.ICONS.UPLOAD} />
                <br />
                <span className={css.avatarUploadButtonText}>Upload<br />Photo</span>
              </div>
            </label>
            <div className={css.avatarErrorText}>{ this.renderFieldErrorText('avatar') }</div>
          </div>
          <div>
            <h3 className={css.cardTitle}>Photo, Name and Date of birth</h3>
            <div className={css.flexRow}>
              <Field
                component={TextField}
                name='userName'
                type='text'
                hintText='User name'
                validate={[required]}
                errorText={this.renderFieldErrorText('userName')}
              />
            </div>
            <div className={css.flexRow}>
              <Field
                component={DatePicker}
                className={css.field}
                hintText='Birth date'
                name='birthDate'
                validate={[required]}
                errorText={this.renderFieldErrorText('birthDate')}
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
                { this.renderTitleText() }
              </span>
            }
            closeIcon={<Icon className={css.openIcon} icon={Icon.ICONS.DROP_1} color={Icon.COLORS.GREY30} />}
            openIcon={<Icon className={css.openIcon} icon={Icon.ICONS.DROP_1} color={Icon.COLORS.GREY30} />}
            actAsExpander
            showExpandableButton
            className={css.collapseHeader}
          />
          <CardText className={css.collapseText} expandable>
            { this.renderText() }
            <br />
            <br />
            { this.isShowSaveAndValidateButton() ? <RaisedButton type='submit' label='save & validate' style={{ marginRight: '1rem' }} /> : null }
            { this.props.dirty ? <RaisedButton type='button' label='reset' onClick={this.handleResetClick} /> : null }
          </CardText>
        </Card>
      </form>
    )
  }

}

PersonalForm = reduxForm({ form: PROFILE_PERSONAL_FORM })(PersonalForm)

const mapStateToProps = (state) => {
  const profilePersonal = getProfilePersonal(state)
  const initialValues = ProfilePersonalFormModel.fromProfilePersonalModel(profilePersonal)
  return ({
    initialValues,
    avatarUrl: getAvatarUrl(state),
    isSubmitted: getProfilePersonalIsSubmitted(state),
    isApproved: getProfilePersonalIsApproved(state),
    validationComment: getProfilePersonalValidationComment(state),
    errors: getProfilePersonalFormErrors(state),
    meta: getProfilePersonalFormMeta(state),
  })
}

const mapDispatchToProps = dispatch => ({
  resetForm: () => dispatch(resetProfilePersonalForm()),
  createNewAvatar: (file) => dispatch(createNewAvatar(file)),
  onSubmit: (values) => {
    const profilePersonalForm = new ProfilePersonalFormModel(values)
    const profilePersonalVerificationRequest = ProfilePersonalVerificationRequestModel.fromProfilePersonalFormModel(profilePersonalForm)
    dispatch(submitProfilePersonal(profilePersonalVerificationRequest))
  },
})

PersonalForm = connect(mapStateToProps, mapDispatchToProps)(PersonalForm)

export default PersonalForm
