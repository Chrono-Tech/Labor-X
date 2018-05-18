import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import { Input, Icon, Checkbox } from 'components/common'
import JobBoardItem from './JobBoardItem/JobBoardItem'
import { boardsListSelector } from 'src/store'
import { BoardModel } from 'src/models'

import css from './JobBoards.scss'

const inputStyles = {
  inputStyle: {
    padding: '10px 0',
    textAlign: 'left',
    color: '#333',
    fontWeight: 300,
    fontSize: 14,
    marginBottom: 4,
    marginTop: 0,
  },
  underlineStyle: {
    borderColor: '#E5E5E5',
    height: 1,
    bottom: 0,
  },
  underlineFocusStyle: {
    borderColor: '#00A0D2',
    height: 1,
  },
  floatingLabelStyle: {
    fontSize: 14,
    color: '#333',
    left: 0,
    right: 0,
    top: 7,
    transformOrigin: 'left top',
  },
  floatingLabelFocusStyle: {
    fontSize: 14,
    color: '#333',
    left: 0,
    right: 0,
    transformOrigin: 'left top',
  },
}

const FORM_JOB_BOARDS = 'form/jobBoards'

class JobBoards extends React.Component {
  static propTypes = {
    boardsList: PropTypes.arrayOf(BoardModel),
  }

  render () {
    const { boardsList } = this.props

    console.log('JobBoards', this.props)

    return (
      <div className={css.main}>
        <div className={css.contentWrapper}>
          <h2>Job Boards</h2>

          <form className={css.flexRow} name={FORM_JOB_BOARDS}>
            <div className={css.contentBlock}>
              <div className={css.actionsBlock}>
                <div className={css.search}>
                  <Field
                    component={Input}
                    name='search'
                    type='password'
                    placeholder='Search by keyword'
                    label='Search by keyword'
                    materialInput
                    materialTheme={Input.MATERIAL_THEME.DEFAULT}
                  />
                </div>
                <div className={css.filter}>
                  <button className={css.filterButton}>
                    Sydney, Building, Industrial
                    <img src='/static/images/svg/filter.svg' alt='' width='24' height='24' />
                  </button>
                </div>
              </div>

              <div className={css.jobBoardsList}>
                {
                  boardsList.map((board, i) => (
                    <JobBoardItem key={i} jobBoard={board} />
                  ))
                }
              </div>
            </div>

            <div className={css.filterBlock}>
              <div className={css.resetRow}>
                <b>Reset</b>
                <button className={css.resetButton}>
                  <Icon size={24} icon={Icon.ICONS.CLOSE} />
                </button>
              </div>

              <div className={css.filterContent}>
                <label className={css.filterLabel}>Categories</label>
                <Field
                  component={Checkbox}
                  name='category'
                  label='Category'
                  type='checkbox'
                  materialCheckbox={true}
                />
              </div>
            </div>

          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const boardsList = boardsListSelector()(state)
  return {
    boardsList,
  }
}

function mapDispatchToProps (/*dispatch*/) {
  return {
    // stack: state.modals.stack,
  }
}

const form = reduxForm({ form: FORM_JOB_BOARDS })(JobBoards)

export default connect(mapStateToProps, mapDispatchToProps)(form)
