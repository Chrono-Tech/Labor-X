import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Field, FieldArray } from 'redux-form'
import TextField from 'redux-form-material-ui-next/lib/TextField'
import SelectField from 'redux-form-material-ui-next/lib/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import { ValidatedCheckbox, Link, Icon } from 'src/components/common'
import CurrencyModel from '../../../../api/backend/model/CurrencyModel'
import ServiceCategoryModel from '../../../../api/backend/model/ServiceCategoryModel'
import css from './ServicesTab.scss'

export default class ServicesTab extends React.Component {
  static propTypes = {
    onRemoveService: PropTypes.func,
    serviceCategories: PropTypes.arrayOf(PropTypes.instanceOf(ServiceCategoryModel)),
    currencies: PropTypes.arrayOf(PropTypes.instanceOf(CurrencyModel)),
  }

  handleClickClose = () => {
    // eslint-disable-next-line no-console
    console.log('---WorkerProfileContent-ServicesTab handleClickClose')
  }

  handleRemoveService = (index) => {
    this.props.onRemoveService(index)
  }

  renderServices = ({ fields }) => {
    return (
      <div>
        {fields.map((service, index) => this.renderServiceCard({ service, index }))}
      </div>
    )
  }

  renderAttachmentsByServiceIndex = () => {
    return []
  }

  renderServiceCard = ({ service, index }) => {

    const { serviceCategories } = this.props
    return (
      <div key={index} className={css.serviceBlock}>
        <div className={css.serviceBlockContent}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Field
                fullWidth
                component={TextField}
                name={`${service}.name`}
                label='Service Name'
              />
            </Grid>
          </Grid>

          <Grid container spacing={24}>
            <Grid item xs={6}>
              <FormControl className={css.field}>
                <InputLabel>Category</InputLabel>
                <Field
                  component={SelectField}
                  name={`${service}.category`}
                  placeholder='Categoty'
                  label='Category'
                  value={service.category}
                >
                  {
                    serviceCategories.map((item) => (
                      <MenuItem key={item.code} value={item.code}> {item.name} </MenuItem>
                    ))
                  }
                </Field>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={24}>
            <Grid item xs={6}>
              <FormControl className={css.field}>
                <InputLabel>Fee</InputLabel>
                <Field
                  component={SelectField}
                  name={`${service}.fee`}
                  label='Fee'
                >
                  <MenuItem value='0'> Specific fee 1 </MenuItem>
                  <MenuItem value='1'> Specific fee 2 </MenuItem>
                </Field>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Field
                fullWidth
                component={TextField}
                name={`${service}.minFee`}
                label='Min fee, LHUS'
              />
            </Grid>
          </Grid>
        </div>
        <div className={css.documentEntry}>
          <label className={css.fileLoaderBlock}>
            <input type='file' style={{ display: 'none' }} multiple={false} />
            <Icon
              icon={Icon.ICONS.UPLOAD}
              color={Icon.COLORS.BLUE}
              size={28}
            />
            <p>Upload service agreement</p>
          </label>
        </div>
        <div className={css.removeBlock} onClick={() => this.handleRemoveService(index)}>
          <Icon
            icon={Icon.ICONS.DELETE}
            color={Icon.COLORS.GREY30}
            size={28}
          />
        </div>
      </div >
    )
  }

  render () {
    const { currencies } = this.props
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
        <div>
          <div className={css.block}>
            <h3>Hourly Charge</h3>
            <Field
              fullWidth
              component={TextField}
              name='regular.hourlyCharge'
              label='LHUS 1'
            />
            <Link className={cn(css.link, css.linkRates)} href='/rates'>View Rates</Link>
          </div>
        </div>
        <div className={css.block}>
          <h3>Accepting Currencies</h3>
          <p>Selected currencies will be used for transactions. Need an advice? <Link className={css.link} href='/recommendations'>View our Recommendations</Link></p>
          {
            currencies.map(({ title, symbol }) => {
              return (<Field
                key={symbol}
                component={ValidatedCheckbox}
                name={`regular.currenciesKeys.${symbol}`}
                label={title}
              />)
            })
          }
        </div>
      </div>
    )
  }
}
