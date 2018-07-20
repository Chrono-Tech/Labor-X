import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import TextField from 'redux-form-material-ui-next/lib/TextField'
import SelectField from 'redux-form-material-ui-next/lib/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Collapsible from 'react-collapsible'
import { VALIDATION_STATE, VALIDATION_STATE_TITLE } from 'src/api/backend/model/ProfileClientModel'
import CurrencyModel from 'src/api/backend/model/CurrencyModel'
import { ValidatedCheckbox, Link, Icon, Button } from 'src/components/common'
import { ProfileModel, CLIENT_TYPES_LIST, ClientTypeModel, CLIENT_TYPE_ORGANISATION, CLIENT_TYPE_ENTREPRENEUR } from 'src/models'
import DatePickerField from 'src/components/DatePickerField'
import css from './GeneralTab.scss'

export const VALIDATION_STATE_ICON = {
  [VALIDATION_STATE.INITIAL]: Icon.SETS.SECURITY_SHIELD,
  [VALIDATION_STATE.WAITING]: Icon.SETS.SECURITY_SHIELD,
  [VALIDATION_STATE.WARNING]: Icon.SETS.SECURITY_SHIELD,
  [VALIDATION_STATE.SUCCESS]: Icon.SETS.SECURITY_CHECK,
}
export const VALIDATION_STATE_CLASS = {
  [VALIDATION_STATE.INITIAL]: css.cardActionTitle,
  [VALIDATION_STATE.WAITING]: css.cardActionTitleWarning,
  [VALIDATION_STATE.WARNING]: css.cardActionTitleError,
  [VALIDATION_STATE.SUCCESS]: css.cardActionTitleSuccess,
}

export default class GeneralTab extends React.Component {
  static propTypes = {
    generalProfile: PropTypes.instanceOf(ProfileModel),
    clientType: PropTypes.instanceOf(ClientTypeModel),
    validationState: PropTypes.string,
    validationComment: PropTypes.string,
    organizationType: PropTypes.string,
    currencies: PropTypes.arrayOf(PropTypes.instanceOf(CurrencyModel)),
  }

  handleClickValidate = () => {
    // eslint-disable-next-line no-console
    console.log('---ClientProfileContent-GeneralTab handleClickValidate')
  }

  handleClickLogo = () => {
    // eslint-disable-next-line no-console
    console.log('---ClientProfileContent-GeneralTab handleClickLogo')
  }

  renderTitle () {
    return VALIDATION_STATE_TITLE[this.props.validationState]
  }

  renderUpgardeTitle () {
    return (
      <div className={css.upgradeTitle}>
        <span className={classnames([css.cardActionTitle, VALIDATION_STATE_CLASS[this.props.validationState]])}>
          <Icon className={classnames([css.icon, VALIDATION_STATE_CLASS[this.props.validationState]])} {...VALIDATION_STATE_ICON[this.props.validationState]} />
          {this.renderTitle()}
          <div className={css.validationComment}>hanik vse budet good{this.props.validationComment}</div>
        </span>
      </div>
    )
  }

  renderOrganisationInfo () {
    return (
      <div className={css.block}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h3>Organisation Info</h3>
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <Field
              fullWidth
              component={TextField}
              name='verifiable.name'
              label='Name'
            />
          </Grid>
          <Grid item xs={6}>
            <Field
              fullWidth
              openToYearSelection
              name='custom.registered'
              component={DatePickerField}
              label='Registered In'
              // eslint-disable-next-line react/jsx-no-bind
              format={(value) => value === '' ? null : value}
            />
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <Field
              fullWidth
              component={TextField}
              name='verifiable.website'
              label='Website'
            />
          </Grid>
          <Grid item xs={6}>
            <Field
              fullWidth
              component={TextField}
              name='verifiable.email'
              label='Contact Email'
            />
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Field
              fullWidth
              component={TextField}
              name='verifiable.intro'
              label='Write a few words about your organisation'
              multiLine
              rows={2}
            />
          </Grid>
        </Grid>
      </div>
    )
  }

