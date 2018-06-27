import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Card, CardHeader, CardText} from 'material-ui'
import {Icon, Input, Select} from "../common";
import css from './GeneralProfile.scss'
import {reduxForm, Field, formValueSelector } from "redux-form";
import {DatePicker} from 'redux-form-material-ui'
import {userProfileSelector} from "../../store/user/selectors";
import { uploadAvatar, submitLevel1 } from "../../store/ui/general-profile";
import ProfileModel from "../../api/backend/model/ProfileModel";
import {getImageById} from "../../store/image";
import VerificationRequestLevel1Model from "../../api/backend/model/VerificationRequestLevel1Model";

export const LEVEL1_FORM = 'GeneralProfileLevel1'
export const getFormValue = formValueSelector(LEVEL1_FORM)

class GeneralProfileLevel1 extends React.Component {

  static propTypes = {
    profile: PropTypes.instanceOf(ProfileModel).isRequired,
  }

  handleAvatarChange = (e) => {
    const file = e.currentTarget.files[0]
    if (file) {
      this.props.uploadAvatar(file)
    }
  }

  render () {

    const title = (
      <span className={[css.cardActionTitle, css.cardActionTitleSuccess].join(' ')}>
        <Icon className={css.icon} {...Icon.SETS.SECURITY_CHECK} />
        Validated
      </span>
    )

    const content = 'Great Job! You have successfully passed validation.' +
      '          Note that changing and saving information will require validation re-submit.' +
      '          View available Job Boards for your Validation level'


    return (
      <form className={css.card} onSubmit={this.props.handleSubmit}>
        <input type='hidden' name='avatar' />
        <div className={css.cardWrapper}>
          <div>
            <label className={css.avatarBlock}>
              <input type='file' style={{display: 'none'}} onChange={this.handleAvatarChange} multiple={false} />
              <img src={ this.props.avatarUrl} alt='' />
              <div className={css.avatarUploadButton}>
                <Icon className={css.avatarUploadIcon} icon={Icon.ICONS.UPLOAD} />
                <br />
                <span className={css.avatarUploadButtonText}>Upload<br />Photo</span>
              </div>
            </label>
          </div>
          <div>
            <h3 className={css.cardTitle}>Photo, Name and Date of birth</h3>
            <div className={css.flexRow}>
              <Field
                component={Input}
                className={css.field}
                name='userName'
                type='text'
                placeholder='User name'
                materialInput
                materialTheme={Input.MATERIAL_THEME.PROFILE}
              />
            </div>
            <div className={css.flexRow}>
              <Field
                component={DatePicker}
                className={css.field}
                name='birthDate'
              />
            </div>
          </div>
        </div>

        <Card className={css.collapseWrapper}>
          <CardHeader
            title={title}
            closeIcon={<Icon className={css.openIcon} icon={Icon.ICONS.DROP_1} color={Icon.COLORS.GREY30} />}
            openIcon={<Icon className={css.openIcon} icon={Icon.ICONS.DROP_1} color={Icon.COLORS.GREY30} />}
            actAsExpander
            showExpandableButton
            className={css.collapseHeader}
          />
          <CardText className={css.collapseText} expandable>
            {content}
            <button type='submit'>save & validate</button>
            <button type='button'>reset</button>
          </CardText>
        </Card>
      </form>
    )
  }

}





GeneralProfileLevel1 = reduxForm({ form: LEVEL1_FORM })(GeneralProfileLevel1)

const mapStateToProps = state => {
  const profile = state.ui.generalProfile.profile
  const initialValues = profile.level1.submitted ? {
    avatar: profile.level1.submitted.avatar.id,
    userName: profile.level1.submitted.userName,
    birthDate: new Date(profile.level1.submitted.birthDate),
  } : {}
  const avatar = getFormValue(state, 'avatar')
  return {
    initialValues,
    avatarUrl: avatar
      ? getImageById(avatar)(state).url
      : '/static/images/profile-photo.jpg'
  }
}

const mapDispatchToProps = dispatch => ({
  uploadAvatar: (file) => dispatch(uploadAvatar(file)),
  onSubmit: (values) => dispatch(submitLevel1(new VerificationRequestLevel1Model({ ...values, birthDate: values.birthDate.toISOString().split('T')[0] }))),
})

GeneralProfileLevel1 = connect(mapStateToProps, mapDispatchToProps)(GeneralProfileLevel1)

export default GeneralProfileLevel1