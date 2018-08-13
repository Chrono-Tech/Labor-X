import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { Checkbox, TextField } from 'redux-form-material-ui-next'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'

import { BoardModel, TAG_CATEGORIES_LIST } from 'src/models'
import { Icon } from 'src/components/common'
import { updateFilterBoards } from 'src/store'
import { boardCardsSelector } from 'src/store/jobBoards/selectors'
import JobBoardItem from './JobBoardItem/JobBoardItem'

import css from './JobBoardsContent.scss'

const FORM_JOB_BOARDS = 'form/jobBoards'
const FILTER_CATEGORIES_NAME = 'categories'
const formSelector = formValueSelector(FORM_JOB_BOARDS)

const FILTER_SWITCH_CLASSES = {
  root: css.filterSwitchBg,
}

const onSubmit = (values, dispatch) => {
  dispatch(updateFilterBoards(values))
}

class JobBoards extends React.Component {
  static propTypes = {
    boardCardsList: PropTypes.arrayOf(PropTypes.instanceOf(BoardModel)),
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
    this.setState({
      isVisibleFilterBlock: !this.state.isVisibleFilterBlock,
    })
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

    return TAG_CATEGORIES_LIST.filter((tag) => activeCategoriesFilter && activeCategoriesFilter[String(tag.name).toUpperCase()]).map((tag) => tag.name).join(', ') || ''
  }

  renderCategories () {
    return TAG_CATEGORIES_LIST.map((tag) => {
      return (
        <FormControlLabel
          key={tag.name}
          classes={{ label: css.filterSwitchlabel }}
          control={(
            <Field
              classes={FILTER_SWITCH_CLASSES}
              onChange={this.onCategoryChecked}
              component={Checkbox}
              name={`${FILTER_CATEGORIES_NAME}[${String(tag.name).toUpperCase()}]`}
            />
          )}
          label={tag.name.toString()}
        />
      )
    })
  }

  renderFilterBlock () {
    return (
      <div className={css.filterBlock}>
        {this.isHideResetBlock()
          ? null
          : (
            <div className={css.resetRow}>
              <b>Reset</b>
              <button
                onClick={this
                  .resetFilters
                  .bind(this)}
                className={css.resetButton}
              >
                <Icon size={24} icon={Icon.ICONS.CLOSE} />
              </button>
            </div>
          )
        }

        <div className={css.filterContent}>
          <label className={css.filterLabel}>Categories</label>
          <FormControlLabel
            classes={{ label: css.filterSwitchlabel }}
            control={<Field classes={FILTER_SWITCH_CLASSES} onChange={this.showAllCategories} component={Checkbox} name='categories_reset' />}
            label='Show all'
          />
          { this.renderCategories() }

          <div className={css.hr} />

          <label className={css.filterLabel}>Rating</label>

          <Field
            component={RadioGroup}
            name='rating'
            classes={{ root: css.field }}
          >
            <FormControlLabel
              classes={{ label: css.filterSwitchlabel }}
              control={<Radio classes={FILTER_SWITCH_CLASSES} value='any' />}
              label='Any rating'
            />
            <FormControlLabel
              classes={{ label: css.filterSwitchlabel }}
              control={<Radio classes={FILTER_SWITCH_CLASSES} value='2' />}
              label='2+'
            />
            <FormControlLabel
              classes={{ label: css.filterSwitchlabel }}
              control={<Radio classes={FILTER_SWITCH_CLASSES} value='3' />}
              label='3+'
            />
            <FormControlLabel
              classes={{ label: css.filterSwitchlabel }}
              control={<Radio classes={FILTER_SWITCH_CLASSES} value='4' />}
              label='4+'
            />
            <FormControlLabel
              classes={{ label: css.filterSwitchlabel }}
              control={<Radio classes={FILTER_SWITCH_CLASSES} value='5' />}
              label='5'
            />
          </Field>

          <div className={css.hr} />

          <label className={css.filterLabel}>Validation level</label>

          <Field
            component={RadioGroup}
            name='level'
            classes={{ root: css.field }}
          >
            <FormControlLabel
              classes={{ label: css.filterSwitchlabel }}
              control={<Radio classes={FILTER_SWITCH_CLASSES} value='any' />}
              label='Any rating'
            />
            <FormControlLabel
              classes={{ label: css.filterSwitchlabel }}
              control={<Radio classes={FILTER_SWITCH_CLASSES} value='2' />}
              label='2+'
            />
            <FormControlLabel
              classes={{ label: css.filterSwitchlabel }}
              control={<Radio classes={FILTER_SWITCH_CLASSES} value='3' />}
              label='3+'
            />
            <FormControlLabel
              classes={{ label: css.filterSwitchlabel }}
              control={<Radio classes={FILTER_SWITCH_CLASSES} value='4' />}
              label='4'
            />
          </Field>

        </div>
      </div>

    )
  }

  renderEmptyListMessage () {
    return (
      <div className={css.emptyListMessage}>
        Boards list is empty
      </div>
    )
  }

  render () {
    const { boardCardsList, onSubmit, handleSubmit } = this.props

    return (
      <div className={css.main}>
        <div className={css.contentWrapper}>
          <h1 className={css.titleText}>Job Boards</h1>

          <form
            className={css.flexRow}
            name={FORM_JOB_BOARDS}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={css.contentBlock}>
              <div className={css.actionsBlock}>
                <div className={css.search}>
                  <Field
                    className={css.searchInput}
                    name='searchText'
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

                <div
                  className={css.currentFilterContainer}
                  onClick={this.toggleFilterBlock.bind(this)}
                >
                  <div className={css.filterText}>{ this.renderActiveCategories() }</div>
                  <Icon size={24} icon={Icon.ICONS.FILTER} color={Icon.COLORS.GREY50} />
                </div>
              </div>

              <div className={css.jobBoardsList}>
                {boardCardsList && boardCardsList.map(card => (<JobBoardItem
                  key={card.board.key}
                  jobBoard={card.board}
                  jobsCount={card.jobsCount}
                  clientsCount={card.clientsCount}
                />))
                }
                {boardCardsList && !boardCardsList.length && this.renderEmptyListMessage()}
              </div>
            </div>

            {
              this.state.isVisibleFilterBlock
                ? this.renderFilterBlock()
                : null
            }

          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const boardCardsList = boardCardsSelector(state)
  return {
    boardCardsList: boardCardsList.filter(x => x.board.isActive),
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
