import {reduxForm, Field} from 'redux-form'

import React from 'react'

import { Translate, Input } from 'components/common'
import css from './JobBoardItem.scss'

const FORM_JOB_BOARDS = 'form/jobBoards'


class JobBoardItem extends React.Component {
  render () {
    return (
      <div className={css.main}>

      </div>
    )
  }
}

export default reduxForm({ form: FORM_JOB_BOARDS })(JobBoardItem)
