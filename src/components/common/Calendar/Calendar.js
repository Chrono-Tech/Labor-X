import { Translate } from 'components/common'
import PropTypes from 'prop-types'
import React from 'react'
import css from './Calendar.scss'

export default class Calendar extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  }
  render () {
    return (
      <div className={css.root}>
        {this.props.title && <div className={css.title}><Translate value={this.props.title} /></div>}
        <div className={css.content}>TODO Calendar</div>
      </div>
    )
  }
}
