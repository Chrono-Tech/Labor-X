import React from 'react'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import { Tag } from 'src/components/common'
import { BoardModel, ClientModel } from 'src/models'
import css from './CompanyTab.scss'

export default class CompanyTab extends React.Component {
  static propTypes = {
    client: PropTypes.instanceOf(ClientModel).isRequired,
    board: PropTypes.instanceOf(BoardModel).isRequired,
    companyInfo: PropTypes.shape({}),
    companyInfoLoading: PropTypes.bool,
    companyInfoFailure: PropTypes.instanceOf(Error),
  }

  getSpecializations (companyInfo) {
    if (companyInfo && companyInfo.regular &&  companyInfo.regular.specializations) {
      return companyInfo.regular.specializations
    } else {
      return []
    }
  }

  render () {
    const { board, client, companyInfo } = this.props
    return (
      <div>
        <div className={[css.block, css.headerRow].join(' ')}>
          <div className={css.nameRow}>
            { client.ipfs.logo && <img className={css.icon} src={client.ipfs.logo} alt='' /> }
            <p><span className={css.medium}>{companyInfo.verifiable.name}</span> <span className={css.pale}>(Client)</span></p>
          </div>
          { !board ? null : (
            <div className={css.nameRow}>
              { board.ipfs.logo && <img className={css.icon} src={board.ipfs.logo} alt='' /> }
              <p><span className={css.medium}>{board.ipfs.name}</span> <span className={css.pale}>(Job Board)</span></p>
            </div>
          )}
        </div>
        <div className={css.delimiter} />
        <div className={css.block}>
          <div className={css.companyInfo}>
            <h3>{companyInfo.verifiable.name}</h3>
            <p className={css.pale}>{companyInfo.verifiable.website}</p>
          </div>
          <p className={css.regular}>{companyInfo.verifiable.intro}</p>
          <div className={css.infoBlock}>
            <div className={css.infoRow}>
              <div className={css.infoColumn}>
                <p className={css.regular}>Total Spent</p>
                <p className={css.pale}>LHAU {client.extra.totalSpent}</p>
              </div>
              <div className={css.infoColumn}>
                <p className={css.regular}>Total Hires</p>
                <p className={css.pale}>{client.extra.totalHires}</p>
              </div>
            </div>
          </div>
          <p className={css.medium}>Categories</p>
          <div className={css.categoriesRow}>
            {this.getSpecializations(companyInfo).map((e) => (
              <Tag
                key={uniqid()}
                value={e.name}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}
