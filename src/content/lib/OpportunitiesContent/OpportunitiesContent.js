import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { SignerModel, TagCategoryModel, TAG_CATEGORIES_LIST, FILTERS_LIST } from 'src/models'
import { reduxForm, Field, getFormValues } from 'redux-form'

import { signerSelector, opportunitiesFilteredListSelector } from 'src/store'
import { Translate, OpportunityCard, Input, Image, Checkbox, Icon, Select, RadioIcon } from 'src/components/common'
import css from './OpportunitiesContent.scss'

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
        <Field
          key={tag.name}
          component={Checkbox}
          className={css.field}
          name={`categories[index-${String(tag.index)}]`}
          label={tag.name.toString()}
          material
          defaultTheme={false}
        />
      )
    })
  }

  renderFilter () {
    const selectThemeStyle = {
      width: '180px',
      marginLeft: '-5px',
    }
    const labelSelectFilter = {
      color: 'white',
    }

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
            component={Select}
            className={css.fieldSelect}
            name='sort_by'
            type='select'
            label=''
            autoWidth
            floatingLabelText='Sorting by ..'
            floatingLabelStyle={{ color: '#7F7F7F' }}
            profileTheme={{ style: selectThemeStyle, labelStyle: labelSelectFilter }}
            placeholder=''
            values={FILTERS_LIST.map(item => ({ value: item.index.toString(), name: item.name }))}
          />

          <div className={css.hr} />

          <Field
            key='reverse_order'
            component={Checkbox}
            className={css.field}
            name='reverse_order'
            label='Reverse order'
            defaultTheme={false}
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
            component={Select}
            className={css.fieldSelect}
            name='location_country'
            type='select'
            autoWidth
            profileTheme={{ style: selectThemeStyle, labelStyle: labelSelectFilter }}
            floatingLabelText='Select country'
            floatingLabelStyle={{ color: '#7F7F7F' }}
            values={[
              { value: 'Russia', name: 'Russia' },
            ]}
          />

          <Field
            component={Select}
            className={css.fieldSelect}
            name='location_city'
            type='select'
            autoWidth
            floatingLabelText='Select city'
            floatingLabelStyle={{ color: '#7F7F7F' }}
            profileTheme={{ style: selectThemeStyle, labelStyle: labelSelectFilter }}
            values={[
              { value: 'Moscow', name: 'Moscow' },
            ]}
          />

          <div className={css.hr} />

          <label className={css.filterLabel}>Recruiting Services</label>

          <Field
            key='recruting_services'
            component={Checkbox}
            className={css.field}
            name='recruting_services'
            label='Has services'
            material
            defaultTheme={false}
          />

          <Field
            key='from_lhus'
            materialTheme={Input.MATERIAL_THEME.FILTER}
            component={Input}
            name='from_lhus'
            placeholder='From LHUS'
            materialInput
            defaultTheme={false}
          />

          <Field
            key='to_lhus'
            component={Input}
            materialTheme={Input.MATERIAL_THEME.FILTER}
            name='to_lhus'
            placeholder='To LHUS'
            materialInput
            defaultTheme={false}
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
                  <Image
                    icon={Image.ICONS.SEARCH}
                    color={Image.COLORS.BLACK}
                  />
                  <Field
                    component={Input}
                    className={css.search}
                    name={SEARCH_INPUT_NAME}
                    placeholder='Search by keyword'
                    materialInput
                    defaultTheme={false}
                  />
                </div>
                <div className={css.filterRow} onClick={this.handleToggleFilter}>
                  <p> {this.renderSelectedCityAndCategories()}</p>
                  <Image
                    icon={Image.ICONS.FILTER}
                    color={Image.COLORS.BLACK}
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
