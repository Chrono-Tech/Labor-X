import {reduxForm, Field} from 'redux-form'

import React from 'react'

import { Translate, Input } from 'components/common'
import css from './JobBoards.scss'

const FORM_JOB_BOARDS = 'form/jobBoards'


class JobBoards extends React.Component {
  render () {
    return (
      <div className={css.main}>
        <div className={css.contentWrapper}>
          <h2>Job Boards</h2>
          
          
          <form name={FORM_JOB_BOARDS} className={css.actionsBlock}>
            <div className={css.search}>
              <Field
                component={Input}
                className={css.passwordField}
                inputMods={css.passwordFieldInput}
                labelMods={css.passwordFieldLabel}
                name='search'
                type='password'
                placeholder='Search by keyword'
                label='Search by keyword'
                materialInput={true}
                
              />
            </div>
            <div className={css.filter}></div>
          </form>
        </div>
      </div>
    )
  }
}

export default reduxForm({ form: FORM_JOB_BOARDS })(JobBoards)
