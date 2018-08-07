import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import TextField from 'redux-form-material-ui-next/lib/TextField'
import SelectField from 'redux-form-material-ui-next/lib/Select'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

import CurrencyModel from 'src/api/backend/model/CurrencyModel'
import ServiceCategoryModel from 'src/api/backend/model/ServiceCategoryModel'
import { ValidatedCheckbox, Link } from 'src/components/common'
import { ProfileModel, CLIENT_TYPES_LIST, ClientTypeModel, CLIENT_TYPE_ORGANISATION, CLIENT_TYPE_ENTREPRENEUR } from 'src/models'
import DatePickerField from 'src/components/DatePickerField'
import { getType, getCurrencies } from 'src/store/client-profile'
import css from './GeneralTab.scss'

export class GeneralTab extends React.Component {
  static propTypes = {
    generalProfile: PropTypes.instanceOf(ProfileModel),
    type: PropTypes.instanceOf(ClientTypeModel),
    validationState: PropTypes.string,
    validationComment: PropTypes.string,
    organizationType: PropTypes.string,
    currencies: PropTypes.arrayOf(PropTypes.instanceOf(CurrencyModel)),
    serviceCategories: PropTypes.arrayOf(PropTypes.instanceOf(ServiceCategoryModel)),
    onAddSpecialization: PropTypes.func,
    onRemoveSpecialization: PropTypes.func,
    selectedSpecializations: PropTypes.arrayOf(PropTypes.instanceOf(ServiceCategoryModel)),
    avatarUrl: PropTypes.string,
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

  render () {
    return (
      <div className={css.content}>
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
        {this.props.type === CLIENT_TYPE_ORGANISATION.name ? this.renderOrganisationInfo() : null}
        {this.props.type === CLIENT_TYPE_ENTREPRENEUR.name ? this.renderInfo() : null}
        <div className={css.block}>
          <h3>Currency</h3>
          <p>Selected currencies will be used for transactions. Need an advice? <Link className={css.link} href='/recommendations'>View our Recommendations</Link></p>
          <div className={css.checkboxColumn}>
            { this.props.currencies.map(({ title, symbol }) => (<FormControlLabel
              key={symbol}
              control={<Field color='primary' component={ValidatedCheckbox} name={`custom.currencies.${symbol}`} />}
              label={title}
            />)) }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  type: getType(state),
  currencies: getCurrencies(state),
})

export default connect(mapStateToProps)(GeneralTab)
