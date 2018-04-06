import { Translate } from 'components/common'
import PropTypes from 'prop-types'
import React from 'react'
import css from './Badge.scss'

export default class Badge extends React.PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }
  render () {
    return (
      <div className={css.root}>
        <div className={css.badge}><Translate value={this.props.value} /></div>
        <div className={css.title}><Translate value={this.props.title} /></div>
      </div>
    )
  }
}
