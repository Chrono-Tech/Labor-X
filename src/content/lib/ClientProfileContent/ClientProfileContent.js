import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { connect } from 'react-redux'
import { reduxForm, propTypes } from 'redux-form'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MuiButton from '@material-ui/core/Button'

import ProfileClientModel from 'src/api/backend/model/ProfileClientModel'
import { Icon, Image, Button } from 'src/components/common'
import {
  submit,
  FORM,
  getValidationState,
  getProfile,
  getValidationComment,
  getInitialValues,
} from 'src/store/client-profile'
import ProfileModel, {
  VALIDATION_STATE,
  VALIDATION_STATE_TITLE,
  VALIDATION_STATE_CLASS,
  VALIDATION_STATE_ICON,
} from "src/api/backend/model/ProfileModel"

import GeneralTab from './GeneralTab/GeneralTab'
import StuffTab from './StuffTab/StuffTab'

import css from './ClientProfileContent.scss'

const setupText = 'Check your inbox or phone to complete validation. Don\'t forget to check junk mail too. Note that changing and saving information will require validation re-submit.'
const finalText = 'Great Job! You have successfully passed validation. Note that changing and saving information will require validation re-submit.'

const TAB = {
  GENERAL: 'GENERAL',
  STUFF: 'STUFF',
}

const getSubmitValues = (values) => ({
  ...values,
})

class ClientProfileContent extends React.Component {
  static propTypes = {
    ...propTypes,
    profile: PropTypes.shape({
      general: PropTypes.instanceOf(ProfileModel),
      client: PropTypes.instanceOf(ProfileClientModel),
    }),
    stuff: PropTypes.arrayOf(PropTypes.instanceOf(ProfileModel)),
    push: PropTypes.func,
  }

  constructor (props) {
    super(props)
    this.state = {
      slideIndex: TAB.GENERAL,
    }
  }

  handleTabChange = (e, index) => this.setState({ slideIndex: index })

  handleHelp = () => {
    // eslint-disable-next-line no-console
    console.log('---ClientProfileContent handleHelp')
  }

  handleClickAddWorker = () => {
    // eslint-disable-next-line no-console
    console.log('---ClientProfileContent handleClickAddWorker')
  }

  renderTitle () {
    return this.props.dirty ? VALIDATION_STATE_TITLE.INITIAL : VALIDATION_STATE_TITLE[this.props.validationState]
  }

  renderText () {
    return this.props.validationState === VALIDATION_STATE.SUCCESS && !this.props.dirty ? finalText : setupText
  }

  renderTab (){
    switch (this.state.slideIndex){
      case TAB.GENERAL: return <GeneralTab />
      case TAB.STUFF: return <StuffTab />
    }
  }

  render () {
    return (
      <form className={css.main} onSubmit={this.props.handleSubmit}>
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
            </div>
          </div>

        </div>
        <div className={css.content}>
          <div className={css.header}>
            <h2>Client Profile</h2>
            <Tabs onChange={this.handleTabChange} value={this.state.slideIndex} >
              <Tab label='GENERAL' value={TAB.GENERAL} />
              <Tab label='STUFF' value={TAB.STUFF} />
            </Tabs>
            {this.state.slideIndex === TAB.STUFF ? (
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
            {this.renderTab()}
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <span className={classnames([css.cardActionTitle, VALIDATION_STATE_CLASS[this.props.validationState]])}>
                  <Icon className={classnames([css.icon, VALIDATION_STATE_CLASS[this.props.validationState]])} {...VALIDATION_STATE_ICON[this.props.validationState]} />
                  { this.renderTitle() }
                </span>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div>
                  { this.renderText() }
                  <br />
                  <br />
                  <div className={css.validationComment}>{ this.props.validationComment }</div>
                  <br />
                  <MuiButton variant='contained' type='submit' style={{ marginRight: '1rem' }} >save & validate</MuiButton>
                  <MuiButton variant='contained' type='button' onClick={this.props.reset} style={{ marginRight: '1rem' }} >reset</MuiButton>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        </div>
      </form>
    )
  }
}

const ClientProfileContentForm = reduxForm({
  form: FORM,
})(ClientProfileContent)

const mapStateToProps = (state) => ({
  validationState: getValidationState(state),
  validationComment: getValidationComment(state),
  initialValues: getInitialValues(getProfile(state)),
})

const mapDispatchToProps = (dispatch) =>  ({
  onSubmit: (values) => dispatch(submit(getSubmitValues(values))),
})

export default connect(mapStateToProps, mapDispatchToProps)(ClientProfileContentForm)
