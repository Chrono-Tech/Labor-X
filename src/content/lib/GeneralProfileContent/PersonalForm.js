import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, Field } from "redux-form"
import { TextField } from 'redux-form-material-ui'
import { Card, CardHeader, CardText, RaisedButton } from 'material-ui'
import Grid from '@material-ui/core/Grid'

import { Icon } from "../../../components/common/index"
import css from './index.scss'

import {
  resetPersonal as reset,
  createAvatar,
  submitPersonal as submit,
  getAvatar,
  FORM_PERSONAL as FORM,
  getPersonalInitialValues as getInitialValues,
} from './../../../store/general-profile'

import ProfilePersonalModel from "../../../api/backend/model/ProfilePersonalModel"
import ProfileModel, { VALIDATION_STATE, VALIDATION_STATE_TITLE } from "../../../api/backend/model/ProfileModel"
import { VALIDATION_STATE_CLASS, VALIDATION_STATE_ICON } from "./index"
import DatePickerField from "../../../components/DatePickerField"

const DEFAULT_AVATAR = { url: '/static/images/profile-photo.jpg' }

const getSubmitValues = (values) => ({
  ...values,
  birthDate: values.birthDate.toISOString(),
})

class PersonalForm extends React.Component {

  static propTypes = {
    dirty: PropTypes.bool,
    validationComment: PropTypes.bool,
    avatarUrl: PropTypes.string,
    handleSubmit: PropTypes.func,
    _reset: PropTypes.func,
    createAvatar: PropTypes.func,
    validationState: PropTypes.string,
  }

  handleResetClick = () => {
    // eslint-disable-next-line
    this.props._reset()
  }

  handleAvatarChange = (e) => {
    const file = e.currentTarget.files[0]
    if (file) {
      this.props.createAvatar(file)
      e.currentTarget.value = ''
    }
  }

  renderTitle () {
    return this.props.dirty ? VALIDATION_STATE_TITLE.INITIAL : VALIDATION_STATE_TITLE[this.props.validationState]
  }

  renderText () {
    const setupText = 'Setup your public profile. Your name and your avatar would be available for all users.'
    const finalText = 'Great Job! You have successfully passed validation. Note that changing and saving information will require validation re-submit.'
    return this.props.validationState === VALIDATION_STATE.SUCCESS && !this.props.dirty
      ? finalText
      : setupText
  }

  render () {
    return (
      <form className={css.card} onSubmit={this.props.handleSubmit}>
        <Field component='input' type='hidden' name='avatar' />
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
          </div>
          <div>
            <h3 className={css.cardTitle}>Photo, Name and Date of birth</h3>
            <Grid container spacing={24}>
              <Grid item xs={6}>
                <Field component={TextField} name='userName' label='Name' className={css.field} />
              </Grid>
              <Grid item xs={6}>
                <Field component={DatePickerField} name='birthDate' label='Date of Birth' />
              </Grid>
            </Grid>
            <div className={css.validationComment}>{ this.props.validationComment }</div>
          </div>
        </div>
        <Card className={css.collapseWrapper}>
          <CardHeader
            title={
              <span className={classnames([css.cardActionTitle, VALIDATION_STATE_CLASS[this.props.validationState]])}>
                <Icon className={classnames([css.icon, VALIDATION_STATE_CLASS[this.props.validationState]])} {...VALIDATION_STATE_ICON[this.props.validationState]} />
                { this.renderTitle() }
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
            <RaisedButton type='submit' label='save & validate' style={{ marginRight: '1rem' }} />
            <RaisedButton type='button' label='reset' onClick={this.handleResetClick} />
          </CardText>
        </Card>
      </form>
    )
  }

}

PersonalForm = reduxForm({ form: FORM })(PersonalForm)

const mapStateToProps = (state, { profile } : { profile: ProfilePersonalModel }) => ({
  initialValues: getInitialValues(profile),
  avatarUrl: (getAvatar(state) || profile.getSubmittedAvatar() || profile.getApprovedAvatar() || DEFAULT_AVATAR).url,
  validationState: ProfileModel.getValidationState(profile),
  validationComment: ProfileModel.getValidationComment(profile),
})

const mapDispatchToProps = dispatch => ({
  _reset: () => dispatch(reset()),
  createAvatar: (file) => dispatch(createAvatar(file)),
  onSubmit: (values) => dispatch(submit(getSubmitValues(values))),
})

PersonalForm = connect(mapStateToProps, mapDispatchToProps)(PersonalForm)

export default PersonalForm
