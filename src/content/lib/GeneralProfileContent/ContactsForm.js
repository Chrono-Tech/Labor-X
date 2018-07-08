import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, Field } from "redux-form"
import { TextField } from 'redux-form-material-ui'
import { Card, CardHeader, CardText } from 'material-ui'
import CommunicationContactsSvgIcon from '@material-ui/icons/Contacts'
import Button from '@material-ui/core/Button'
// import NavigationExpandLessSvgIcon from '@material-ui/icons/navigation/expand-less'
// import NavigationExpandMoreSvgIcon from '@material-ui/icons/navigation/expand-more'

import { Icon } from "../../../components/common/index"
import css from './index.scss'

import {
  FORM_CONTACTS as FORM,
  submitContacts as submit,
  getContactsInitialValues as getInitialValues,
  showValidateEmailDialog,
  showValidatePhoneDialog,
} from './../../../store/general-profile'
import ProfileContactsModel from "../../../api/backend/model/ProfileContactsModel"
import { VALIDATION_STATE_CLASS, VALIDATION_STATE_ICON } from "./index"
import ProfileModel, { VALIDATION_STATE, VALIDATION_STATE_TITLE } from "../../../api/backend/model/ProfileModel"

import ValidateEmailDialog from './ContactsFormValidateEmailDialog'
import ValidatePhoneDialog from './ContactsFormValidatePhoneDialog'

const setupText = 'Check your inbox or phone to complete validation. Don\'t forget to check junk mail too. Note that changing and saving information will require validation re-submit.'
const finalText = 'Great Job! You have successfully passed validation. Note that changing and saving information will require validation re-submit.'

class ContactsForm extends React.Component {

  static propTypes = {
    dirty: PropTypes.bool,
    validationComment: PropTypes.bool,
    handleSubmit: PropTypes.func,
    reset: PropTypes.func,
    validationState: PropTypes.string,
    showValidateEmailDialog: PropTypes.func,
    showValidatePhoneDialog: PropTypes.func,
    openValidateEmailDialog: PropTypes.bool,
    openValidatePhoneDialog: PropTypes.bool,
  }

  handleValidateEmailClick = () => {
    this.props.showValidateEmailDialog()
  }

  handleValidatePhoneClick = () => {
    this.props.showValidatePhoneDialog()
  }

  handleResetClick = () => {
    this.props.reset()
  }

  renderTitle () {
    return this.props.dirty ? VALIDATION_STATE_TITLE.INITIAL : VALIDATION_STATE_TITLE[this.props.validationState]
  }

  renderText () {
    return this.props.validationState === VALIDATION_STATE.SUCCESS && !this.props.dirty ? finalText : setupText
  }

  render () {
    return (
      <form className={css.card} onSubmit={this.props.handleSubmit}>
        <div className={css.cardWrapper}>
          <div>
            <div className={css.blockCircle}>
              <CommunicationContactsSvgIcon />
            </div>
          </div>
          <div>
            <h3 className={css.cardTitle}>Email and Phone</h3>
            <div className={css.flexRow}>
              <Field component={TextField} name='email' hintText='Email' className={css.field} />
              <Field component={TextField} name='phone' hintText='Phone' className={css.field} />
            </div>
            <div className={css.validationComment}>{ this.props.validationComment }</div>
          </div>
        </div>
        <Card className={css.collapseWrapper}>
          <CardHeader
            title={
              <span className={classnames([css.cardActionTitle, VALIDATION_STATE_CLASS[this.props.validationState]])}>
                <Icon className={classnames([css.icon, VALIDATION_STATE_CLASS[this.props.validationState]])} {...VALIDATION_STATE_ICON[this.props.validationState]} />
                { this.renderTitle() }
              </span>
            }
            closeIcon={<Icon className={css.openIcon} icon={Icon.ICONS.DROP_1} color={Icon.COLORS.GREY30} />}
            openIcon={<Icon className={css.openIcon} icon={Icon.ICONS.DROP_1} color={Icon.COLORS.GREY30} />}
            actAsExpander
            showExpandableButton
            className={css.collapseHeader}
          />
          <CardText className={css.collapseText} expandable>
            { this.renderText() }
            <br />
            <br />
            <Button variant='contained' type='submit' style={{ marginRight: '1rem' }}>save & validate</Button>
            <Button variant='contained' type='button' onClick={this.handleResetClick} style={{ marginRight: '1rem' }}>reset</Button>
            <Button variant='contained' type='button' onClick={this.handleValidateEmailClick} style={{ marginRight: '1rem' }}>validate email</Button>
            <Button variant='contained' type='button' onClick={this.handleValidatePhoneClick} style={{ marginRight: '1rem' }}>validate phone</Button>
          </CardText>
        </Card>
        <ValidateEmailDialog />
        <ValidatePhoneDialog />
      </form>
    )
  }

}

ContactsForm = reduxForm({ form: FORM })(ContactsForm)

const mapStateToProps = (state, { profile } : { profile: ProfileContactsModel }) => ({
  initialValues: getInitialValues(profile),
  validationState: ProfileModel.getValidationState(profile),
  validationComment: ProfileModel.getValidationComment(profile),
})

const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => dispatch(submit(values)),
  showValidateEmailDialog: () => dispatch(showValidateEmailDialog()),
  showValidatePhoneDialog: () => dispatch(showValidatePhoneDialog()),
})

ContactsForm = connect(mapStateToProps, mapDispatchToProps)(ContactsForm)

export default ContactsForm
