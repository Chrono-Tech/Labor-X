import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Tooltip from '@material-ui/core/Tooltip'

import { WORKER_STATE_AVALIABLE } from 'src/models'
import PersonModel from 'src/api/backend/model/PersonModel'
import { WorkerState, Icon } from 'src/components/common'

import css from './PersonCard.scss'

export default class PersonCard extends React.Component {
  static propTypes = {
    person: PropTypes.instanceOf(PersonModel).isRequired,
  }

  renderTooltipContent = () => {
    return (
      <div className={css.tooltip}>
        <h4 className={css.tooltipHeader}>Availability</h4>
        <p className={css.tooltipComment}>Worker is available to do job on:</p>
        <p className={css.tooltipCalendar}>Sun Mo Tue Wed Thu Fri Sat</p>
      </div>
    )
  }

  render () {
    const { person } = this.props
    return (
      <Card className={css.card}>
        <CardContent className={css.content}>
          <div className={css.person}>
            <img className={css.avatar} src={person.avatar} alt={person.userName} />
            <div>
              <p className={css.name}>{ person.userName }</p>
              <p className={css.skills}>Worker. Building, Industrial</p>
            </div>
          </div>
          <div className={css.extra}>
            <div className={css.stars}>
              <img className={css.star} src='/static/images/svg/star-active.svg' alt='' />
              <img className={css.star} src='/static/images/svg/star-active.svg' alt='' />
              <img className={css.star} src='/static/images/svg/star-active.svg' alt='' />
              <img className={css.star} src='/static/images/svg/star-active.svg' alt='' />
              <img className={css.star} src='/static/images/svg/star-active.svg' alt='' />
            </div>
            <div className={css.securityRatingWrapper}>
              <Icon className={css.securityRatingShield} size={32} {...Icon.SETS.SECURITY} />
              <span className={css.securityRating}>4</span>
            </div>
            <Tooltip title={this.renderTooltipContent()} classes={{ tooltip: css.tooltipContainer }}>
              <div>
                <WorkerState className={css.state} state={WORKER_STATE_AVALIABLE} />
              </div>
            </Tooltip>
          </div>
        </CardContent>
      </Card>
    )
  }
}
