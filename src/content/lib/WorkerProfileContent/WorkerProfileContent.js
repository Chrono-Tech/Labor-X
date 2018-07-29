import React from 'react'
import { push } from 'connected-react-router'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, propTypes } from 'redux-form'
import SwipeableViews from 'react-swipeable-views'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import MuiButton from '@material-ui/core/Button'
import { ProfileModel, WorkerModel } from 'src/models'
import { Icon, Image, Button } from 'src/components/common'
import { WORKER_PROFILE_FORM } from "../../../store/worker-profile/reducer"
import GeneralTab from './GeneralTab/GeneralTab'
import WorkExperienceTab from './WorkExperienceTab/WorkExperienceTab'
import ServicesTab from './ServicesTab/ServicesTab'
import {
  getCurrencies,
  getServiceCategories,
  submitWorkerProfile,
  getWorkerProfile,
  createExperience,
  createService,
  removeExperience,
  removeService,
  getSocials,
  getState,
} from './../../../store/worker-profile'
import { getAvatar } from './../../../store/general-profile'
import ProfileWorkerModel, { VALIDATION_STATE, VALIDATION_STATE_TITLE } from "../../../api/backend/model/ProfileWorkerModel"

import css from './WorkerProfileContent.scss'

const setupText = 'Check your inbox or phone to complete validation. Don\'t forget to check junk mail too. Note that changing and saving information will require validation re-submit.'
const finalText = 'Great Job! You have successfully passed validation. Note that changing and saving information will require validation re-submit.'

const DEFAULT_AVATAR = { url: '/static/images/profile-photo.jpg' }

const VALIDATION_STATE_ICON = {
  [VALIDATION_STATE.INITIAL]: Icon.SETS.SECURITY_SHIELD,
  [VALIDATION_STATE.WAITING]: Icon.SETS.SECURITY_SHIELD,
  [VALIDATION_STATE.WARNING]: Icon.SETS.SECURITY_SHIELD,
  [VALIDATION_STATE.SUCCESS]: Icon.SETS.SECURITY_CHECK,
}
const VALIDATION_STATE_CLASS = {
  [VALIDATION_STATE.INITIAL]: css.cardActionTitle,
  [VALIDATION_STATE.WAITING]: css.cardActionTitleWarning,
  [VALIDATION_STATE.WARNING]: css.cardActionTitleError,
  [VALIDATION_STATE.SUCCESS]: css.cardActionTitleSuccess,
}

class WorkerProfileContent extends React.Component {
  static propTypes = {
    ...propTypes,
    profile: PropTypes.shape({
      general: PropTypes.instanceOf(ProfileModel),
      worker: PropTypes.instanceOf(WorkerModel),
    }),
    avatarUrl: PropTypes.string,
    push: PropTypes.func,
  }

  constructor (props) {
    super(props)
    this.state = {
      slideIndex: 0,
    }
  }

  componentDidMount () {
    this.props.getWorkerProfile()
  }

  handleChangeIndex = (index) => this.setState({ slideIndex: index })

  handleTabChange = (e, index) => this.setState({ slideIndex: index })

  handleBack = () => {
    this.props.push('/my-profile')
  }

  handleHelp = () => {
    // eslint-disable-next-line no-console
    console.log('---WorkerProfileContent handleHelp')
  }

  handleClickAddWorker = () => {
    // eslint-disable-next-line no-console
    if (this.state.slideIndex === 1) {
      this.props.addExperience()
    }
    if (this.state.slideIndex === 2) {
      this.props.addService()
    }
  }

  renderTitle () {
    return VALIDATION_STATE_TITLE[this.props.validationState]
  }

  renderText () {
    return this.props.validationState === VALIDATION_STATE.SUCCESS && !this.props.dirty ? finalText : setupText
  }

  render () {
    const { profile, handleSubmit, avatarUrl, removeService, removeExperience, serviceCategories, currencies, socials } = this.props
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
              <Button
                className={css.doneButton}
                label='terms.done'
                mods={Button.MODS.FLAT}
                type={Button.TYPES.SUBMIT}
              />
            </div>
          </div>
        </div>
        <div className={css.content}>
          <div className={css.header}>
            <h2> Worker Profile </h2>
            <Tabs
              onChange={this.handleTabChange}
              value={this.state.slideIndex}
            >
              <Tab label='GENERAL' value={0} />
              <Tab label='WORK EXPERIENCE' value={1} />
              <Tab label='SERVICES' value={2} />
            </Tabs>

            {this.state.slideIndex > 0 ? (
              <Icon
                className={css.addWorker}
                color={Icon.COLORS.WHITE}
                icon={Icon.ICONS.ADD}
                size={24}
                onClick={this.handleClickAddWorker}
              />
            ) : null}
          </div>

          <br />
          <br />

          <div className={css.validationBlock}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <span className={classnames([css.cardActionTitle, VALIDATION_STATE_CLASS[this.props.validationState]])}>
                  <Icon className={classnames([css.icon, VALIDATION_STATE_CLASS[this.props.validationState]])} {...VALIDATION_STATE_ICON[this.props.validationState]} />
                  {this.renderTitle()}
                  <p>{this.props.validationComment}</p>
                </span>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div>
                  { this.renderText() }
                  <br />
                  <br />
                  <MuiButton variant='contained' type='submit' style={{ marginRight: '1rem' }} >save & validate</MuiButton>
                  <MuiButton variant='contained' type='button' onClick={this.handleResetClick} style={{ marginRight: '1rem' }} >reset</MuiButton>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>

          <div className={css.tabContent}>
            <SwipeableViews
              index={this.state.slideIndex}
              onChangeIndex={this.handleChangeIndex}
            >
              <GeneralTab socials={socials} avatarUrl={avatarUrl} generalProfile={profile.general} />
              <WorkExperienceTab onRemoveExperience={removeExperience} />
              <ServicesTab onRemoveService={removeService} currencies={currencies} serviceCategories={serviceCategories} />
            </SwipeableViews>

          </div>
        </div>
      </form>
    )
  }
}

const workerProfileContentForm = reduxForm({
  form: WORKER_PROFILE_FORM,
})(WorkerProfileContent)

function mapStateToProps (state) {
  const workerProfile = getState(state).workerProfile
  return {
    initialValues: {
      employments: [{}],
      services: [{}],
      socials: [],
    },
    currencies: getCurrencies(state),
    serviceCategories: getServiceCategories(state),
    socials: getSocials(state),
    validationState: ProfileWorkerModel.getValidationState(workerProfile),
    validationComment: ProfileWorkerModel.getValidationComment(workerProfile),
    avatarUrl: (getAvatar(state) || DEFAULT_AVATAR).url,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    push: (url) => dispatch(push(url)),
    getWorkerProfile: () => {
      dispatch(getWorkerProfile())
    },
    addExperience: () => {
      dispatch(createExperience())
    },
    addService: () => {
      dispatch(createService())
    },
    removeExperience: (index) => {
      dispatch(removeExperience(index))
    },
    removeService: (index) => {
      dispatch(removeService(index))
    },
    onSubmit: async (values) => {
      dispatch(submitWorkerProfile(values))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(workerProfileContentForm)
