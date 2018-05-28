import React from 'react'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'

import { Icon } from 'components/common'
import css from './Rating.scss'


export default class Rating extends React.Component {
  static propTypes = {
    starSize: PropTypes.number,
    title: PropTypes.element,
    description: PropTypes.element,
    rating: PropTypes.number,
    className: PropTypes.string,
    popoverClassName: PropTypes.string,
    disablePopover: PropTypes.bool,
    popoverContent: PropTypes.element,
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
    popoverClassName: '',
    className: '',
  }
  
  getRatingTrackWidth(votes) {
    const { starsTable } = this.props
    
    let width = votes / starsTable.total
    width = Math.max(0, width)
    width = Math.min(width, 100)
    
    return `${ width }%`
  }
  
  renderRatingTable(){
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
                <span style={{width: this.getRatingTrackWidth() }} className={css.countRatingTrack} />
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
  
  renderPopoverContent(){
    const { starsTable, popoverContent, title, description } = this.props
    
    if (popoverContent){
      return (<div className={css.popover}>{ popoverContent }</div>)
    }
    
    return (
      <div className={css.popover}>
        { title ? (<div className={css.popoverHeader}>{ title }</div>) : null }
        { description ? (<div className={css.popoverDescription}>{ description }</div>) : null }
        { starsTable ? this.renderRatingTable() : null }
      </div>
    )
  }
  
  renderStars(){
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
  
  render () {
    const { className, disablePopover } = this.props
    
    return (
      <div className={[css.main, className].join(' ')}>
        { this.renderStars() }
        { disablePopover ? null: this.renderPopoverContent() }
      </div>
    
    )
  }
}
