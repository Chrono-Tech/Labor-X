import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Field, FieldArray } from 'redux-form'
import { SelectField, TextField } from 'redux-form-material-ui'
import { MenuItem } from 'material-ui'
import { ValidatedCheckbox, Link, Icon } from 'src/components/common'
import { WorkerModel } from 'src/models'
import css from './ServicesTab.scss'

const floatStyle = {
  visibility: 'hidden',
}

const checkboxStyle = {
  marginRight: '.2rem',
}

export default class ServicesTab extends React.Component {
  static propTypes = {
    workerProfile: PropTypes.instanceOf(WorkerModel),
    handleUploadServiceAgreement: PropTypes.func
  }

  handleClickRemoveBlock = () => {
    // eslint-disable-next-line no-console
    console.log('---WorkerProfileContent-ServicesTab handleClickRemoveBlock')
  }

  handleClickClose = () => {
    // eslint-disable-next-line no-console
    console.log('---WorkerProfileContent-ServicesTab handleClickClose')
  }

  renderServices = ({ fields }) => {
    return (
      <div>
        {fields.map(service => this.renderServiceCard(service))}
      </div>
    )
  }

  renderServiceCard = (service) => {
    const { handleUploadServiceAgreement } = this.props;
    return (
      <div className={css.serviceBlock} key={service}>
        <div className={css.serviceBlockContent}>
          <Field
            fullWidth
            component={TextField}
            name={`${service}.name`}
            floatingLabelText='Service Name'
          />
          <div className={css.twoColumn}>
            <Field
              fullWidth
              component={SelectField}
              name={`${service}.category`}
              floatingLabelText='Categoty'
            >
              <MenuItem value={0} primaryText='Category 1' />
              <MenuItem value={1} primaryText='Category 2' />
              <MenuItem value={2} primaryText='Category 3' />
            </Field>
            <div />
          </div>
          <div className={css.twoColumn}>
            <Field
              fullWidth
              component={SelectField}
              name={`${service}.fee`}
              floatingLabelText='Fee'
            >
              <MenuItem value={0} primaryText='Specific fee' />
              <MenuItem value={1} primaryText='Specific fee' />
            </Field>
            <div className={css.twoColumn}>
              <Field
                fullWidth
                component={TextField}
                name={`${service}.feeFrom`}
                hintText='Fee from, LHUS'
                floatingLabelStyle={floatStyle}
                floatingLabelText='empty'
                floatingLabelFixed
              />
              <Field
                fullWidth
                component={TextField}
                name={`${service}.feeFromUsd`}
                hintText='$0.00'
                floatingLabelStyle={floatStyle}
                floatingLabelText='empty'
                floatingLabelFixed
              />
            </div>
          </div>
        </div>
        <div className={css.documentEntry}>
          <label className={css.fileLoaderBlock}>
          <input type='file' style={{ display: 'none' }} onChange={handleUploadServiceAgreement} multiple={false} />
            <Icon
              icon={Icon.ICONS.UPLOAD}
              color={Icon.COLORS.BLUE}
              size={28}
            />
            <p>Upload service agreement 2s3</p>
          </label>
        </div>
        <div className={css.removeBlock} onClick={this.handleClickRemoveBlock}>
          <Icon
            icon={Icon.ICONS.DELETE}
            color={Icon.COLORS.GREY30}
            size={28}
          />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={css.content}>
        <div className={css.block}>
          Added services will be displayed on your public profile and will be also suggested on job post.
          <Icon
            className={css.cross}
            onClick={this.handleClickClose}
            icon={Icon.ICONS.CLOSE}
            color={Icon.COLORS.GREY30}
            size={20}
          />
        </div>
        <FieldArray name='services' component={this.renderServices} />
        <div className={css.twoColumn}>
          <div className={css.block}>
            <h3>Hourly Charge</h3>
            <div className={css.twoColumn}>
              <Field
                fullWidth
                component={TextField}
                name='hourlyCharge'
                hintText='LHUS 1'
                floatingLabelStyle={floatStyle}
                floatingLabelText='empty'
                floatingLabelFixed
              />
              <Field
                fullWidth
                component={TextField}
                name='hourlyChargeUsd'
                hintText='$0.00'
                floatingLabelStyle={floatStyle}
                floatingLabelText='empty'
                floatingLabelFixed
              />
            </div>
            <Link className={cn(css.link, css.linkRates)} href='/rates'>View Rates</Link>
          </div>
          <div className={css.block}>
            <h3>Schedule</h3>
            <div className={css.scheduleRow}>
              <Field
                component={ValidatedCheckbox}
                name='scheduleSun'
                label='Sun'
                iconStyle={checkboxStyle}
              />
              <Field
                component={ValidatedCheckbox}
                name='scheduleMon'
                label='Mon'
                iconStyle={checkboxStyle}
              />
              <Field
                component={ValidatedCheckbox}
                name='scheduleTue'
                label='Tue'
                iconStyle={checkboxStyle}
              />
              <Field
                component={ValidatedCheckbox}
                name='scheduleWed'
                label='Wed'
                iconStyle={checkboxStyle}
              />
            </div>
            <div className={css.scheduleRow}>
              <Field
                component={ValidatedCheckbox}
                name='scheduleThu'
                label='Thu'
                iconStyle={checkboxStyle}
              />
              <Field
                component={ValidatedCheckbox}
                name='scheduleFri'
                label='Fri'
                iconStyle={checkboxStyle}
              />
              <Field
                component={ValidatedCheckbox}
                name='scheduleSat'
                label='Sat'
                iconStyle={checkboxStyle}
              />
            </div>
          </div>
        </div>
        <div className={css.block}>
          <h3>Accepting Currencies</h3>
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
      </div>
    )
  }
}
