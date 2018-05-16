import React from 'react'
import { reduxForm, Field } from 'redux-form'

import { Input } from 'components/common'
import JobBoardItem from './JobBoardItem/JobBoardItem'

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
  render () {
    return (
      <div className={css.main}>
        <div className={css.contentWrapper}>
          <h2>Job Boards</h2>
          
          <form name={FORM_JOB_BOARDS}>
            <div className={css.actionsBlock}>
              <div className={css.search}>
                <Field
                  component={Input}
                  className={css.searchField}
                  input={inputStyles}
                  inputWrapperMods={css.searchFieldWrapper}
                  name='search'
                  type='password'
                  placeholder='Search by keyword'
                  label='Search by keyword'
                  materialInput
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
              <JobBoardItem status={JobBoardItem.STATUS.DEFAULT} />
              <JobBoardItem status={JobBoardItem.STATUS.NEED_VERIFY} />
              <JobBoardItem status={JobBoardItem.STATUS.JOINED} />
              <JobBoardItem status={JobBoardItem.STATUS.APPROVAL} />
            </div>
            
          </form>
        </div>
      </div>
    )
  }
}

export default reduxForm({ form: FORM_JOB_BOARDS })(JobBoards)
