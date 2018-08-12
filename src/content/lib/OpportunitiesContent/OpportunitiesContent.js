import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, Field, getFormValues } from 'redux-form'
import { Checkbox, TextField, Select } from 'redux-form-material-ui-next'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'

import { signerSelector, opportunitiesFilteredListSelector } from 'src/store'
import { SignerModel, TagCategoryModel, TAG_CATEGORIES_LIST, FILTERS_LIST } from 'src/models'
import { Translate, OpportunityCard, Icon, RadioIcon } from 'src/components/common'

import css from './OpportunitiesContent.scss'

const FILTER_CHECKBOX_CLASSES = {
  root: css.filterBlockCheckbox,
}

const FORM_SEARCH_OPPORTUNITIES = 'form/opportunities'
export const SEARCH_INPUT_NAME = 'OpportunitiesSearchInput'

export class OpportunitiesContent extends React.Component {
  static propTypes = {
    signer: PropTypes.instanceOf(SignerModel),
    cards: PropTypes.arrayOf(PropTypes.shape(OpportunityCard.propTypes)),
    reset: PropTypes.func,
    formValues: PropTypes.shape({}),
  }

  constructor (props) {
    super(props)

    this.state = {
      isVisibleFilter: true,
    }
  }

  handleResetFilters = () => {
    this.props.reset()
  }

  handleToggleFilter = () => {
    this.setState({ isVisibleFilter: !this.state.isVisibleFilter })
  }

  getCategoryNames = (formValues) => {
    if (formValues && formValues.categories) {
      const { categories } = formValues
      const keys = Object.getOwnPropertyNames(categories).filter(key => categories[key])
      const indexes = keys.map((key) => key.split("-")[1])
      const names = indexes.map(index => {
        return TagCategoryModel.valueOf(Number(index)).name
      })
      return names
    }
    else {
      return []
    }
  }

  renderCategories () {
    return TAG_CATEGORIES_LIST.map((tag) => {
      return (
        <FormControlLabel
          key={tag.name}
          classes={{ label: css.filterCheckboxlabel }}
          control={<Field classes={FILTER_CHECKBOX_CLASSES} component={Checkbox} name={`categories[index-${String(tag.index)}]`} />}
          label={tag.name.toString()}
        />
      )
    })
  }

  renderFilter () {
    return (
      <div className={[css.filterBlock, (this.state.isVisibleFilter ? "" : css.hideFilterBlock)].join(' ')}>

        <div className={css.resetRow}>
          <div onClick={this.handleResetFilters} className={css.resetButton}>
            Reset
          </div>
          <div onClick={this.handleToggleFilter} className={css.resetButton}>
            <Icon size={24} icon={Icon.ICONS.CLOSE} />
          </div>
        </div>

        <div className={css.filterContent}>

          <Field
            className={css.fieldSelect}
            displayEmpty
            disableUnderline
            name='sort_by'
            component={Select}
          >
            <MenuItem value='' disabled>Sorting by ..</MenuItem>
            {
              FILTERS_LIST.map((item) => (
                <MenuItem key={item.index.toString()} value={item.index.toString()}>{item.name}</MenuItem>
              ))
            }
          </Field>

          <div className={css.hr} />

          <FormControlLabel
            classes={{ label: css.filterCheckboxlabel }}
            control={<Field classes={FILTER_CHECKBOX_CLASSES} component={Checkbox} name='reverse_order' />}
            label='Reverse order'
          />

          <div className={css.hr} />

          <label className={css.filterLabel}>Categories</label>

          { this.renderCategories() }

          <div className={css.hr} />

          <label className={css.filterLabel}>Rating</label>

          <Field
            component={RadioIcon}
            radioButtonClassName={css.field}
            name='rating'
            label='Rating'
            checkedIcon={(
              <div className={[css.iconWrapper, css.checkedIconWrapper].join(' ')}>
                <Icon className={css.checkedIcon} size={40} icon={Icon.ICONS.RATING} color={Icon.COLORS.GOLD} />
              </div>
            )}
            uncheckedIcon={(
              <div className={[css.iconWrapper, css.checkedIconWrapper].join(' ')}>
                <Icon className={css.checkedIcon} size={40} icon={Icon.ICONS.RATING} color={Icon.COLORS.GREY30} />
              </div>
            )}
            values={[
              { value: 1 },
              { value: 2 },
              { value: 3 },
              { value: 4 },
              { value: 5 },
            ]}
            material
          />

          <div className={css.hr} />

          <label className={css.filterLabel}>Validation level</label>

          <Field
            component={RadioIcon}
            name='level'
            label='Level'
            radioButtonClassName={css.field}
            checkedIcon={(
              <div className={[css.iconWrapper, css.checkedIconWrapper].join(' ')}>
                <Icon className={css.checkedIcon} size={40} icon={Icon.ICONS.SECURITY} color={Icon.COLORS.GREEN} />
              </div>
            )}
            uncheckedIcon={(
              <div className={[css.iconWrapper, css.checkedIconWrapper].join(' ')}>
                <Icon className={css.checkedIcon} size={40} icon={Icon.ICONS.SECURITY} color={Icon.COLORS.GREY30} />
              </div>
            )}
            values={[
              { value: 1 },
              { value: 2 },
              { value: 3 },
              { value: 4 },
              { value: 5 },
            ]}
            material
          />

          <div className={css.hr} />

          <label className={css.filterLabel}>Location</label>

          <Field
            className={css.fieldSelect}
            displayEmpty
            disableUnderline
            name='location_country'
            component={Select}
          >
            <MenuItem value='' disabled>Select country</MenuItem>
            <MenuItem value={0}>Russia</MenuItem>
          </Field>

          <Field
            className={css.fieldSelect}
            displayEmpty
            disableUnderline
            name='location_city'
            component={Select}
          >
            <MenuItem value='' disabled>Select city</MenuItem>
            <MenuItem value={0}>Moscow</MenuItem>
          </Field>

          <div className={css.hr} />

          <label className={css.filterLabel}>Recruiting Services</label>

          <FormControlLabel
            key='recruting_services'
            classes={{ label: css.filterCheckboxlabel }}
            control={<Field classes={FILTER_CHECKBOX_CLASSES} component={Checkbox} name='recruting_services' />}
            label='Has services'
          />

          <Field
            className={css.filterField}
            component={TextField}
            name='from_lht'
            placeholder='From LHT'
            InputProps={{ disableUnderline: true, classes: { input: css.fieldInput } }}
          />

          <Field
            className={css.filterField}
            component={TextField}
            name='to_lht'
            placeholder='To LHT'
            InputProps={{ disableUnderline: true, classes: { input: css.fieldInput } }}
          />
        </div>
      </div>

    )
  }

