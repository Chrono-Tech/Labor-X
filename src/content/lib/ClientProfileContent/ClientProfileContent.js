import React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { connect } from 'react-redux'
import { reduxForm, propTypes, formValueSelector } from 'redux-form'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Router } from 'src/routes'
import ProfileModel from 'src/api/backend/model/ProfileModel'
import ProfileClientModel from 'src/api/backend/model/ProfileClientModel'
import { Icon, Image, Button } from 'src/components/common'
import { CLIENT_TYPE_ORGANISATION } from 'src/models'
import GeneralTab from './GeneralTab/GeneralTab'
import StuffTab from './StuffTab/StuffTab'
import {
  reviewClientProfile,
  getState,
  submitClientProfile,
} from './../../../store/client-profile'
import { getCurrencies } from './../../../store/worker-profile'
import css from './ClientProfileContent.scss'

const FORM_CLIENT_PROFILE = 'form/clientProfile'

class ClientProfileContent extends React.Component {
  static propTypes = {
    ...propTypes,
    profile: PropTypes.shape({
      general: PropTypes.instanceOf(ProfileModel),
      client: PropTypes.instanceOf(ProfileClientModel),
    }),
    stuff: PropTypes.arrayOf(PropTypes.instanceOf(ProfileModel)),
  }

  constructor (props) {
    super(props)
    this.state = {
      slideIndex: 0,
    }
  }

  componentDidMount = () => {
    this.props.reviewClientProfile()
  }

  handleChangeIndex = (index) => this.setState({ slideIndex: index })

  handleTabChange = (e, index) => this.setState({ slideIndex: index })

  handleBack () {
    Router.pushRoute('/my-profile')
  }

  handleHelp = () => {
    // eslint-disable-next-line no-console
    console.log('---ClientProfileContent handleHelp')
  }

  handleClickAddWorker = () => {
    // eslint-disable-next-line no-console
    console.log('---ClientProfileContent handleClickAddWorker')
  }

  render () {
    const { validationState, validationComment, profile, stuff, handleSubmit, clientType, currencies, organizationType, submitWorkerProfileLoading } = this.props
    return (
      <form className={css.main} onSubmit={handleSubmit}>
        <div className={css.title}>
          <div className={css.titleBar}>
            <Button
              className={css.backButton}
              icon={{
                icon: Image.ICONS.ARROW_BACK,
                color: Image.COLORS.WHITE,
              }}
              mods={Button.MODS.FLAT}
              label='My Profile'
              onClick={this.handleBack}
            />
            <div className={css.buttonsRow}>
              <Icon
                className={css.helpButton}
                size={28}
                {...Icon.SETS.HELP_INVERT}
                onClick={this.handleHelp}
              />
              {
                submitWorkerProfileLoading && (
                  <div className={css.progressBlock}>
                    <CircularProgress color='white' size={30} thickness={7} />
                  </div>
                )
              }

              {
                !submitWorkerProfileLoading && (
                  <Button
                    className={css.doneButton}
                    label='terms.done'
                    mods={Button.MODS.FLAT}
                    type={Button.TYPES.SUBMIT}
                  />
                )
              }

            </div>
          </div>
        </div>
        <div className={css.content}>
          <div className={css.header}>
            <h2>Client Profile</h2>
            <Tabs
              onChange={this.handleTabChange}
              value={this.state.slideIndex}
            >
              <Tab label='GENERAL' value={0} />
              <Tab label='STUFF' value={1} />
            </Tabs>
            {this.state.slideIndex === 1 ? (
              <Icon
                className={css.addWorker}
                color={Icon.COLORS.WHITE}
                icon={Icon.ICONS.ADD}
                size={24}
                onClick={this.handleClickAddWorker}
              />
            ) : null}
          </div>
          <div className={css.tabContent}>
            <SwipeableViews
              index={this.state.slideIndex}
              onChangeIndex={this.handleChangeIndex}
            >
              <GeneralTab
                currencies={currencies}
                validationState={validationState}
                validationComment={validationComment}
                generalProfile={profile.general}
                clientType={clientType}
                organizationType={organizationType}
              />
              <StuffTab stuff={stuff} />
            </SwipeableViews>
          </div>
        </div>
      </form>
    )
  }
}

const ClientProfileContentForm = reduxForm({
  form: FORM_CLIENT_PROFILE,
})(ClientProfileContent)

function mapStateToProps (state) {
  const clientProfileState = getState(state)
  const clientProfile = clientProfileState.profile
  return {
    initialValues: {
      verifiable: {
        type: CLIENT_TYPE_ORGANISATION.name,
      },
    },
    submitWorkerProfileFailure: clientProfileState.submitWorkerProfileFailure,
    submitWorkerProfileLoading: clientProfileState.submitWorkerProfileLoading,
    clientProfile: clientProfileState.profile,
    reviewClientProfileFailure: clientProfileState.reviewClientProfileFailure,
    validationState: ProfileModel.getValidationState(clientProfile ? clientProfile : {}),
    validationComment: ProfileModel.getValidationComment(clientProfile ? clientProfile : {}),
    currencies: getCurrencies(state),
    organizationType: formValueSelector(FORM_CLIENT_PROFILE)(state, 'verifiable.type'),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onSubmit: async (values) => {
      dispatch(submitClientProfile(values))
    },
    reviewClientProfile: () => {
      dispatch(reviewClientProfile())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientProfileContentForm)
