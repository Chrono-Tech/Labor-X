import React from 'react'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import { Field } from 'redux-form'
import { SelectField, TextField } from 'redux-form-material-ui'
import { MenuItem } from 'material-ui'
import Collapsible from 'react-collapsible'
import { ValidatedCheckbox, Link, Icon, Button } from 'src/components/common'
import { ProfileModel, CLIENT_TYPES_LIST, CLIENT_TYPES, ClientTypeModel } from 'src/models'
import DatePickerField from 'src/components/DatePickerField'
import css from './GeneralTab.scss'

export default class GeneralTab extends React.Component {
  static propTypes = {
    generalProfile: PropTypes.instanceOf(ProfileModel),
    clientType: PropTypes.instanceOf(ClientTypeModel),
  }

  handleClickValidate = () => {
    // eslint-disable-next-line no-console
    console.log('---ClientProfileContent-GeneralTab handleClickValidate')
  }

  handleClickLogo = () => {
    // eslint-disable-next-line no-console
    console.log('---ClientProfileContent-GeneralTab handleClickLogo')
  }

  renderUpgardeTitle () {
    return (
      <div className={css.upgradeTitle}>
        <Icon
          icon={Icon.ICONS.SECURITY_UPGRADE}
          color={Icon.COLORS.RED}
          size={36}
        />
        <h3>Upgrade</h3>
      </div>
    )
  }

  renderOrganisationInfo () {
    return (
      <div className={css.block}>
        <h3>Organisation Info</h3>
        <div className={css.twoColumn}>
          <Field
            fullWidth
            component={TextField}
            name='name'
            floatingLabelText='Name'
          />
          <Field
            fullWidth
            openToYearSelection
            name='registered'
            component={DatePickerField}
            label='Registered In'
            // eslint-disable-next-line react/jsx-no-bind
            format={(value) => value === '' ? null : value}
          />
        </div>
        <div className={css.twoColumn}>
          <Field
            fullWidth
            component={TextField}
            name='website'
            floatingLabelText='Website'
          />
          <Field
            fullWidth
            component={TextField}
            name='email'
            floatingLabelText='Contact Email'
          />
        </div>
        <Field
          fullWidth
          component={TextField}
          name='description'
          hintText='Write a few words about your organisation'
          multiLine
          rows={2}
        />
      </div>
    )
  }

  renderInfo () {
    return (
      <div className={css.block}>
        <h3>Info</h3>
        <div className={css.twoColumn}>
          <Field
            fullWidth
            openToYearSelection
            name='registered'
            component={DatePickerField}
            label='Registered In'
            // eslint-disable-next-line react/jsx-no-bind
            format={(value) => value === '' ? null : value}
          />
          <Field
            fullWidth
            component={TextField}
            name='website'
            floatingLabelText='Website'
          />
        </div>
        <Field
          fullWidth
          component={TextField}
          name='description'
          hintText='Write a few words about yourself'
          multiLine
          rows={2}
        />
      </div>
    )
  }

  render () {
    const { generalProfile, clientType } = this.props
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
          <h3>Organisation Type</h3>
          <div className={css.twoColumn}>
            <Field
              fullWidth
              component={SelectField}
              name='clientType'
              hintText='Organisation Type'
            >
              {CLIENT_TYPES_LIST.map(type => (
                <MenuItem key={uniqid()} value={type} primaryText={type.label} />
              ))}
            </Field>
            <div />
          </div>
        </div>
        { clientType === CLIENT_TYPES.ENTREPRENEUR ? this.renderInfo() : null }
        { clientType === CLIENT_TYPES.ORGANISATION ? this.renderOrganisationInfo() : null }
        <div className={css.block}>
          <h3>Currency</h3>
          <p>Selected currencies will be used for transactions. Need an advice? <Link className={css.link} href='/recommendations'>View our Recommendations</Link></p>
          <Field
            component={ValidatedCheckbox}
            name='currencyLhus'
            label='LHUS'
          />
          <Field
            component={ValidatedCheckbox}
            name='currencyBitcoin'
            label='Bitcoin'
          />
          <Field
            component={ValidatedCheckbox}
            name='currencyAnother'
            label='Another Currency'
          />
        </div>
        <Collapsible classParentString={css.upgradeBlock} trigger={this.renderUpgardeTitle()} >
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
      </div>
    )
  }
}
