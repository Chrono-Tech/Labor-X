import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { Checkbox } from 'redux-form-material-ui-next'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import { boardsFilteredListSelector, updateFilterBoards } from 'src/store'
import { BoardModel, TAG_CATEGORIES_LIST } from 'src/models'
import { Input, Icon, Radio } from 'src/components/common'

import JobBoardItem from './JobBoardItem/JobBoardItem'
import css from './JobBoards.scss'

const FORM_JOB_BOARDS = 'form/jobBoards'
const FILTER_CATEGORIES_NAME = 'categories'
const formSelector = formValueSelector(FORM_JOB_BOARDS)

const FILTER_CHECKBOX_CLASSES = {
  root: css.filterBlockCheckbox,
}

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
    boardsList: PropTypes.arrayOf(
      PropTypes.instanceOf(BoardModel)
    ),
    change: PropTypes.func,
    handleSubmit: PropTypes.func,
    onSubmit: PropTypes.func,
    categoriesResetFilter: PropTypes.string,
    activeCategoriesFilter: PropTypes.string,
    ratingFilter: PropTypes.string,
    levelFilter: PropTypes.string,
  }

  constructor () {
    super()

    this.state = {
      isVisibleFilterBlock: false,
    }
  }

  showAllCategories = () => {
    const { change } = this.props
    TAG_CATEGORIES_LIST.forEach((item) => {
      change(`${FILTER_CATEGORIES_NAME}[${String(item.name).toUpperCase()}]`, false)
    })
    change('categories_reset', true)
  }

  onCategoryChecked = () => {
    const { change } = this.props
    change('categories_reset', false)
  }

  toggleFilterBlock () {
    this.setState({ isVisibleFilterBlock: !this.state.isVisibleFilterBlock })
  }

  resetFilters () {
    const { change } = this.props

    change('level', 'any')
    change('rating', 'any')
    change('searchText', '')
    this.showAllCategories()
  }

  isHideResetBlock () {
    const { ratingFilter, levelFilter, categoriesResetFilter } = this.props

    const emptyRatingFilter = ratingFilter === 'any' || ratingFilter === undefined
    const emptyLevelFilter = levelFilter === 'any' || levelFilter === undefined
    const emptyCategoriesResetFilter = categoriesResetFilter === true || categoriesResetFilter === undefined

    return emptyRatingFilter && emptyLevelFilter && emptyCategoriesResetFilter

  }

  renderActiveCategories () {
    const { activeCategoriesFilter } = this.props

    return TAG_CATEGORIES_LIST
      .filter((tag) => activeCategoriesFilter && activeCategoriesFilter[String(tag.name).toUpperCase()] )
      .map((tag) => tag.name)
      .join(', ') || ''
  }

  renderCategories () {
    // const { } = this.props
    return TAG_CATEGORIES_LIST.map((tag) => {
      return (
        <FormControlLabel
          key={tag.name}
          classes={{ label: css.filterCheckboxlabel }}
          control={<Field classes={FILTER_CHECKBOX_CLASSES} onChange={this.onCategoryChecked} component={Checkbox} name={`${FILTER_CATEGORIES_NAME}[${String(tag.name).toUpperCase()}]`} />}
          label={tag.name.toString()}
        />
      )
    })
  }

  renderFilterBlock () {
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
          <FormControlLabel
            classes={{ label: css.filterCheckboxlabel }}
            control={<Field classes={FILTER_CHECKBOX_CLASSES} onChange={this.showAllCategories} component={Checkbox} name='categories_reset' />}
            label='Show all'
          />
          { this.renderCategories() }

          <div className={css.hr} />

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

          <div className={css.hr} />

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

  renderEmptyListMessage (){
    return (
      <div className={css.emptyListMessage}>
        Boards list is empty
      </div>
    )
  }

  render () {
    const { boardsList, onSubmit, handleSubmit } = this.props

    return (
      <div className={css.main}>
        <div className={css.contentWrapper}>
          <h1 className={css.titleText}>Job Boards</h1>

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
                  boardsList && boardsList.map(board => (
                    <JobBoardItem key={board.key} jobBoard={board} />
                  ))
                }
                { boardsList && !boardsList.length && this.renderEmptyListMessage() }
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
    boardsList: boardsList.filter(x => x.isActive),
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
