import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, Field } from "redux-form"
import { TextField } from 'redux-form-material-ui'
import { Card, CardHeader, CardText, RaisedButton, IconButton } from 'material-ui'
import { List, ListItem } from 'material-ui/List'
import DeleteSvgIcon from '@material-ui/icons/Delete'
import InsertDriveFileSvgIcon from '@material-ui/icons/InsertDriveFile'
import LocationCitySvgIcon from '@material-ui/icons/LocationCity'
import DatePickerField from 'src/components/DatePickerField'
import ProfileModel, { VALIDATION_STATE, VALIDATION_STATE_TITLE } from "../../../api/backend/model/ProfileModel"
import AttachmentModel from "../../../api/backend/model/AttachmentModel"
import { VALIDATION_STATE_CLASS, VALIDATION_STATE_ICON } from "./index"
import { Icon } from "../../../components/common/index"
import css from './index.scss'
import {
  FORM_PASSPORT as FORM,
  submitPassport as submit,
  createPassportAttachment as createAttachment,
  getPassportAttachments as getAttachments,
  getPassportInitialValues as getInitialValues,
  resetPassport as reset,
} from './../../../store/general-profile'

const setupText = 'Upload requested documents which can support that the entered information is valid. Note that changing and saving information will require validation re-submit.'
const finalText = 'Great Job! You have successfully passed validation. Note that changing and saving information will require validation re-submit.'

const getSubmitValues = ({ passport, expirationDate, attachments }) => ({
  passport,
  expirationDate: expirationDate.toISOString(),
  attachments,
})

class PassportForm extends React.Component {

  static propTypes = {
    dirty: PropTypes.bool,
    validationComment: PropTypes.bool,
    handleSubmit: PropTypes.func,
    _reset: PropTypes.func,
    createAttachment: PropTypes.func,
    validationState: PropTypes.string,
    attachments: PropTypes.arrayOf(AttachmentModel),
  }

  handleResetClick = () => {
    // eslint-disable-next-line
    this.props._reset()
  }

  handleCreateAttachmentChange = (e) => {
    const file = e.currentTarget.files[0]
    if (file) {
      this.props.createAttachment(file)
      e.currentTarget.value = ''
    }
  }

  renderTitle () {
    return this.props.dirty ? VALIDATION_STATE_TITLE.INITIAL : VALIDATION_STATE_TITLE[this.props.validationState]
  }

  renderText () {
    return this.props.validationState === VALIDATION_STATE.SUCCESS && !this.props.dirty ? finalText : setupText
  }

  renderAttachment = (attachment) => {
    return (
      <ListItem leftIcon={<InsertDriveFileSvgIcon />} rightIconButton={<IconButton><DeleteSvgIcon /></IconButton>}>
        { attachment.name }
      </ListItem>
    )
  }

  renderAttachments () {
    return (
      <List>
        { this.props.attachments.map(x => this.renderAttachment(x)) }
      </List>
    )
  }

  render () {
    return (
      <form className={css.card} onSubmit={this.props.handleSubmit}>
        <Field name='attachments' component='input' type='hidden' />
        <div className={css.cardWrapper}>
          <div>
            <div className={css.blockCircle}>
              <LocationCitySvgIcon />
            </div>
          </div>
          <div>
            <h3 className={css.cardTitle}>Identity Card</h3>
            <div className={css.flexRow}>
              <Field component={TextField} name='passport' hintText='Passport ID' className={css.field} />
              <Field component={DatePickerField} name='expirationDate' label='Expiration Date' className={css.field} />
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
            { this.renderAttachments() }
            <br />
            <RaisedButton type='submit' label='save & validate' style={{ marginRight: '1rem' }} />
            <RaisedButton type='button' label='reset' style={{ marginRight: '1rem' }} onClick={this.handleResetClick} />
            <RaisedButton type='button' label='upload documents' containerElement='label'>
              <input type='file' style={{ display:'none' }} onChange={this.handleCreateAttachmentChange} />
            </RaisedButton>
          </CardText>
        </Card>
      </form>
    )
  }

}

PassportForm = reduxForm({ form: FORM })(PassportForm)

const mapStateToProps = (state, { profile }) => ({
  initialValues: getInitialValues(profile),
  attachments: [ ...((profile.submitted || profile.approved || {}).attachments || []), ...getAttachments(state) ],
  validationState: ProfileModel.getValidationState(profile),
  validationComment: ProfileModel.getValidationComment(profile),
})

const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => dispatch(submit(getSubmitValues(values))),
  createAttachment: (file) => dispatch(createAttachment(file)),
  _reset: () => dispatch(reset()),
})

PassportForm = connect(mapStateToProps, mapDispatchToProps)(PassportForm)

export default PassportForm

