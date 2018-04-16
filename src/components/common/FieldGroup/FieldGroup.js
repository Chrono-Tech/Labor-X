import { Translate } from 'components/common'
import PropTypes from 'prop-types'
import React from 'react'
import css from './FieldGroup.scss'

export default class FieldGroup extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  render () {
    const { title, children } = this.props

    return (
      <div className={css.root}>
        <div className={css.title}><Translate value={title} /></div>
        <div className={css.content}>{children}</div>
      </div>
    )
  }
}
