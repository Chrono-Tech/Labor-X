import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SignerModel, PocketModel } from 'src/models'
import { BalanceSubscription } from 'src/micros'
import { Header, SecondMenu } from 'src/components/layouts'
import { signerSelector, ethPocketSelector } from 'src/store'
import css from './MainLayout.scss'

export class MainLayout extends React.Component {
  static propTypes = {
    isMenu: PropTypes.bool,
    customTitle: PropTypes.func,
    signer: PropTypes.instanceOf(SignerModel),
    children: PropTypes.element.isRequired,
    pockets: PropTypes.arrayOf(
      PropTypes.instanceOf(PocketModel)
    ),
  }

  static defaultProps = {
    isMenu: true,
    pockets: [],
  }

  render () {
    const { signer, pockets, isMenu, children } = this.props

    return (signer === null || !pockets.length) ? null : (
      <BalanceSubscription key={signer.address} pockets={pockets}>
        <div>
          <div className={css.header}>
            <div className={css.headerWrapper}>
              <Header />
            </div>
          </div>
          <div className={css.page}>
            {isMenu && (
              <div className={css.menu}>
                <SecondMenu />
              </div>
            )}
            {children}
          </div>
        </div>
      </BalanceSubscription>
    )
  }
}

function mapStateToProps (state) {
  const signer = signerSelector()(state)
  const ethPocket = signer !== null
    ? ethPocketSelector(signer.address)(state)
    : null
  return {
    signer,
    pockets: ethPocket === null ? [] : [
      ethPocket,
    ],
  }
}

export default connect(mapStateToProps)(MainLayout)
