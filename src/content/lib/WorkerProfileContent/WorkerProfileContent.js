import React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { connect } from 'react-redux'
import { reduxForm, propTypes } from 'redux-form'
import { Router } from 'src/routes'
import { ProfileModel, WorkerModel } from 'src/models'
import { Icon, Image, Button } from 'src/components/common'
import GeneralTab from './GeneralTab/GeneralTab'
import WorkExperienceTab from './WorkExperienceTab/WorkExperienceTab'
import ServicesTab from './ServicesTab/ServicesTab'
import css from './WorkerProfileContent.scss'

const FORM_WORKER_PROFILE = 'form/workerProfile'

class WorkerProfileContent extends React.Component {
  static propTypes = {
    ...propTypes,
    profile: PropTypes.shape({
      general: PropTypes.instanceOf(ProfileModel),
      worker: PropTypes.instanceOf(WorkerModel),
    }),
  }

  constructor (props) {
    super(props)
    this.state = {
      slideIndex: 0,
    }
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
    console.log('---WorkerProfileContent handleClickAddWorker')
  }

  render () {
    const { profile, handleSubmit } = this.props

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
              <GeneralTab generalProfile={profile.general} />
              <WorkExperienceTab />
              <ServicesTab workerProfile={profile.worker} />
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
  return {
    initialValues: {
      experiences: [{}].concat(
        op.profile.worker.ipfs.experience.map(exp => ({
          position: exp.position,
          organisation: exp.organisation,
          responsibilities: exp.responsibilities,
          workFrom: exp.workFrom,
          workTo: exp.workTo,
        })),
      ),
      services: [{}],
    },
  }
}

function mapDispatchToProps () {
  return {
    onSubmit: async (values) => {
      // eslint-disable-next-line no-console
      console.log('---WorkerProfileContent handleSubmit, values', values)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(workerProfileContentForm)
