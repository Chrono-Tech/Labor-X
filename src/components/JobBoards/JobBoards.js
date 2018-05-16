import React from 'react'
import { reduxForm, Field } from 'redux-form'
import Popover from 'material-ui/Popover'

import { Translate, Input } from 'components/common'
import JobBoardItem from './JobBoardItem/JobBoardItem'

import css from './JobBoards.scss'

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
                  inputMods={css.searchFieldInput}
                  labelMods={css.searchFieldLabel}
                  inputWrapperMods={css.searchFieldWrapper}
                  name='search'
                  type='password'
                  placeholder='Search by keyword'
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
