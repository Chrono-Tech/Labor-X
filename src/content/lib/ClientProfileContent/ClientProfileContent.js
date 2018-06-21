import React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Router } from 'src/routes'
import { ProfileModel, ClientModel } from 'src/models'
import { Icon, Image, Button } from 'src/components/common'
import GeneralTab from './GeneralTab/GeneralTab'
import StuffTab from './StuffTab/StuffTab'
import css from './ClientProfileContent.scss'

const style = {
  backgroundColor: 'transparent',
}

const inkBarStyle = {
  backgroundColor: '#00A0D2',
  height: '5px',
}

export default class ClientProfileContent extends React.Component {
  static propTypes = {
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
    console.log('---ClientProfileContent handleHelp')
  }

  handleSubmit = async (values) => {
    // eslint-disable-next-line no-console
    console.log('---ClientProfileContent handleSubmit, values', values)
  }

  render () {
    const { profile, stuff } = this.props

    console.log('profile', profile)
    console.log('stuff', stuff)

    return (
      <div className={css.main}>
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
                size={32}
                {...Icon.SETS.HELP_INVERT}
                onClick={this.handleHelp}
              />
              <Button
                className={css.doneButton}
                label='terms.done'
                mods={Button.MODS.FLAT}
                onClick={this.handleSubmit}
              />
            </div>
          </div>
        </div>
        <div className={css.content}>
          <div className={css.header}>
            <h2>Client Profile</h2>
            <Tabs
              className={css.tabs}
              onChange={this.handleChange}
              value={this.state.slideIndex}
              tabItemContainerStyle={style}
              inkBarStyle={inkBarStyle}
            >
              <Tab className={css.tab} label='GENERAL' value={0} />
              <Tab className={css.tab} label='STUFF' value={1} />
            </Tabs>
          </div>
          <div className={css.tabContent}>
            <SwipeableViews
              index={this.state.slideIndex}
              onChangeIndex={this.handleChange}
            >
              <GeneralTab generalProfile={profile.general} clientProfile={profile.client} />
              <StuffTab stuff={stuff} />
            </SwipeableViews>
          </div>
        </div>
      </div>
    )
  }
}
