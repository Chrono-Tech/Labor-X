import PropTypes from 'prop-types'
import React from 'react'
import uniqid from 'uniqid'
import { Tag } from 'components/common'
import css from './CompanyTab.scss'

export default class CompanyTab extends React.Component {
  static propTypes = {
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    totalSpent: PropTypes.string.isRequired,
    totalHires: PropTypes.number.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string),
    client: PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.string,
    }).isRequired,
    board: PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.string,
    }).isRequired,
  }

  render () {
    return (
      <div>
        <div className={[css.block, css.headerRow].join(' ')}>
          <div className={css.nameRow}>
            { this.props.client.icon && <img className={css.icon} src={this.props.client.icon} alt='' /> }
            <p><span className={css.medium}>{this.props.client.name}</span> <span className={css.pale}>(Client)</span></p>
          </div>
          <div className={css.nameRow}>
            { this.props.board.icon && <img className={css.icon} src={this.props.board.icon} alt='' /> }
            <p><span className={css.medium}>{this.props.board.name}</span> <span className={css.pale}>(Job Board)</span></p>
          </div>
        </div>
        <div className={css.delimiter} />
        <div className={css.block}>
          <div className={css.companyInfo}>
            <h3>{this.props.client.name}</h3>
            <p className={css.pale}>{this.props.status}. {this.props.location}</p>
          </div>
          <p className={css.regular}>{this.props.description}</p>
          <div className={css.infoBlock}>
            <div className={css.infoRow}>
              <div className={css.infoColumn}>
                <p className={css.regular}>Total Spent</p>
                <p className={css.pale}>LHAU {this.props.totalSpent}</p>
              </div>
              <div className={css.infoColumn}>
                <p className={css.regular}>Total Hires</p>
                <p className={css.pale}>{this.props.totalHires}</p>
              </div>
            </div>
          </div>
          <p className={css.medium}>Categories</p>
          <div className={css.categoriesRow}>
            {this.props.categories.map((e) => (
              <Tag
                key={uniqid()}
                value={e}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}
