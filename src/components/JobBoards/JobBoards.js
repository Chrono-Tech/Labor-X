import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field, change, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'

import { Input, Icon, Checkbox, Radio } from 'components/common'
import JobBoardItem from './JobBoardItem/JobBoardItem'
import { boardsFilteredListSelector, updateFilterBoards } from 'src/store'
import { BoardModel, TAG_CATEGORIES_LIST } from 'src/models'

import css from './JobBoards.scss'

const FORM_JOB_BOARDS = 'form/jobBoards'
const FILTER_CATEGORIES_NAME = 'categories'
const formSelector = formValueSelector(FORM_JOB_BOARDS)

const searchStyles = {
  style: {
    width: '100%',
  },
  inputStyle: {
    fontSize: 14,
    color: '#333',
    marginLeft: 36 ,
  },
  underlineStyle: {
    borderColor: '#E5E5E5',
    bottom: 0,
    height: 1,
  },
  underlineFocusStyle: {
    borderColor: '#00A0D2',
    borderWidth: 1,
  },
}

const onSubmit = (values, dispatch) => {
  dispatch(updateFilterBoards(values))
}

class JobBoards extends React.Component {
  static propTypes = {
    boardsList: PropTypes.arrayOf(BoardModel),
  }

  constructor(){
    super()

    this.state = {
      isVisibleFilterBlock: false,
    }
  }

  showAllCategories() {
    const { change } = this.props

    TAG_CATEGORIES_LIST.forEach((item) => {
      change(`${FILTER_CATEGORIES_NAME}[${String(item.name).toUpperCase()}]`, false)
    })

    change('categories_reset', true)
  }

  onCategoryChecked(){
    const { change } = this.props

    change('categories_reset', false)
  }

  renderCategories(){
    // const { } = this.props
    return TAG_CATEGORIES_LIST.map((tag, i) => {
      return (
        <Field
          key={i}
          component={Checkbox}
          className={css.field}
          name={`${FILTER_CATEGORIES_NAME}[${String(tag.name).toUpperCase()}]`}
          label={tag.name}
          onCheck={this.onCategoryChecked.bind(this)}
          material
          defaultTheme={false}
        />
      )
    })
  }

  renderActiveCategories(){
    const {activeCategoriesFilter} = this.props

    return TAG_CATEGORIES_LIST
      .filter((tag) => activeCategoriesFilter && activeCategoriesFilter[String(tag.name).toUpperCase()] )
      .map((tag) => tag.name)
      .join(', ') || ''
  }

  toggleFilterBlock(){
    this.setState({ isVisibleFilterBlock: !this.state.isVisibleFilterBlock })
  }

  resetFilters(){
    const { change } = this.props

    change('level', 'any')
    change('rating', 'any')
    change('searchText', '')
    this.showAllCategories()
  }

  isHideResetBlock(){
    const { ratingFilter, levelFilter, activeCategoriesFilter, categoriesResetFilter } = this.props

    const emptyRatingFilter = ratingFilter === 'any' || ratingFilter === undefined
    const emptyLevelFilter = levelFilter === 'any' || levelFilter === undefined
    const emptyCategoriesResetFilter = categoriesResetFilter === true || categoriesResetFilter === undefined

    return emptyRatingFilter && emptyLevelFilter && emptyCategoriesResetFilter

  }

  renderFilterBlock(){
    return (
      <div className={css.filterBlock}>
        {
          this.isHideResetBlock() ? null : (
            <div className={css.resetRow}>
              <b>Reset</b>
              <button onClick={this.resetFilters.bind(this)} className={css.resetButton}>
                <Icon size={24} icon={Icon.ICONS.CLOSE} />
              </button>
            </div>
          )
        }


        <div className={css.filterContent}>
          <label className={css.filterLabel}>Categories</label>
          <Field
            component={Checkbox}
            className={css.field}
            name='categories_reset'
            label='Show all'
            type='checkbox'
            onCheck={this.showAllCategories.bind(this)}
            material
            defaultTheme={false}
          />

          { this.renderCategories() }

          <div className={css.hr}></div>

          <label className={css.filterLabel}>Rating</label>

          <Field
            component={Radio}
            radioButtonClassName={css.field}
            name='rating'
            label='Rating'
            values={[
              { value: 'any', label: 'Any rating' },
              { value: '2', label: '2+' },
              { value: '3', label: '3+' },
              { value: '4', label: '4+' },
              { value: '5', label: '5' },
            ]}
            material
          />

          <div className={css.hr}></div>

          <label className={css.filterLabel}>Validation level</label>

          <Field
            component={Radio}
            name='level'
            label='Level'
            radioButtonClassName={css.field}
            values={[
              { value: 'any', label: 'Any' },
              { value: '2', label: '2+' },
              { value: '3', label: '3+' },
              { value: '4', label: '4+' },
            ]}
            material
          />
        </div>
      </div>

    )
  }

  render () {
    const { boardsList, onSubmit, handleSubmit, activeCategoriesFilter } = this.props


    return (
      <div className={css.main}>
        <div className={this.state.isVisibleFilterBlock ? css.contentWrapperFilterOpened : css.contentWrapper}>
          <h2>Job Boards</h2>

          <form className={css.flexRow} name={FORM_JOB_BOARDS} onSubmit={handleSubmit(onSubmit)}>
            <div className={css.contentBlock}>
              <div className={css.actionsBlock}>
                <div className={css.search}>
                  <Field
                    component={Input}
                    name='searchText'
                    type='text'
                    placeholder='Search by keyword'
                    materialInputStyles={searchStyles}
                    className={css.searchField}
                    materialInput
                    materialTheme={Input.MATERIAL_THEME.DEFAULT}
                  />
                </div>
                <div className={css.filter}>
                  <div onClick={this.toggleFilterBlock.bind(this)} className={css.filterButton}>
                    { this.renderActiveCategories() }
                  </div>
                </div>
              </div>

              <div className={css.jobBoardsList}>
                {
                  boardsList && boardsList.map((board, i) => (
                    <JobBoardItem key={i} jobBoard={board} />
                  ))
                }
              </div>
            </div>

            {
              this.state.isVisibleFilterBlock ? this.renderFilterBlock() : null
            }

          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const boardsList = boardsFilteredListSelector()(state)
  return {
    boardsList,
    activeCategoriesFilter: formSelector(state, FILTER_CATEGORIES_NAME),
    ratingFilter: formSelector(state, 'rating'),
    levelFilter: formSelector(state, 'level'),
    categoriesResetFilter: formSelector(state, 'categories_reset'),
  }
}

function mapDispatchToProps (/*dispatch*/) {
  return {
    // stack: state.modals.stack,
  }
}

const form = reduxForm({
  form: FORM_JOB_BOARDS,
  fields: ['level', 'rating', 'categories', 'searchText'],
  onChange: (values, dispatch) => {
    dispatch(updateFilterBoards(values))
  },
  onSubmit,
})(JobBoards)

export default connect(mapStateToProps, mapDispatchToProps)(form)
