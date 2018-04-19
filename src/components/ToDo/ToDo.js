import { Translate } from 'components/common'
import React from 'react'
import css from './ToDo.scss'

export default class ToDo extends React.Component {
  render () {
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.toDo' /></div>
        </div>
        <div className={css.content}>
          <div>ToDo page content</div>
        </div>
      </div>
    )
  }
}
