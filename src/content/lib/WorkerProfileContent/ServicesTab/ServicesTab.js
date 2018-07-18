import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Field, FieldArray } from 'redux-form'
import { SelectField, TextField } from 'redux-form-material-ui'
import { MenuItem } from 'material-ui'
import { ValidatedCheckbox, Link, Icon } from 'src/components/common'
import CurrencyModel from '../../../../api/backend/model/CurrencyModel'
import ServiceCategoryModel from '../../../../api/backend/model/ServiceCategoryModel'
import css from './ServicesTab.scss'

const floatStyle = {
  visibility: 'hidden',
}

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
              value={service.category}
            >
              {
                serviceCategories.map((item) => (
                  <MenuItem key={item.code} value={item.code} primaryText={item.name} />
                ))
              }
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
              <MenuItem value='0' primaryText='Specific fee 1' />
              <MenuItem value='1' primaryText='Specific fee 2' />
            </Field>
            <div className={css.twoColumn}>
              <Field
                fullWidth
                component={TextField}
                name={`${service}.minFee`}
                hintText='Min fee, LHUS'
                floatingLabelStyle={floatStyle}
                floatingLabelText='empty'
                floatingLabelFixed
              />
            </div>
          </div>
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
      </div>
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
        <div className=''>
          <div className={css.block}>
            <h3>Hourly Charge</h3>
            <Field
              fullWidth
              component={TextField}
              name='regular.hourlyCharge'
              hintText='LHUS 1'
              floatingLabelStyle={floatStyle}
              floatingLabelText='empty'
              floatingLabelFixed
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
