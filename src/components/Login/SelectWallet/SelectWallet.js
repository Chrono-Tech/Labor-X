import { Button, Input, Link, UserRow } from 'components/common'
import PropTypes from 'prop-types'
import React from 'react'
import css from './SelectWallet.scss'

export default class SelectWallet extends React.Component {
  static propTypes = {
    walletsList: PropTypes.array,
    onSelectWallet: PropTypes.func,
  }

  static defaultProps = {
    walletsList: [],
    onSelectWallet: () => {},
  }

  navigateToImportWallet = () => {}

  render () {
    const { handleSubmit, error, pristine, invalid, walletsList, onSelectWallet } = this.props

    return (
      <div className={css.root}>
        <div className={css.formHeader}>Select wallet</div>
        <div className={css.fieldWrapper}>
          {
            walletsList.map((wallet, index) => (
              <UserRow
                key={index}
                title={wallet.name}
                onClick={() => onSelectWallet(wallet)}
                largeText={true}
              />
            ))
          }
        </div>
        <Button
          onClick={this.navigateToImportWallet}
          className={css.row}
          buttonClassName={css.submitButton}
          type={Button.TYPES.SUBMIT}
          label='Import wallet'
          primary
          disabled={pristine || invalid}
          error={error}
          mods={Button.MODS.INVERT}
        />
        <p className={css.descriptionBlock}>or <Link className={css.loginLink} href='/login'>Create a new wallet</Link></p>
      </div>
    )
  }
}
