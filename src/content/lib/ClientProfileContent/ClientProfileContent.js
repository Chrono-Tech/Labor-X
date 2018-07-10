import React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector, propTypes } from 'redux-form'
import { Router } from 'src/routes'
import { ProfileModel, ClientModel } from 'src/models'
import { Icon, Image, Button } from 'src/components/common'
import GeneralTab from './GeneralTab/GeneralTab'
import StuffTab from './StuffTab/StuffTab'
import css from './ClientProfileContent.scss'

const FORM_CLIENT_PROFILE = 'form/clientProfile'

class ClientProfileContent extends React.Component {
  static propTypes = {
    ...propTypes,
    profile: PropTypes.shape({
      general: PropTypes.instanceOf(ProfileModel),
      client: PropTypes.instanceOf(ClientModel),
    }),
    stuff: PropTypes.arrayOf(PropTypes.instanceOf(ProfileModel)),
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
    console.log('---ClientProfileContent handleHelp')
  }

  handleClickAddWorker = () => {
    // eslint-disable-next-line no-console
    console.log('---ClientProfileContent handleClickAddWorker')
  }

  render () {
    const { profile, stuff, handleSubmit, clientType } = this.props

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
            <h2>Client Profile</h2>
            <Tabs
              onChange={this.handleTabChange}
              value={this.state.slideIndex}
            >
              <Tab label='GENERAL' value={0} />
              <Tab label='STUFF' value={1} />
            </Tabs>
            { this.state.slideIndex === 1 ? (
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
              <GeneralTab generalProfile={profile.general} clientType={clientType} />
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

function mapStateToProps (state, op) {
  const formSelector = formValueSelector(FORM_CLIENT_PROFILE)

  return {
    clientType: formSelector(state, 'clientType'),
    initialValues: {
      name: op.profile.general.ipfs.name,
      registered: op.profile.client.ipfs.registered,
      website: op.profile.client.ipfs.website,
      email: op.profile.client.ipfs.email,
      description: op.profile.client.ipfs.description,
      clientType: op.profile.client.ipfs.type,
    },
  }
}

function mapDispatchToProps () {
  return {
    onSubmit: async (values) => {
      // eslint-disable-next-line no-console
      console.log('---ClientProfileContent handleSubmit, values', values)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientProfileContentForm)
