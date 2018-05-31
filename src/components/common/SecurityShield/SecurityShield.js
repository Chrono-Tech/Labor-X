import React from 'react'
import PropTypes from 'prop-types'

import { Icon, Tip } from 'components/common'

import css from './SecurityShield.scss'

export default class SecurityShield extends React.Component {
  static propTypes = {
    level: PropTypes.number,
    tip: PropTypes.shape({
      title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
      description: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
      doneList: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    }),
  }

  static defaultProps = {
    level: 0,
  }

  renderShield (){
    const { level } = this.props

    const securityIcon = level ? Icon.SETS.SECURITY : Icon.SETS.SECURITY_NONE

    return (
      <div>
        <Icon className={css.securityRatingShield} size={31} {...securityIcon} />
        { level ? (<span className={css.securityRating}>{level}</span>) : null }
      </div>
    )
  }

  renderPopoverContent (){
    const { tip } = this.props

    return (
      <div>
        { tip.title ? (<div className={css.popoverHeader}>{ tip.title }</div>) : null }
        { tip.description ? (<div className={css.popoverDescription}>{ tip.description }</div>) : null }
        { tip.doneList ? tip.doneList : null }
      </div>
    )
  }

  renderContent (){
    const { tip } = this.props

    if (!tip) {
      return this.renderShield()
    }

    return (
      <Tip tipContent={this.renderPopoverContent()} position={Tip.POSITION.LEFT}>
        { this.renderShield() }
      </Tip>
    )
  }

  render () {
    return (
      <div className={css.root}>
        { this.renderContent() }
      </div>
    )
  }
}
