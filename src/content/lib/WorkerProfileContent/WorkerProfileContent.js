import React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { connect } from 'react-redux'
import { reduxForm, propTypes, change, formValueSelector } from 'redux-form'
import { Router } from 'src/routes'
import { ProfileModel, WorkerModel } from 'src/models'
import { Icon, Image, Button } from 'src/components/common'
import { createServiceAttachment, reviewWorkerProfile, getWorkerProfile } from './../../../store/worker-profile'
import { getAvatar } from './../../../store/general-profile'
import GeneralTab from './GeneralTab/GeneralTab'
import WorkExperienceTab from './WorkExperienceTab/WorkExperienceTab'
import ServicesTab from './ServicesTab/ServicesTab'
import css from './WorkerProfileContent.scss'

const FORM_WORKER_PROFILE = 'form/workerProfile'
const DEFAULT_AVATAR = { url: '/static/images/profile-photo.jpg' }

class WorkerProfileContent extends React.Component {
  static propTypes = {
    ...propTypes,
    profile: PropTypes.shape({
      general: PropTypes.instanceOf(ProfileModel),
      worker: PropTypes.instanceOf(WorkerModel),
    }),
    avatarUrl: PropTypes.string,
  }

  constructor (props) {
    super(props)
    this.state = {
      slideIndex: 0,
    }
  }

  componentDidMount() {
    this.props.getWorkerProfile()
  }

  handleChangeIndex = (index) => this.setState({ slideIndex: index })

  handleTabChange = (e, index) => this.setState({ slideIndex: index })

  handleBack () {
    Router.pushRoute('/my-profile')
  }

  handleHelp = () => {
    // eslint-disable-next-line no-console
    console.log('---WorkerProfileContent handleHelp')
  }

  handleClickAddWorker = () => {
    // eslint-disable-next-line no-console
    if (this.state.slideIndex === 1)
    {this.props.addEmptyWorkerExperience()}
    if (this.state.slideIndex === 2)
    {this.props.addEmptyWorkerService()}
  }

  handleUploadServiceAgreement = (e, serviceIndex) => {
    const file = e.currentTarget.files[0]
    if (file) {
      this.props.createServiceAttachment(file, serviceIndex)
      e.currentTarget.value = ''
    }
  }

  render () {
    const { profile, handleSubmit, avatarUrl } = this.props

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
            <h2>Worker Profile</h2>
            <Tabs
              onChange={this.handleTabChange}
              value={this.state.slideIndex}
            >
              <Tab label='GENERAL' value={0} />
              <Tab label='WORK EXPERIENCE' value={1} />
              <Tab label='SERVICES' value={2} />
            </Tabs>
            { this.state.slideIndex > 0 ? (
              <Icon
                className={css.addWorker}
                color={Icon.COLORS.WHITE}
                icon={Icon.ICONS.ADD}
                size={24}
                onClick={this.handleClickAddWorker}
              />
            ) : null }
          </div>
          <div className={css.tabContent}>
            <SwipeableViews
              index={this.state.slideIndex}
              onChangeIndex={this.handleChangeIndex}
            >
              <GeneralTab avatarUrl={avatarUrl} generalProfile={profile.general} />
              <WorkExperienceTab onDeleteItem={this.props.handleDeleteWorkerExperience} />
              <ServicesTab onDeleteItem={this.props.handleDeleteWorkerService} onHandleUploadServiceAgreement={this.handleUploadServiceAgreement} workerProfile={profile.worker} />
            </SwipeableViews>
          </div>
        </div>
      </form>
    )
  }
}

const workerProfileContentForm = reduxForm({
  form: FORM_WORKER_PROFILE,
  enableReinitialize: true
})(WorkerProfileContent)

function mapStateToProps (state) {
  const selector = formValueSelector(FORM_WORKER_PROFILE)
  return {
    initialValues: {
      experiences: [{}],
      services: [{}],
    },
    services: selector(state, "services"),
    experiences: selector(state, "experiences"),
    avatarUrl: (getAvatar(state) || DEFAULT_AVATAR).url,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onSubmit: async (values) => {
      dispatch(reviewWorkerProfile(values))
    },
    createServiceAttachment: (file, serviceIndex) =>  {
      dispatch(createServiceAttachment(file, serviceIndex))
    },
    getWorkerProfile: () => dispatch(getWorkerProfile()),
    dispatch,
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...stateProps,  // optional
    ...dispatchProps,  // optional
    ...ownProps,
    addEmptyWorkerExperience: () => {
      dispatchProps.dispatch(change(FORM_WORKER_PROFILE, "experiences",  [...stateProps.experiences, {}]))
    },
    addEmptyWorkerService: () => {
      dispatchProps.dispatch(change(FORM_WORKER_PROFILE, "services", [...stateProps.services, {}]))
    },
    handleDeleteWorkerExperience: (index) => {
      let experiences = [...stateProps.experiences]
      experiences.splice(index, 1)
      dispatchProps.dispatch(change(FORM_WORKER_PROFILE, "experiences",  experiences))
    },
    handleDeleteWorkerService: (index) => {
      let services = [...stateProps.services]
      services.splice(index, 1)
      dispatchProps.dispatch(change(FORM_WORKER_PROFILE, "services", services))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(workerProfileContentForm)
