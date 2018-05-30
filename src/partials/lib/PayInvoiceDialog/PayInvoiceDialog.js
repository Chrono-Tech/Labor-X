import React from 'react'
import css from './PayInvoiceDialog.scss'

export default class PayInvoiceDialog extends React.Component {
  render () {
    return (
      <div className={css.root}>
        <div className={css.header}>
          <h3>pay invoice title</h3>
        </div>
        <div className={css.body}>
          pay invoice content
        </div>
      </div>
    )
  }
}
