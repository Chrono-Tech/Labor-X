import React from 'react'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'

import { Tip } from 'components/common'
import css from './Rating.scss'

export default class Rating extends React.Component {
  static propTypes = {
    starSize: PropTypes.number,
    tip: PropTypes.shape({
      title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
      description: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
      tipClassName: PropTypes.string,
    }),
    rating: PropTypes.number,
    className: PropTypes.string,
    starsTable: PropTypes.shape({
      stars: PropTypes.arrayOf(
        PropTypes.shape({
          star: PropTypes.number,
          votes: PropTypes.number,
        })
      ),
      total: PropTypes.number,
    }),

  }

  static defaultProps = {
    rating: 0,
    starSize: 20,
    starsTable: null,
    tip: null,
    className: '',
  }

  getRatingTrackWidth (votes) {
    const { starsTable } = this.props

    let width = votes / starsTable.total
    width = Math.max(0, width)
    width = Math.min(width, 100)

    return `${ width }%`
  }

  renderRatingTable (){
    const { starsTable } = this.props

    return (
      <table className={css.starsRatingTable}>
        <tbody>
          {
            starsTable && starsTable.stars && starsTable.stars.map((item) => (
              <tr>
                <td className={css.countStars}>{item.star} pluralize('star', item.star)</td>
                <td className={css.countStarsVotes}>{item.votes}</td>
                <td className={css.countRating}>
                  <span style={{ width: this.getRatingTrackWidth() }} className={css.countRatingTrack} />
                </td>
              </tr>
            ))
          }
          <tr className={css.totalRow}>
            <td>Total</td>
            <td>{ starsTable.total }</td>
            <td />
          </tr>
        </tbody>
      </table>
    )
  }

  renderPopoverContent (){
    const { starsTable, tip } = this.props

    return (
      <div>
        { tip.title ? (<div className={css.popoverHeader}>{ tip.title }</div>) : null }
        { tip.description ? (<div className={css.popoverDescription}>{ tip.description }</div>) : null }
        { starsTable ? this.renderRatingTable() : null }
      </div>
    )
  }

  renderStars (){
    const { rating, starSize } = this.props

    let starsArray = []

    for (let i = 0; i < rating; i++) {
      starsArray.push(
        <span key={i} className={css.star}>
          <img src='/static/images/svg/star-active.svg' alt='' width={starSize} />
        </span>
      )
    }

    return starsArray
  }

  renderContent (){
    const { tip } = this.props

    if (!tip) {
      return this.renderStars()
    }

    return (
      <Tip tipContent={this.renderPopoverContent()} position={Tip.POSITION.LEFT}>
        { this.renderStars() }
      </Tip>
    )
  }

  render () {
    const { className } = this.props

    return (
      <div className={[css.main, className].join(' ')}>
        { this.renderContent() }
      </div>

    )
  }
}
