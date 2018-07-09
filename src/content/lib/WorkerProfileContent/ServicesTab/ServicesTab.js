import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Field, FieldArray } from 'redux-form'
import TextField from 'redux-form-material-ui/lib/TextField'
import Select from 'redux-form-material-ui/lib/Select'
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
        { fields.map(service => this.renderServiceCard(service)) }
      </div>
    )
  }

  renderServiceCard = (service) => {
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
              displayEmpty
              component={Select}
              name={`${service}.category`}
            >
              <MenuItem value='' disabled>Category</MenuItem>
              <MenuItem value={0}>Category 1</MenuItem>
              <MenuItem value={1}>Category 2</MenuItem>
              <MenuItem value={2}>Category 3</MenuItem>
            </Field>
            <div />
          </div>
          <div className={css.twoColumn}>
            <Field
              displayEmpty
              component={Select}
              name={`${service}.fee`}
            >
              <MenuItem value='' disabled>Fee</MenuItem>
              <MenuItem value={0}>Specific fee</MenuItem>
              <MenuItem value={1}>Specific fee</MenuItem>
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
          <Icon
            icon={Icon.ICONS.UPLOAD}
            color={Icon.COLORS.BLUE}
            size={28}
          />
          <p>Upload service agreement</p>
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

  render () {
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
