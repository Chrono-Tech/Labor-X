import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

import PersonalForm from './PersonalForm'
import ContactsForm from './ContactsForm'
import PassportForm from './PassportForm'
import LocationForm from './LocationForm'

import { Button, Image } from './../../../components/common'

import {
  getState,
  reviewProfile,
} from './../../../store/general-profile'

import css from './index.scss'
import ProfileModel, { VALIDATION_STATE } from "../../../api/backend/model/ProfileModel"
import Icon from "../../../components/common/Icon/Icon"

export const VALIDATION_STATE_ICON = {
  [VALIDATION_STATE.INITIAL]: Icon.SETS.SECURITY_SHIELD,
  [VALIDATION_STATE.WAITING]: Icon.SETS.SECURITY_SHIELD,
  [VALIDATION_STATE.WARNING]: Icon.SETS.SECURITY_SHIELD,
  [VALIDATION_STATE.SUCCESS]: Icon.SETS.SECURITY_CHECK,
}
export const VALIDATION_STATE_CLASS = {
  [VALIDATION_STATE.INITIAL]: css.cardActionTitle,
  [VALIDATION_STATE.WAITING]: css.cardActionTitleWarning,
  [VALIDATION_STATE.WARNING]: css.cardActionTitleError,
  [VALIDATION_STATE.SUCCESS]: css.cardActionTitleSuccess,
}

class GeneralProfileContent extends React.Component {

  static propTypes = {
    reviewProfile: PropTypes.func.isRequired,
    reviewProfileLoading: PropTypes.bool.isRequired,
    reviewProfileFailure: PropTypes.instanceOf(Error),
    profile: PropTypes.instanceOf(ProfileModel),
  }

  componentDidMount () {
    this.props.reviewProfile()
  }

  renderContent () {
    if (this.props.reviewProfileLoading) return <CircularProgress size={24} />
    if (this.props.reviewProfileFailure) return <div>error {this.props.reviewProfileFailure.message}</div>
    return [
      <PersonalForm profile={this.props.profile.personal} />,
      <ContactsForm profile={this.props.profile.contacts} />,
      <PassportForm profile={this.props.profile.passport} />,
      <LocationForm profile={this.props.profile.location} />,
    ]
  }

  render () {
    return (
      <div className={css.main}>
        <div className={css.titleBlock}>
          <div className={css.titleBar}>
            <Button className={css.cancelButton} icon={Image.SETS.ARROW_BACK} type={Button.TYPES.SUBMIT} mods={Button.MODS.FLAT} label='My Profile' />
            <div className={css.titleBarRight}>
              <Button className={css.doneButton} label='DONE' type={Button.TYPES.SUBMIT} mods={Button.MODS.FLAT} />
            </div>
          </div>
        </div>
        <div className={css.contentWrapper}>
          {this.renderContent()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  reviewProfileLoading: getState(state).reviewProfileLoading,
  profile: getState(state).profile,
  reviewProfileFailure: getState(state).reviewProfileFailure,
})

const mapDispatchToProps = (dispatch) => ({
  reviewProfile: () => dispatch(reviewProfile()),
})

export default connect(mapStateToProps, mapDispatchToProps)(GeneralProfileContent)
