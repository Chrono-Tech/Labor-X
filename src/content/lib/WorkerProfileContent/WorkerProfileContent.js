import React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { Tabs, Tab } from 'material-ui/Tabs'
import { connect } from 'react-redux'
import { reduxForm, propTypes, change, formValueSelector } from 'redux-form'
import { Router } from 'src/routes'
import { ProfileModel, WorkerModel } from 'src/models'
import { Icon, Image, Button } from 'src/components/common'
import { createServiceAttachment } from './../../../store/worker-profile'
import { getAvatar } from './../../../store/general-profile'
import { reviewWorkerProfile } from './../../../store/worker-profile'
import GeneralTab from './GeneralTab/GeneralTab'
import WorkExperienceTab from './WorkExperienceTab/WorkExperienceTab'
import ServicesTab from './ServicesTab/ServicesTab'
import css from './WorkerProfileContent.scss'

const FORM_WORKER_PROFILE = 'form/workerProfile'
const DEFAULT_AVATAR = { url: '/static/images/profile-photo.jpg' }

const style = {
  backgroundColor: 'transparent',
}

const inkBarStyle = {
  backgroundColor: '#00A0D2',
  height: '5px',
}

class WorkerProfileContent extends React.Component {
  static propTypes = {
    ...propTypes,
    profile: PropTypes.shape({
      general: PropTypes.instanceOf(ProfileModel),
      worker: PropTypes.instanceOf(WorkerModel),
    }),
    avatarUrl: PropTypes.string
  }

  constructor (props) {
    super(props)
    this.state = {
      slideIndex: 0,
    }
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    })
  }

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
    this.props.addEmptyWorkerExperience();
    if (this.state.slideIndex === 2)
    this.props.addEmptyWorkerService();
  }

  handleUploadServiceAgreement = (e) => {
    const file = e.currentTarget.files[0]
    if (file) {
      this.props.createServiceAttachment(file)
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
              className={css.tabs}
              onChange={this.handleChange}
              value={this.state.slideIndex}
              tabItemContainerStyle={style}
              inkBarStyle={inkBarStyle}
            >
              <Tab className={css.tab} label='GENERAL' value={0} />
              <Tab className={css.tab} label='WORK EXPERIENCE' value={1} />
              <Tab className={css.tab} label='SERVICES' value={2} />
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
              onChangeIndex={this.handleChange}
            >
              <GeneralTab avatarUrl={avatarUrl} generalProfile={profile.general} />
              <WorkExperienceTab />
              <ServicesTab handleUploadServiceAgreement={this.handleUploadServiceAgreement} workerProfile={profile.worker} />
            </SwipeableViews>
          </div>
        </div>
      </form>
    )
  }
}

const workerProfileContentForm = reduxForm({
  form: FORM_WORKER_PROFILE,
})(WorkerProfileContent)

function mapStateToProps (state, op) {
  const selector = formValueSelector(FORM_WORKER_PROFILE)
  const avatar = getAvatar(state);
  return {
    initialValues: {
      experiences: [{}],
      services: [{}]
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
    createServiceAttachment: (file) =>  {
      dispatch(createServiceAttachment(file))
    },
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
      dispatchProps.dispatch(change(FORM_WORKER_PROFILE, "services", [...stateProps.experiences, {}]))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(workerProfileContentForm)