  renderInfo () {
    return (
      <div className={css.block}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h3>Info</h3>
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <Field
              fullWidth
              openToYearSelection
              name='custom.registered'
              component={DatePickerField}
              label='Registered In'
              format={(value) => value === '' ? null : value}
            />
          </Grid>
          <Grid item xs={6}>
            <Field
              fullWidth
              component={TextField}
              name='verifiable.website'
              label='Website'
            />
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Field
              fullWidth
              component={TextField}
              name='verifiable.intro'
              label='Write a few words about yourself'
              multiLine
              rows={2}
            />
          </Grid>
        </Grid>
      </div>
    )
  }

  renderCurrencies (currencies) {
    return currencies.map(({ title, symbol }) => {
      return (<Field
        key={symbol}
        component={ValidatedCheckbox}
        name={`regular.currencies.${symbol}`}
        label={title}
      />)
    })
  }

  render () {
    const { generalProfile, currencies, organizationType } = this.props
    return (
      <div className={css.content}>
        <div className={css.logoContainer} onClick={this.handleClickLogo}>
          <div className={css.logo}>
            <img src={generalProfile.ipfs.logo} alt='Logo' />
            <div className={css.overlay}>
              <Icon
                icon={Icon.ICONS.UPLOAD}
                color={Icon.COLORS.WHITE}
                size={24}
              />
              <p>UPLOAD PHOTO</p>
            </div>
          </div>
        </div>
        <div className={css.block}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <h3>Organisation Type</h3>
            </Grid>
          </Grid>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <FormControl className={css.field}>
                <InputLabel>Organisation Type</InputLabel>
                <Field
                  fullWidth
                  component={SelectField}
                  name='verifiable.type'
                >
                  {
                    CLIENT_TYPES_LIST.map(type => {
                      return <MenuItem key={type.name} value={type.name} > {type.label} </MenuItem>
                    })
                  }
                </Field>
              </FormControl>
            </Grid>
          </Grid>
        </div>
        {organizationType === CLIENT_TYPE_ORGANISATION.name ? this.renderInfo() : null}
        {organizationType === CLIENT_TYPE_ENTREPRENEUR.name ? this.renderOrganisationInfo() : null}
        <div className={css.block}>
          <h3>Currency</h3>
          <p>Selected currencies will be used for transactions. Need an advice? <Link className={css.link} href='/recommendations'>View our Recommendations</Link></p>
          {this.renderCurrencies(currencies)}
        </div>
        <Collapsible triggerDisabled classParentString={css.upgradeBlock} trigger={this.renderUpgardeTitle()} >
          <div className={css.description}>
            <p>Upload any documents which can prove that the entered information is valid. Note that changing and saving information will require validation re-submit.</p>
          </div>
          <div className={css.documents}>
            <div className={css.documentEntry}>
              <Icon
                icon={Icon.ICONS.FILE}
                color={Icon.COLORS.BLACK}
                size={28}
              />
              <p>Licence.pdf</p>
              <Icon
                icon={Icon.ICONS.DELETE}
                color={Icon.COLORS.GREY30}
                size={28}
              />
            </div>
            <div className={css.documentEntry}>
              <Icon
                icon={Icon.ICONS.UPLOAD}
                color={Icon.COLORS.BLUE}
                size={28}
              />
              <p>Tax Certificate</p>
            </div>
            <div className={css.documentEntry}>
              <Icon
                icon={Icon.ICONS.UPLOAD}
                color={Icon.COLORS.BLUE}
                size={28}
              />
              <p>Other Documents</p>
            </div>
          </div>
          <Button
            className={css.validateButton}
            primary
            color={Button.COLORS.PRIMARY}
            label='Validate'
            onClick={this.handleClickValidate}
          />
        </Collapsible>
      </div >
    )
  }
}
