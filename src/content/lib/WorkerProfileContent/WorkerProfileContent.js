import React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { WORKER_PROFILE_FORM } from "../../../store/worker-profile/reducer"
import { connect } from 'react-redux'
import { reduxForm, propTypes, change, formValueSelector } from 'redux-form'
import { Router } from 'src/routes'
import { ProfileModel, WorkerModel } from 'src/models'
import { Icon, Image, Button } from 'src/components/common'
import { selectWorkerProfile, createServiceAttachment, reviewWorkerProfile, getWorkerProfile, getServiceAttachments, deleteServiceAttachment } from './../../../store/worker-profile'
import { getAvatar } from './../../../store/general-profile'
import GeneralTab from './GeneralTab/GeneralTab'
import WorkExperienceTab from './WorkExperienceTab/WorkExperienceTab'
import ServicesTab from './ServicesTab/ServicesTab'
import css from './WorkerProfileContent.scss'

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

  handleDeleteSertviceAttachment = (id) => {
    this.props.deleteServiceAttachment(id);
  }

  getAttachmentsByServiceIndex = (attachmentsAll, serviceIndex) => {
    let attachments = [];
    attachmentsAll.forEach((element) => {
      if (element.serviceIndex === serviceIndex) {
        attachments.push(element);
      }
    })
    return attachments;
  }

  renderValidationBlock = (submitted, approved) => {
    if (submitted) 
    return (
      <div className={css.validationBlock}>
        <Icon
          icon={Icon.ICONS.SECURITY_UPGRADE}
          color={Icon.COLORS.GOLD}
          size={25}
        />
        <div className={css.validationText}>
        Sent to validate
        </div>
      </div>
    )
    if (approved) 
    return (
      <div className={css.validationBlock}>
        <Icon
          icon={Icon.ICONS.SECURITY_UPGRADE}
          color={Icon.COLORS.GREEN}
          size={25}
        />
        <div className={css.validationText}>
        Validated
        </div>
      </div>
    )
    return (
      <div className={css.validationBlock}>
        <Icon
          icon={Icon.ICONS.SECURITY_UPGRADE}
          color={Icon.COLORS.RED}
          size={25}
        />
        <div className={css.validationText}>
        Upgrade validation level
        </div>
      </div>
    )
  }


  render () {
    const { profile, handleSubmit, avatarUrl, serviceAttachments, approved, submitted } = this.props
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
            <h2>Worker Profile {this.renderValidationBlock(submitted, approved)}</h2>
            
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
          {/* {JSON.stringify(this.props.serviceAttachments)} */}
            <SwipeableViews
              index={this.state.slideIndex}
              onChangeIndex={this.handleChangeIndex}
            >
              <GeneralTab avatarUrl={avatarUrl} generalProfile={profile.general} />
              <WorkExperienceTab onDeleteItem={this.props.handleDeleteWorkerExperience} />
              <ServicesTab onDeleteServiceAttachment={this.handleDeleteSertviceAttachment} attachments={serviceAttachments} onDeleteItem={this.props.handleDeleteWorkerService} onUploadServiceAgreement={this.handleUploadServiceAgreement} workerProfile={profile.worker} />
            </SwipeableViews>
          </div>
        </div>
      </form>
    )
  }
}

const workerProfileContentForm = reduxForm({
  form: WORKER_PROFILE_FORM,
  enableReinitialize: true
})(WorkerProfileContent)

function mapStateToProps (state) {
  const selector = formValueSelector(WORKER_PROFILE_FORM)
  const workerProfile = selectWorkerProfile(state).workerProfile;
  const serviceAttachments = getServiceAttachments(state);
  return {
    initialValues: {
      experiences: [{}],
      services: [{}],
    },
    services: selector(state, "services"),
    experiences: selector(state, "experiences"),
    avatarUrl: (getAvatar(state) || DEFAULT_AVATAR).url,
    serviceAttachments,
    approved: workerProfile  ? workerProfile.approved : false,
    submitted: workerProfile  ? workerProfile.submitted : false,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createServiceAttachment: (file, serviceIndex) =>  {
      dispatch(createServiceAttachment(file, serviceIndex))
    },
    deleteServiceAttachment: (id) => {
      dispatch(deleteServiceAttachment(id))
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
      dispatchProps.dispatch(change(WORKER_PROFILE_FORM, "experiences",  [...stateProps.experiences, {}]))
    },
    addEmptyWorkerService: () => {
      dispatchProps.dispatch(change(WORKER_PROFILE_FORM, "services", [...stateProps.services, {}]))
    },
    handleDeleteWorkerExperience: (index) => {
      let experiences = [...stateProps.experiences]
      experiences.splice(index, 1)
      dispatchProps.dispatch(change(WORKER_PROFILE_FORM, "experiences",  experiences))
    },
    handleDeleteWorkerService: (index) => {
      let services = [...stateProps.services]
      services.splice(index, 1)
      dispatchProps.dispatch(change(WORKER_PROFILE_FORM, "services", services))
    },
    onSubmit: async (values) => {
      dispatchProps.dispatch(reviewWorkerProfile(values, stateProps.serviceAttachments))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(workerProfileContentForm)