  renderEmptyListMessage () {
    return (
      <div className={css.emptyListMessage}>
        Opportunities list is empty
      </div>
    )
  }

  renderSelectedCityAndCategories = () => {
    const { formValues } = this.props
    if (formValues) {
      let selectedCategories = this.getCategoryNames(formValues).join(", ")
      let city = formValues.location_city
      if (selectedCategories !== "" && city!=="")
      {city = city + ", "}
      return (city && city) + (selectedCategories && selectedCategories)
    }
    else return ""
  }

  render () {
    const { cards } = this.props
    return !cards ? null : (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.opportunities' /></div>
        </div>
        <div className={css.content}>
          <form className={css.flexRow} name={FORM_SEARCH_OPPORTUNITIES}>
            <div className={css.contentContainer}>
              <div className={css.filterRow}>
                <div className={css.searchRow}>
                  <Field
                    className={css.searchInput}
                    name={SEARCH_INPUT_NAME}
                    component={TextField}
                    placeholder='Search by keyword'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Icon size={24} icon={Icon.ICONS.SEARCH} color={Icon.COLORS.BLACK} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className={css.filterRow} onClick={this.handleToggleFilter}>
                  <p> {this.renderSelectedCityAndCategories()}</p>
                  <Icon
                    size={24}
                    icon={Icon.ICONS.FILTER}
                    color={Icon.COLORS.GREY50}
                  />
                </div>
              </div>
              <div className={css.opportunities}>
                {cards && cards.map((card) => (<OpportunityCard {...card} key={card.job.key} />))}
                {cards && !cards.length && this.renderEmptyListMessage()}
              </div>
            </div>
            {this.renderFilter()}
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const signer = signerSelector()(state)
  const formValues = getFormValues(FORM_SEARCH_OPPORTUNITIES)(state)
  const cards = opportunitiesFilteredListSelector(formValues)(state)

  const defaultCategoriesValues = {}
  TAG_CATEGORIES_LIST.map((tag) => {
    defaultCategoriesValues[tag.name] = false
  })

  return {
    signer,
    cards,
    formValues,
    initialValues: {
      reverse_order: false,
      recruting_services: true,
      sort_by: '',
      location_city: '',
      location_town: '',
      level: 0,
      rating: 0,
    },
  }
}

function mapDispatchToProps () {
  return {}
}

const form = reduxForm({
  form: FORM_SEARCH_OPPORTUNITIES,
  fields: [SEARCH_INPUT_NAME],
})(OpportunitiesContent)

export default connect(mapStateToProps, mapDispatchToProps)(form)

// [
//  {
//    icon: '/static/temp/get-started.png',
//    jobName: 'Install 10 Gas Ovens',
//    title: 'Get Started at Become Involved',
//    payTotal: 80,
//    payHour: 2,
//  },
// ]
