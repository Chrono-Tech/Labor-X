import { Translate, OpportunityCard, Input, Image } from 'components/common'
import PropTypes from 'prop-types'
import React from 'react'
import uniqid from 'uniqid'
import css from './Opportunities.scss'

export default class Opportunities extends React.Component {
  static propTypes = {
    opportunitiesCards: PropTypes.arrayOf(PropTypes.shape(OpportunityCard.propTypes)),
  }

  render () {
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.opportunities' /></div>
        </div>
        <div className={css.content}>
          <div className={css.searchRow}>
            <Image
              icon={Image.ICONS.SEARCH}
              color={Image.COLORS.BLACK}
            />
            <Input
              className={css.search}
              lineEnabled
              type={Input.TYPES.TEXT}
              mods={css.alignLeft}
              placeholder='Search by keyword'
            />
            <div className={css.filterRow}>
              <p>Sydney, Building, Industrial</p>
              <Image
                icon={Image.ICONS.FILTER}
                color={Image.COLORS.BLACK}
              />
            </div>
          </div>
          <div className={css.opportunities}>
            {this.props.opportunitiesCards.map((card) => (<OpportunityCard {...card} key={uniqid()} />))}
          </div>
        </div>
      </div>
    )
  }
}
