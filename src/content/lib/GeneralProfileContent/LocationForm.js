import React from 'react'
import countryStateCity from 'country-state-city'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector } from "redux-form"
import TextField from 'redux-form-material-ui-next/lib/TextField'
import Select from 'redux-form-material-ui-next/lib/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import IconButton from '@material-ui/core/IconButton'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import DeleteSvgIcon from '@material-ui/icons/Delete'
import InsertDriveFileSvgIcon from '@material-ui/icons/InsertDriveFile'
import ActionHomeSvgIcon from '@material-ui/icons/Home'

import ProfileModel, { VALIDATION_STATE, VALIDATION_STATE_TITLE } from "../../../api/backend/model/ProfileModel"
import AttachmentModel from "../../../api/backend/model/AttachmentModel"
import { VALIDATION_STATE_CLASS, VALIDATION_STATE_ICON } from "./index"
import { Icon } from "../../../components/common/index"
import css from './index.scss'
import {
  FORM_LOCATION as FORM,
  submitLocation as submit,
  createLocationAttachment as createAttachment,
  getLocationAttachments as getAttachments,
  getLocationInitialValues as getInitialValues,
  resetLocation as reset,
} from './../../../store/general-profile'

const countries = countryStateCity.getAllCountries()
const setupText = 'Upload any documents which can prove that the entered address is valid. Note that changing and saving information will require validation re-submit.'
const finalText = 'Great Job! You have successfully passed validation. Note that changing and saving information will require validation re-submit.'

const getSubmitValues = ({ country, state, city, zip, building, suit, street, attachments }) => ({
  country,
  state,
  city,
  zip,
  addressLine1: street,
  addressLine2: `${building}|${suit}`,
  attachments,
})

class LocationForm extends React.Component {

  static propTypes = {
    dirty: PropTypes.bool,
    validationComment: PropTypes.bool,
    handleSubmit: PropTypes.func,
    _reset: PropTypes.func,
    createAttachment: PropTypes.func,
    validationState: PropTypes.string,
    country: PropTypes.number,
    state: PropTypes.number,
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

  getStates () {
    return this.props.country ? countryStateCity.getStatesOfCountry(this.props.country) : []
  }

  getCities () {
    return this.props.state ? countryStateCity.getCitiesOfState(this.props.state) : []
  }

  renderTitle () {
    return this.props.dirty ? VALIDATION_STATE_TITLE.INITIAL : VALIDATION_STATE_TITLE[this.props.validationState]
  }

  renderText () {
    return this.props.validationState === VALIDATION_STATE.SUCCESS && !this.props.dirty ? finalText : setupText
  }

  renderAttachment = (attachment) => {
    return (
      <ListItem key={attachment.id}>
        <ListItemIcon>
          <InsertDriveFileSvgIcon />
        </ListItemIcon>
        <ListItemText primary={attachment.name} />
        <ListItemSecondaryAction>
          <IconButton>
            <DeleteSvgIcon />
          </IconButton>
        </ListItemSecondaryAction>
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
              <ActionHomeSvgIcon />
            </div>
          </div>
          <div>
            <h3 className={css.cardTitle}>Home Address</h3>

            <Grid container spacing={24}>
              <Grid item xs={6}>
                <FormControl>
                  <InputLabel>Country</InputLabel>
                  <Field component={Select} name='country' className={css.field}>
                    { countries.map(x => <MenuItem key={x.id} value={x.id}>{x.name}</MenuItem>) }
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl>
                  <InputLabel>State</InputLabel>
                  <Field component={Select} name='state' className={css.field} disabled={!this.props.country} >
                    { this.getStates().map(x => <MenuItem key={x.id} value={x.id}>{x.name}</MenuItem>) }
                  </Field>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              <Grid item xs={6}>
                <FormControl>
                  <InputLabel>City</InputLabel>
                  <Field component={Select} name='city' className={css.field} disabled={!this.props.state}>
                    { this.getCities().map(x => <MenuItem key={x.id} value={x.id}>{x.name}</MenuItem>) }
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Field component={TextField} name='zip' label='Zip' className={css.field} />
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              <Grid item xs={3}>
                <Field component={TextField} name='building' label='Building #' className={classnames([css.field, css.fieldBuilding])} />
              </Grid>
              <Grid item xs={3}>
                <Field component={TextField} name='suit' label='Suit' className={classnames([css.field, css.fieldSuit])} />
              </Grid>
              <Grid item xs={6}>
                <Field component={TextField} name='street' label='Street' className={css.field} />
              </Grid>
            </Grid>
            <div className={css.validationComment}>{ this.props.validationComment }</div>
          </div>
        </div>
        <ExpansionPanel style={{ width:'100%' }}>
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
              { this.renderAttachments() }
              <br />
              <Button variant='contained' type='submit' style={{ marginRight: '1rem' }} >save & validate</Button>
              <Button variant='contained' type='button' style={{ marginRight: '1rem' }} onClick={this.handleResetClick} >reset</Button>
              <label htmlFor='location-form-attachment-file-input'>
                <Button variant='contained' component='span'>upload documents</Button>
              </label>
              <input type='file' style={{ display:'none' }} onChange={this.handleCreateAttachmentChange} id='location-form-attachment-file-input' />
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </form>
    )
  }

}

LocationForm = reduxForm({ form: FORM })(LocationForm)

const mapStateToProps = (state, { profile }) => ({
  initialValues: getInitialValues(profile),
  attachments: [ ...((profile.submitted || profile.approved || {}).attachments || []), ...getAttachments(state) ],
  country: formValueSelector(FORM)(state, 'country'),
  state: formValueSelector(FORM)(state, 'state'),
  validationState: ProfileModel.getValidationState(profile),
  validationComment: ProfileModel.getValidationComment(profile),
})

const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => dispatch(submit(getSubmitValues(values))),
  createAttachment: (file) => dispatch(createAttachment(file)),
  _reset: () => dispatch(reset()),
})

LocationForm = connect(mapStateToProps, mapDispatchToProps)(LocationForm)

export default LocationForm

