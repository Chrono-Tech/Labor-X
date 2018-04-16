import React from 'react'
import css from './Select.scss'

export default class Select extends React.Component {
  render () {
    return (
      <div className={css.root}>
        <select className={css.select}>
          <option value='1'>1</option>
          <option value='1'>1</option>
          <option value='1'>1</option>
        </select>
      </div>
    )
  }
}
